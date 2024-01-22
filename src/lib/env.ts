import zod from 'zod';

const envSchema = zod.object({
  NODE_ENV: zod.string().min(1),
  DATABASE: zod.string().min(1),
  DATABASE_HOST: zod.string().min(1),
  DATABASE_PORT: zod.string().min(1),
  DATABASE_USERNAME: zod.string().min(1),
  DATABASE_PASSWORD: zod.string().min(1),
  TOKEN_SECRET: zod.string().min(1),
  TOKEN_EXPIRATION: zod.string().min(1),
  APP_URL: zod.string().min(1),
  APP_PORT: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
