import "@babel/polyfill";
import yargs from "yargs";
import db from "../models";
import { UNIQUE_VIOLATION } from "../utils/constants";

const { argv } = yargs
  .command("lyr", "Create an admin", {
    username: {
      description: "admin username",
      alias: "username",
      type: "string"
    },
    phoneNumber: {
      description: "admin phone number",
      alias: "phone",
      type: "string"
    },
    password: {
      description: "admin password",
      alias: "password",
      type: "string"
    }
  })
  .help()
  .alias("help", "h");

(async () => {
  try {
    const { password, username, phone, role = "admin" } = argv;
    const user = await db.User.create({
      phoneNumber: phone,
      username,
      password,
      role: role || "admin"
    });
    console.log(user);
  } catch (err) {
    const error = {};
    if (err.errors) {
      err.errors.forEach(element => {
        const { path, message, type } = element;
        switch (type) {
          case UNIQUE_VIOLATION:
            error[path] = `${path} is already taken`.replace(/^\w/, c =>
              c.toUpperCase()
            );
            break;
          default:
            error[path] = message.replace(/^\w/, c => c.toUpperCase());
            break;
        }
      });
    } else {
      error.message = err.message;
    }
    console.log(error);
  } finally {
    process.exit();
  }
})();
