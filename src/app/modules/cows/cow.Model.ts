import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { breed, category, label, location } from './cow.Constants';

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
    label: {
      type: String,
      enum: label,
    },
    category: {
      type: String,
      enum: category,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
