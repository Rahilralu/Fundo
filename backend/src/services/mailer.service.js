import nodemailer from 'nodemailer';
import { transporter } from '../config/mailer.js';

export async function sendEmail({ to, subject, text, html }) {
  try {
    const transport =  transporter()
    const info = await transport.sendMail({
      from: `"Fundo Team" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
}

