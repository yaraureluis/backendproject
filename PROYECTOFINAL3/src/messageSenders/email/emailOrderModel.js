import dotenv from "dotenv";
dotenv.config();
//--------------------------------------------------------------- /
// VALIDAR CUANDO UN PRODUCTO ESTE SELECCIONADO MAS DE UNA VEZ
// PARA PODER TOTALIZARLO EN EL CARRITO
//--------------------------------------------------------------- /

export const emailOrderModel = (order) => {
  let products = order.products
    .map((product) => {
      return `<li><strong>${product.title}</strong> - $${product.price}</li>`;
    })
    .join(" ");

  return {
    from: `API BACKEND CODER <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: `Nuevo pedido de: ${order.user.name} - ${order.user.username}`,
    html: `
    <h1>Nueva orden confirmada de: ${order.user.username}</h1>
    <p><strong>Nombre de usuario / email:</strong> ${order.user.username}</p>
    <h3>Detalle:</h3>
    <ol>${products}</ol>
    <h3><strong>Total:</strong> $ ${order.total}</h3>

    `,
  };
};
