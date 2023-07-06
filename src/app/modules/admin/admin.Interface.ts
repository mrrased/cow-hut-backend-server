/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IAdmin = {
  _id: string;
  phoneNumber: string;
  role: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | '_id'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
