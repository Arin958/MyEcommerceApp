const path = require("path");
const dotenv = require("dotenv");
const { MailtrapClient } = require("mailtrap");

// Resolve .env path relative to this file
dotenv.config({
  path: ".env"
});

console.log("Mailtrap Token:", process.env.MAILTRAP_TOKEN); // Add this temporarily for debug

const mailTrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

module.exports = { mailTrapClient, sender };
