import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'cows',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
