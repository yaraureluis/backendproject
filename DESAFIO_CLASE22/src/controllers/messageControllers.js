import { db } from "../config/firebaseConfig.js";

class ContainerMensajes {
  constructor(coleccion) {
    this.coleccion = db.collection(coleccion);
  }

  // async crearTabla() {
  //   try {
  //     let existe = await this.knex.schema.hasTable("mensajes");
  //     if (!existe) {
  //       console.log("Tabla mensajes creada");
  //       return await this.knex.schema.createTable("mensajes", (table) => {
  //         table.increments("id").primary();
  //         table.string("nombre", 150).notNullable();
  //         table.string("mensaje", 1500).notNullable();
  //       });
  //     } else {
  //       console.log("YA EXISTE LA TABLA MENSAJES");
  //     }
  //   } catch (err) {
  //     console.log("No se pudo crear la tabla", err);
  //   }
  // }
  async agregar(mensaje) {
    let nuevo_mensaje = {
      id: mensaje.id,
      author: {
        id: mensaje.id,
        nombre: mensaje.nombre,
        apellido: mensaje.apellido,
        edad: mensaje.edad,
        alias: mensaje.alias,
        avatar: mensaje.avatar,
      },
      text: mensaje.contenido,
    };
    return await this.coleccion.add(nuevo_mensaje);
  }

  async listar() {
    let mensajes = await this.coleccion.get();
    let todos_mensajes = mensajes.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("Mensajes: ", todos_mensajes);
    return todos_mensajes;
  }

  // cerrar() {
  //   this.knex.destroy();
  // }
}

export const mensaje_instancia = new ContainerMensajes("mensajes");
