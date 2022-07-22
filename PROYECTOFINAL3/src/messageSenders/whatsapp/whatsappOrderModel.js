export const whatsappOrderModel = (user_data) => {
  return ` 
🔊 *NUEVO PEDIDO* \n
👤 *USUARIO:* ${user_data.name}
✉️ *EMAIL:*  ${user_data.username}
      `;
};
