import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  service: "gmail", // or "hotmail", "yahoo" etc. (or custom SMTP)
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password or real password
  },
});