import { FilterQuery, Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.Constant';
import bcrypt from 'bcrypt';
import Config from '../../../Config';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (
  phoneNumber: string,
  _id: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' | '_id'> | null> {
  const query: FilterQuery<IUser> = {};

  if (phoneNumber) {
    query['phoneNumber'] = phoneNumber;
  }

  if (_id) {
    query['_id'] = _id;
  }

  const selectedFields = {
    phoneNumber: 1,
    password: 1,
    role: 1,
    _id: 1,
  };

  return await User.findOne(query, selectedFields);
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(Config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
