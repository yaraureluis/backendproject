import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendWhatsapp = async (phone, message) => {
  if (phone.charAt(0) != "+") phone = `+${phone}`;
  const post_data = {
    secret: process.env.SMS_MASIVO_KEY,
    account: process.env.SMS_MASIVO_WHATSAPP_ACCOUNT,
    phone: phone,
    message: message,
  };

  let post_data_string = new URLSearchParams(post_data).toString();

  let send_message = await axios.post("https://smsmasivo.online/api/send/whatsapp", post_data_string);
  return send_message.data;
};
