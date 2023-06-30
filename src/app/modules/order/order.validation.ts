import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'Seller is required',
    }),
    buyer: z.string({
      required_error: 'Seller is required',
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
