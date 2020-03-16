import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

class AppToken {
  static async generateJWT(password, hash, payload) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, match) => {
        if (err) {
          reject(err);
        }
        if (!match) {
          reject(new Error(`Invalid phone number or password`));
        }

        jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { algorithm: "HS256" },
          (error, token) => {
            if (token) {
              resolve(token);
            }
            reject(error);
          }
        );
      });
    });
  }
}

export default AppToken;
