import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
   jwtSecret:process.env.JWT_SECRET,
   mongourl:process.env.MONGO_URI_AUTH,
   appemail:process.env.APP_EMAIL
}));
