import { z } from 'zod';
import { role } from './user.Constant';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Contact number is required',
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
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

const updateUserZodSchema = z
  .object({
    body: z.object({
      phoneNumber: z
        .string({
          required_error: 'Phone Number is required',
        })
        .optional(),
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
      name: z
        .object({
          firstName: z
            .string({
              required_error: 'First name is required',
            })
            .optional(),
          lastName: z
            .string({
              required_error: 'Last name is required',
            })
            .optional(),
        })
        .optional(),
      address: z
        .string({
          required_error: 'Address is required',
        })
        .optional(),
      budget: z
        .number({
          required_error: 'Budget is required',
        })
        .optional(),
      income: z
        .number({
          required_error: 'Budget is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.name?.firstName && data.body.name?.lastName) ||
      (!data.body.name?.firstName && !data.body.name?.firstName),
    {
      message:
        'Either both FirstName and LastName should be provide or neither',
    }
  );

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
