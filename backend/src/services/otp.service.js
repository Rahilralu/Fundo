import { generateOTP } from '../utils/otp.js';
import { sendEmail } from '../services/mailer.js';
import redis from '../config/redis.js'

const OTP_TTL = 5 * 60
const VERIFIED_TTL = 10 * 60

export async function sendOtpService(email) {
  const otp = generateOTP();
 
  const data = JSON.stringify({ otp, attempts: 0 })
  await redis.set(`otp:${email}`, data, { EX: OTP_TTL })

  await sendEmail({
    to: email,
    subject: 'Your Fundo OTP',
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
  });
}


export async function verifyOtpService(email, otp) {
  const raw = await redis.get(`otp:${email}`);
  if (!raw) throw new Error('OTP_NOT_FOUND');

  const record = JSON.parse(raw);

  if (record.attempts >= 3) {
    await redis.del(`otp:${email}`);
    throw new Error('TOO_MANY_ATTEMPTS');
  }

  if (record.otp !== otp) {
    record.attempts++;
    await redis.set(`otp:${email}`, JSON.stringify(record), { KEEPTTL: true });
    throw new Error('INVALID_OTP');
  }

  await redis.del(`otp:${email}`);
  await redis.set(`verified:${email}`, '1', { EX: VERIFIED_TTL });
}
