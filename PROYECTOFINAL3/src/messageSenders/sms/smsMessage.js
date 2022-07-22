import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendSms = async (phone, message) => {
  if (phone.charAt(0) != "+") phone = `+${phone}`;
  const post_data = {
    secret: process.env.SMS_MASIVO_KEY,
    mode: "devices",
    device: process.env.SMS_MASIVO_DEVICE,
    sim: 1,
    priority: 1,
    phone: phone,
    message: message,
    shortener: 0,
  };

  let post_data_string = new URLSearchParams(post_data).toString();

  let send_message = await axios.post("https://smsmasivo.online/api/send/sms", post_data_string);

  return send_message.data;
};
