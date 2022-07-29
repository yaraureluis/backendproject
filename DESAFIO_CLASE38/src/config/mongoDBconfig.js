import "dotenv/config";

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

const TIEMPO_EXPIRACION = 600000;
const URL_BASE_DE_DATOS = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.xjcx5.mongodb.net/ENTREGA28?retryWrites=true&w=majority`;

export default { TIEMPO_EXPIRACION, URL_BASE_DE_DATOS };
