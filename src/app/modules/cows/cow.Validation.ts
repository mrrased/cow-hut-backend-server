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
    // seller: z.string({
    //   required_error: 'Seller is required',
    // }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
};
