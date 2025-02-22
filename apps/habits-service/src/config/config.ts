import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  
   mongourl:process.env.MONGO_URI_HABITS,
   appemail:process.env.APP_EMAIL
}));
