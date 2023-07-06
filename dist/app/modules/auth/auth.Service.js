"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../users/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const Config_1 = __importDefault(require("../../../Config"));
const jwt_Helpers_1 = require("../../../helpers/jwt.Helpers");
const loginUsers = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // creating instance of User
    // const user = new User();
    // Access to our instance methods
    const isUserExist = yield user_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    // Matched Password
    if (isUserExist &&
        (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { role, _id, phoneNumber: userNumber } = isUserExist;
    const accessToken = jwt_Helpers_1.jwtHelpers.createToken({ role, _id, userNumber }, Config_1.default.jwt.secret, Config_1.default.jwt.expires_in);
    const refreshToken = jwt_Helpers_1.jwtHelpers.createToken({ _id, role, userNumber }, Config_1.default.jwt.refresh_secret, Config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify Token
    let verifiedToken = null;
    try {
        verifiedToken = jwt_Helpers_1.jwtHelpers.verifyToken(token, Config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userNumber } = verifiedToken;
    // Checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new token
    const newAccessToken = jwt_Helpers_1.jwtHelpers.createToken({ id: isUserExist._id, role: isUserExist.role }, Config_1.default.jwt.secret, Config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUsers,
    refreshToken,
};
