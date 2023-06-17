import { Model } from 'mongoose';
// import { IStudent } from '../student/student.interface';

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

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
  // seller: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  category?: string;
};
