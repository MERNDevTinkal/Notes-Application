import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "tinkalkumar67693@gmail.com",
    pass: "awfe wucu jxwe funt", // Your app password
  },
});
  