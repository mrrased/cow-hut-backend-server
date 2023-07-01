/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id:string;
  phoneNumber: string;
  role: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};


export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' | '_id'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;

