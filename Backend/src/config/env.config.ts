import dotenv from "dotenv";
dotenv.config();

class EnvConfiguration {
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;
  static DB_TYPE = process.env.DB_TYPE;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_NAME = process.env.DB_NAME;
  static HASH_SALT = process.env.HASH_SALT;

  //smtp variablse
  static SMTP_HOST = process.env.SMTP_HOST ?? "";
  static SMTP_PORT = +(process.env.SMTP_PORT ?? 0);
  static SMTP_PASS = process.env.SMTP_PASS ?? "";
  static SMTP_USER = process.env.SMTP_USER ?? "";

  //acces token variables 
  static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  static ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
}

export default EnvConfiguration;
