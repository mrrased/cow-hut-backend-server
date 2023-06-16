import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.Constant';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    // createdAt: {
    //   type: String,
    // },
    // updatedAt: {
    //   type: String,
    // },
    // student: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Student',
    // },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
