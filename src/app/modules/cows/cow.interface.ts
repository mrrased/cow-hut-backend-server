import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type ILocation = {
  Dhaka: string;
  Chattogram: string;
  Barishal: string;
  Rajshahi: string;
  Sylhet: string;
  Comilla: string;
  Rangpur: string;
  Mymensingh: string;
};

export type IBreed = {
  Brahman: string;
  Nellore: string;
  Sahiwal: string;
  Gir: string;
  Indigenous: string;
  Tharparkar: string;
  Kankrej: string;
};

export type ILevel = 'for sale' | 'sold out';

export type ICategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: IBreed;
  weight: number;
  label: ILevel;
  category: ICategory;
  seller?: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  category?: string;
};
