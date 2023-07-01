import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginAdmin, ILoginAdminResponse } from './admin.Interface';
import { Admin } from './admin.Model';
import { jwtHelpers } from '../../../helpers/jwt.Helpers';
import Config from '../../../Config';
import { Secret } from 'jsonwebtoken';

const craeteAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const createdUser = await Admin.create(admin);
  if (!craeteAdmin) {
    throw new ApiError(400, 'Failed to create user!');
  }

  return createdUser;
};

const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;
  // creating instance of User
  // const user = new User();

  // Access to our instance methods
  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  // Matched Password
  if (
    isAdminExist &&
    isAdminExist?.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { role, _id: admins_id } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { role, admins_id },
    Config.jwt.secret as Secret,
    Config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { admins_id, role },
    Config.jwt.refresh_secret as Secret,
    Config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  craeteAdmin,
  loginAdmin,
};
