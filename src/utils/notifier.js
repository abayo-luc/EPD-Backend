import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default ({ message, phoneNumber }) =>
  client.messages.create({
    to: `+25${phoneNumber}`,
    from: TWILIO_PHONE_NUMBER,
    body: message
  });
