import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL;
const RECIPIENT_EMAIL = process.env.MAILTRAP_RECIPIENT_EMAIL;

console.log("MAILTRAP_TOKEN:", TOKEN);
console.log("MAILTRAP_SENDER_EMAIL:", SENDER_EMAIL);
console.log("MAILTRAP_RECIPIENT_EMAIL:", RECIPIENT_EMAIL);

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: SENDER_EMAIL,
  name: "Masudur Rahman",
};
const recipients = [
  {
    email: RECIPIENT_EMAIL,
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);
