export type ILoginUsersResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type ILoginUsers = {
  phoneNumber: string;
  password: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
