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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_Model_1 = require("./admin.Model");
const jwt_Helpers_1 = require("../../../helpers/jwt.Helpers");
const Config_1 = __importDefault(require("../../../Config"));
const craeteAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield admin_Model_1.Admin.create(admin);
    if (!craeteAdmin) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    // Select specific fields to include in the result
    const result = yield admin_Model_1.Admin.findById(createdUser._id)
        .select('_id role name phoneNumber address')
        .lean()
        .exec();
    return result;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // creating instance of User
    // const user = new User();
    // Access to our instance methods
    const isAdminExist = yield admin_Model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    // Matched Password
    if (isAdminExist &&
        (isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password) &&
        !(yield admin_Model_1.Admin.isPasswordMatched(password, isAdminExist === null || isAdminExist === void 0 ? void 0 : isAdminExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { role, _id: admins_id } = isAdminExist;
    const accessToken = jwt_Helpers_1.jwtHelpers.createToken({ role, admins_id }, Config_1.default.jwt.secret, Config_1.default.jwt.expires_in);
    const refreshToken = jwt_Helpers_1.jwtHelpers.createToken({ admins_id, role }, Config_1.default.jwt.refresh_secret, Config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    craeteAdmin,
    loginAdmin,
};
