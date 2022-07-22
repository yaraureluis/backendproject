import mongoose from "mongoose";
import config from "../../config.js";
import { productsDao } from "../../daos/daosProducts/index.js";
import { emailConfig } from "../../messageSenders/email/emailConfig.js";
import { emailOrderModel } from "../../messageSenders/email/emailOrderModel.js";
import { sendWhatsapp } from "../../messageSenders/whatsapp/whatsappMessage.js";
import { whatsappOrderModel } from "../../messageSenders/whatsapp/whatsappOrderModel.js";
import { sendSms } from "../../messageSenders/sms/smsMessage.js";
import { smsProcessOrderModel } from "../../messageSenders/sms/smsProcessOrderModel.js";
import dotenv from "dotenv";
dotenv.config();
import logger from "../../../logger/logger.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class CartsContainerMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  createCart = async (user_id) => {
    try {
      let products = [];
      let newCart = await this.coleccion.create({ products, user_id });
      return newCart._id;
    } catch (err) {
      logger.warn("Carrito no creado: " + err);
      return { error: "Carrito no creado" };
    }
  };

  getAllCarts = async () => {
    try {
      let carts = await this.coleccion.find();
      return carts;
    } catch (err) {
      return { error: "Error getting carts" };
    }
  };

  getCartByUserId = async (user_id) => {
    try {
      let cart = await this.coleccion.findOne({ user_id });
      if (cart) return cart._id;
      else return false;
    } catch (err) {
      return { error: "Error getting cart" };
    }
  };
  getCartById = async (cart_id) => {
    try {
      let cart = await this.coleccion.findById(cart_id);
      if (cart) return cart;
      else throw new Error("cart not found");
    } catch (err) {
      return { error: "Error getting carts" };
    }
  };

  getProductsByCartId = async (cart_id) => {
    try {
      let selectedCart = await this.coleccion.findById(cart_id);
      if (selectedCart) return selectedCart.products;
      else throw new Error("Cart not found");
    } catch (err) {
      return { error: "Error getting carts products" };
    }
  };

  addToCart = async (id_cart, id_product) => {
    try {
      let selectedCart = await this.getCartById(id_cart);
      let productToAdd = await productsDao.getById(id_product);

      let index = selectedCart.products.findIndex((product) => product._id == id_product);

      if (index === -1) {
        delete productToAdd._doc.stock;
        selectedCart.products.push({ ...productToAdd._doc, qty: 1 });
        await selectedCart.save();
      } else {
        let qty_to_set = selectedCart.products[index].qty + 1;
        if (productToAdd.stock >= qty_to_set) {
          await this.coleccion.findByIdAndUpdate(id_cart, { $inc: { [`products.${index}.qty`]: 1 } });
          await selectedCart.save();
        } else return { ERR: "SIN STOCK" };
      }
      return true;
    } catch (err) {
      return { error: "Product not added", err };
    }
  };

  deleteProduct = async (cart_id, product_id) => {
    try {
      const SelectedCart = await this.getCartById(cart_id);
      if (!SelectedCart) throw new Error("Cart not found");

      const index = SelectedCart.products.findIndex((product) => product._id == product_id);
      if (index === -1) throw new Error("Product not found");

      await this.collection.findByIdAndUpdate(cart_id, { $pull: { products: { id: product_id } } }, { safe: true, multi: true });
      return true;
    } catch (err) {
      return { error: err };
    }
  };

  deleteAllProducts = async (id_cart) => {
    try {
      const SelectedCart = await this.getCartById(id_cart);
      if (!SelectedCart) throw new Error("Cart not found");
      await this.coleccion.findByIdAndUpdate(id_cart, { $set: { products: [] } });
      return true;
    } catch (err) {
      return { error: err };
    }
  };

  createOrder = async (id_cart, user_data) => {
    try {
      let products = await this.getProductsByCartId(id_cart);
      let order = {
        user: user_data,
        products,
        total: products.reduce((total, product) => total + product.price * product.qty, 0),
      };
      //ENVIO EMAIL CON LA ORDEN AL ADMINISTRADOR
      const emailData = emailOrderModel(order);
      let email = await emailConfig.sendMail(emailData);
      logger.info("Email sent: " + email);

      //ENVIO UN WHATSAPP CON LA ORDEN AL ADMINISTRADOR
      let message = whatsappOrderModel(user_data);
      let whatsapp = await sendWhatsapp(process.env.PHONE_ADMIN, message);
      logger.info("Whatsapp sent: " + whatsapp);

      //ENVIO DE SMS AL USUARIO CON LA ORDEN
      let smsMessage = smsProcessOrderModel(user_data);
      let sms = await sendSms(user_data.phone, smsMessage);
      logger.info("Sms sent: " + sms);
      return order;
    } catch (err) {
      logger.error("Error creating order: " + err);
      return { error: "Order not created" };
    }
  };
}

export default CartsContainerMongoDB;
