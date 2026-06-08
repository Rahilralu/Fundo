import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Fundo Team <onboarding@resend.dev>',
      to,
      subject,
      text,
      html,
    });
    
    if (error) {
      console.error("Resend error:", error);
      throw error;
    }
    
    console.log("Message sent:", data?.id);
    return data;
  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
}