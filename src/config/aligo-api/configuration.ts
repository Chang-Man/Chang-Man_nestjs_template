import { registerAs } from '@nestjs/config';

export default registerAs('aligoapi', () => ({
  aligoUrl: process.env.ALIGO_URL,
  aligoApiKey: process.env.ALIGO_API_KEY,
  aligoUser: process.env.ALIGO_USER_ID,
  aligoSenderKey: process.env.ALIGO_SENDER_KEY,
  aligoSenderPhone: process.env.ALIGO_SENDER_PHONE,
}));
