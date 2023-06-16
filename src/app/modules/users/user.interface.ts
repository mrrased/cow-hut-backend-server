import { Model } from 'mongoose';
// import { IStudent } from '../student/student.interface';

export type IUser = {
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
  // createdAt: string;
  // updatedAt: string;
  // student?: Types.ObjectId | IStudent;
  // faculty?:Types.ObjectId | IFaculty; Future
  // admin?:Types.ObjectId | IAdmin; Future
};

export type UserModel = Model<IUser, Record<string, unknown>>;
