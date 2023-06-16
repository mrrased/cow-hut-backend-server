import { z } from 'zod';
import { breed, category, lebel, location } from './cow.Constants';

const createUserZodSchema = z.object({
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
    role: z.enum([...breed] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    weight: z.number({
      required_error: 'Weight is required',
    }),
    lebel: z.enum([...lebel] as [string, ...string[]], {
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

export const AcademicSemesterValidation = {
  createUserZodSchema,
};
