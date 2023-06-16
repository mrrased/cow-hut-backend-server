import { z } from 'zod';
import { role } from './user.Constant';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Contact number is required',
    }),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number({
      required_error: 'Budget is required',
    }),
    income: z.number({
      required_error: 'Budget is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
