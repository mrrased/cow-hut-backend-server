import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { Secret } from 'jsonwebtoken';
import Config from '../../../Config';
import { jwtHelpers } from '../../../helpers/jwt.Helpers';
import bcrypt from 'bcrypt';

const craeteUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!craeteUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});

  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  if (payload.name) {
    if (!payload.name?.firstName) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FirstName is required');
    } else if (!payload.name?.lastName) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'LastName is required');
    }
  }

  if (payload.password) {
    // Hash the new password
    payload.password = await bcrypt.hash(
      payload.password,
      Number(Config.bcrypt_salt_rounds)
    );
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

const getMyProfile = async (token: string): Promise<IUser | null> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, Config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  }

  const { userNumber: phoneNumber, _id } = verifiedToken;

  // Checking
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // find data
  const userData = await User.findOne(
    { _id },
    { name: 1, phoneNumber: 1, address: 1, _id: 0 }
  );
  return userData;
};

const updateProfile = async (
  token: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, Config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  }

  const { _id } = verifiedToken;

  // Checking User
  const userData = await User.findOne({ _id });
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Dynamically update handle
  const { name, ...profileData } = payload;
  const updateProfileData: Partial<IUser> = { ...profileData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateProfileData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (payload.password) {
    // Hash the new password
    payload.password = await bcrypt.hash(
      payload.password,
      Number(Config.bcrypt_salt_rounds)
    );
  }

  const result = await User.findOneAndUpdate({ _id }, updateProfileData, {
    new: true,
    projection: { name: 1, phoneNumber: 1, address: 1, _id: 0 },
  });

  return result;
};

export const UserService = {
  craeteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
};
