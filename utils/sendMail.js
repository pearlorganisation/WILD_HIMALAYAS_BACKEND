import nodemailer from 'nodemailer'
import ejs from "ejs"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sendMail = async (email,finalUrl
) => {

     // transporter - configuration of admin/user to send mail from
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const templatePath = path.join(__dirname,`../views/emailVerification.ejs`);

      let data = await ejs.renderFile(templatePath,{email,finalUrl});

      let   mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "WildHimalayas Email Verification for creating a new account",
        html: data,
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return reject(error);
          } else {
            return resolve("Token Sent Successfully" + info.response);
          }
        });
      });
}