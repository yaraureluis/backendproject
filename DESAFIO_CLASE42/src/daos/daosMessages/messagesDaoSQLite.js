import MessageControllerSQLite from "../../controllers/messages/messagesControllersSQLite.js";
class MessagesDaoSQLite extends MessageControllerSQLite {
  constructor(config) {
    super(config);
  }
}

export default MessagesDaoSQLite;
