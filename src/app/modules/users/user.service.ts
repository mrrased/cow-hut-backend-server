import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

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

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

export const UserService = {
  craeteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
