import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'cows',
      unique: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
