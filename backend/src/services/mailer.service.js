import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  try {
    await sgMail.send({
      from: 'nazarrahil0000@gmail.com',
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error while sending mail:', err.response?.body || err);
    throw err;
  }
}