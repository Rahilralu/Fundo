import { generateOTP } from '../utils/otp.js';
import { sendEmail } from '../services/mailer.js';
import { otpStore, verifiedEmails } from '../store/otpStore.js';

export async function sendOtpService(email) {
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(email, { otp, attempts: 0, expiresAt });

  await sendEmail({
    to: email,
    subject: 'Your Fundo OTP',
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
  });
}

export function verifyOtpService(email, otp) {
  const record = otpStore.get(email);

  if (!record) throw new Error('OTP_NOT_FOUND');
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    throw new Error('OTP_EXPIRED');
  }
  if (record.attempts >= 3) {
    otpStore.delete(email);
    throw new Error('TOO_MANY_ATTEMPTS');
  }
  if (record.otp !== otp) {
    record.attempts++;
    throw new Error('INVALID_OTP');
  }

  otpStore.delete(email);
  verifiedEmails.set(email, Date.now() + 10 * 60 * 1000);
}