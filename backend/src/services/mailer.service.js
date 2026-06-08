import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await resend.emails.send({
      from: 'Fundo Team <onboarding@resend.dev>',
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent:", info.data?.id);
    return info;
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
}