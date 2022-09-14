import dotenv from "dotenv";
dotenv.config();

export const emailOrderModelUser = (order) => {
  const orderDate = new Date(order.date).toLocaleString();
  let products = order.products
    .map((product) => {
      return `<li><strong>${product.name}</strong> - $${product.price}</li>`;
    })
    .join(" ");

  return {
    from: `API BACKEND CODER <${process.env.EMAIL_USER}>`,
    to: order.email,
    subject: `Nuevo pedido API BACKEND CODER confirmado`,
    html: `
    <h1>Confirmación de orden</h1>
    <img src="${order.image}" alt="avatar" style="width: 100px; height: 100px; border-radius: 50%;"/>
    <p><strong>Nombre:</strong> ${order.name}</p>
    <p><strong>Apellido:</strong> ${order.lastname}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Teléfono:</strong> ${order.phone}</p>
    <p><strong>Numero de orden:</strong> ${order.id}</p>
    <p><strong>Fecha:</strong> ${orderDate}</p>
    <hr>
    <h3>Detalle:</h3>
    <ol>${products}</ol>
    <hr>

    `,
  };
};
