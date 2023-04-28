import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const url = "https://api.sendinblue.com/v3/smtp/email";

const API_KEY = process.env.API_KEY || "API-KEY";

const config = {
  headers: {
    Accept: "application/json",
    "api-key": API_KEY,
    "Content-Type": "application/json",
  },
};

const sendEmail = async (
  email: string,
  username: string,
  subject: string,
  content: string
) => {
  const sender = {
    email: "info@joukko.io",
    name: "WeSail",
  };
  const body = {
    sender: sender,
    to: [{ name: username, email: email }],
    subject: subject,
    htmlContent: content,
  };
  await axios.post(url, body, config);
};

export const sendRegistrationEmail = async (
  email: string,
  username: string
) => {
  const subject = "WeSail registration";
  const content = `<html><p>Welcome ${username} to use <a href="https://joukko.io">WeSail</a>.</p></html>`;
  await sendEmail(email, username, subject, content);
};

export const sendForgottenPwdEmail = async (
  email: string,
  username: string,
  link: string
) => {
  const subject = "Forgotten password";
  const content = `<html><p>Forgotten password for user ${username}.</p><p><a href="https://joukko.io/password/${link}">Click here</a> to renew your password.</p><p>The link is functional for the next 30 minutes</p></html>`;
  await sendEmail(email, username, subject, content);
};
