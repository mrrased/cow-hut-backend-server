"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: 'Seller is required',
        }),
        buyer: zod_1.z.string({
            required_error: 'Seller is required',
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
