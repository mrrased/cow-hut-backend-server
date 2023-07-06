/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';
import { ICow } from '../cows/cow.interface';

export type IOrder = {
  cow?: {
    seller: Types.ObjectId | ICow;
  };
  buyer?: Types.ObjectId | IUser;
  seller?: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
