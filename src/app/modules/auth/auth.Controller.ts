import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import Config from '../../../Config';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUsersResponse, IRefreshTokenResponse } from './auth.Interface';
import { AuthService } from './auth.Service';

const loginUsers = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUsers(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: Config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUsersResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: Config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUsers,
  refreshToken,
};
