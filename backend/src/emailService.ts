import * as dotenv from "dotenv";
dotenv.config();

const SibApi = require("sib-api-v3-sdk");

const SibClient = SibApi.ApiClient.instance;

SibClient.authentications["api-key"].apiKey = process.env.API_KEY;

const transactionEmailApi = new SibApi.TransactionalEmailsApi();

let smtpMailData = new SibApi.SendSmtpEmail();

const sender = {
  email: "info@joukko.io",
  name: "WeSail",
};

const sendEmail = async (
  email: string,
  username: string,
  subject: string,
  content: string
) => {
  try {
    smtpMailData.sender = sender;

    smtpMailData.to = [
      {
        email: email,
        name: username,
      },
    ];

    smtpMailData.subject = subject;

    smtpMailData.htmlContent = content;

    transactionEmailApi
      .sendTransacEmail(smtpMailData)
      .then((data: any) => {
        console.log(data);
      })
      .catch((error: any) => {
        console.error(error);
        throw new Error(error);
      });
  } catch (error: any) {
    throw new Error(error);
  }
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
