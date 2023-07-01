import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.Interface';
import { role } from './admin.Constant';
import bcrypt from 'bcrypt';
import Config from '../../../Config';

const adminSchema = new Schema<IAdmin>(
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
  },
  {
    timestamps: true,
  }
);

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | '_id'> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre('save', async function (next) {
  // hashing admin password
  this.password = await bcrypt.hash(
    this.password,
    Number(Config.bcrypt_salt_rounds)
  );

  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
