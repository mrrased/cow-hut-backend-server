import { z } from 'zod';
import { breed, category, label, location } from './cow.Constants';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'Lebel is required',
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    seller: z.string({
      required_error: 'Seller is required',
    }),
  }),
});


const updateCowZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    age: z
      .number({
        required_error: 'Age is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    location: z
      .enum([...location] as [string, ...string[]], {
        required_error: 'location is required',
      })
      .optional(),
    breed: z
      .enum([...breed] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .optional(),
    weight: z
      .number({
        required_error: 'Weight is required',
      })
      .optional(),
    label: z
      .enum([...label] as [string, ...string[]], {
        required_error: 'Lebel is required',
      })
      .optional(),
    category: z
      .enum([...category] as [string, ...string[]], {
        required_error: 'Category is required',
      })
      .optional(),
    seller: z
      .string({
        required_error: 'Seller is required',
      })
      .optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
