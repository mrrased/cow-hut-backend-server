import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { breed, category, lebel, location } from './cow.Constants';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: location,
    },
    breed: {
      type: String,
      enum: breed,
    },
    weight: {
      type: Number,
      required: true,
    },
    lebel: {
      type: String,
      enum: lebel,
    },
    category: {
      type: String,
      enum: category,
    },
    seller: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
