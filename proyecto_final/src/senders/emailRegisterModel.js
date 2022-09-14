import dotenv from "dotenv";
dotenv.config();

export const emailRegisterModel = (user) => {
  return {
    from: `API BACKEND CODER <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: "Nuevo usuario registrado: " + user.name,
    html: `
    <h1>Nuevo usuario registrado: ${user.name}</h1>
    <img src="${user.avatar}" height="100px"/>
    <p><strong>Nombre de usuario / email:</strong> ${user.username}</p>
    <p><strong>Nombre:</strong> ${user.name}</p>
    <p><strong>Dirección:</strong> ${user.address}</p>
    <p><strong>Edad:</strong> ${user.age}</p>
    <p><strong>Teléfono:</strong> ${user.phone}</p>
    `,
  };
};
