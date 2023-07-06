"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_Constant_1 = require("./admin.Constant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Contact number is required',
        }),
        role: zod_1.z.enum([...admin_Constant_1.role], {
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
    }),
});
const adminLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    adminLoginZodSchema,
};
