import dotenv from "dotenv";
dotenv.config();

export const emailOrderModelAdm = (order) => {
  const orderDate = new Date(order.date).toLocaleString();
  let products = order.products
    .map((product) => {
      return `<li><strong>${product.name}</strong> - $${product.price}</li>`;
    })
    .join(" ");

  return {
    from: `API BACKEND CODER <${process.env.EMAIL_USER}>`,
    to: process.env.ADM_USER_EMAIL,
    subject: `Nuevo pedido de: ${order.name} ${order.lastname}`,
    html: `
    <h1>Nueva orden confirmada de: ${order.name} ${order.lastname}</h1>
    <img src="${order.image}" alt="avatar" style="width: 100px; height: 100px; border-radius: 50%;"/>
    <p><strong>Nombre:</strong> ${order.name}</p>
    <p><strong>Apellido:</strong> ${order.lastname}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Teléfono:</strong> ${order.phone}</p>
    <p><strong>ID de usuario:</strong> ${order.userId}</p>
    <p><strong>Numero de orden:</strong> ${order.id}</p>
    <p><strong>Fecha:</strong> ${orderDate}</p>
    <hr>
    <h3>Detalle:</h3>
    <ol>${products}</ol>
    <hr>

    `,
  };
};
