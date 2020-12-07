import speakeasy from "speakeasy";
import { v4 as uuid } from "uuid";
import main from "../main";
import db from "../../models";
// import notifier from "../../utils/notifier";
import { validatePassword, validatePhone } from "../../utils/validator";

export default class PasswordController {
  static async getOneTimeCode(req, res) {
    try {
      const { phoneNumber } = req.body;
      await validatePhone.validateAsync({ phoneNumber });
      const user = await db.User.findOne({
        where: {
          phoneNumber
        }
      });

      if (!user) {
        return main.handleFind(res);
      }
      const secret = speakeasy.generateSecret({ length: 48 });
      const code = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32"
      });

      user.two_factor_secret = secret.base32;
      await user.save({ fields: ["two_factor_secret"] });
      const message = `Your EPD verification code is: ${code}`;

      /**
       * send code via sms only in production
       */

      // if (process.env.NODE_ENV === "production") {
      //   await notifier({ message, phoneNumber });
      //   return res
      //     .status(200)
      //     .json({ message: `Password reset PIN sent to ${phoneNumber}` });
      // }
      return res.status(200).json({ message });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async getResetToken(req, res) {
    try {
      const { phoneNumber, code } = req.body;
      await validatePhone.validateAsync({ phoneNumber });
      const user = await db.User.findOne({ where: { phoneNumber } });

      if (!user) {
        const error = { message: "Invalid code or phone number" };
        return res.status(400).json({ error });
      }

      const isCodeValid = speakeasy.totp.verify({
        secret: user.two_factor_secret,
        encoding: "base32",
        token: code,
        window: 6
      });

      if (!isCodeValid) {
        const error = { message: "Invalid code or phone number" };
        return res.status(400).json({ error });
      }

      const passwordResetToken = uuid(user.id);
      user.password_reset_token = passwordResetToken;
      await user.save({ fields: ["password_reset_token"] });
      return res.status(200).json({ token: passwordResetToken });
    } catch (error) {
      return main.handleError(res, error);
    }
  }

  static async updatePassword(req, res) {
    try {
      const { password, passwordConfirmation } = req.body;
      await validatePassword.validateAsync({ password, passwordConfirmation });
      const { token } = req.query;
      const user = await db.User.findOne({
        where: {
          password_reset_token: token
        }
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: { message: "Invalid or expired link" } });
      }

      user.password = password;
      user.password_reset_token = null;
      user.two_factor_secret = null;

      await user.save({
        fields: ["password", "password_reset_token", "two_factor_secret"]
      });

      return res.status(200).json({ message: "Password updated successuflly" });
    } catch (error) {
      return main.handleError(res, error);
    }
  }
}
