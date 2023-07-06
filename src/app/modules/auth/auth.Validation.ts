import { z } from 'zod';

const userLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh is required',
    }),
  }),
});

export const AuthValidation = {
  userLoginZodSchema,
  refreshTokenZodSchema,
};
