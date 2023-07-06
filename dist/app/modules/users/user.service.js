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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const Config_1 = __importDefault(require("../../../Config"));
const jwt_Helpers_1 = require("../../../helpers/jwt.Helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const craeteUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(user);
    if (!craeteUser) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    return createdUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (payload.name) {
        if (!((_a = payload.name) === null || _a === void 0 ? void 0 : _a.firstName)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'FirstName is required');
        }
        else if (!((_b = payload.name) === null || _b === void 0 ? void 0 : _b.lastName)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'LastName is required');
        }
    }
    if (payload.password) {
        // Hash the new password
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(Config_1.default.bcrypt_salt_rounds));
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getMyProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwt_Helpers_1.jwtHelpers.verifyToken(token, Config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Token');
    }
    const { userNumber: phoneNumber, _id } = verifiedToken;
    // Checking
    const isUserExist = yield user_model_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // find data
    const userData = yield user_model_1.User.findOne({ _id }, { name: 1, phoneNumber: 1, address: 1, _id: 0 });
    return userData;
});
const updateProfile = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwt_Helpers_1.jwtHelpers.verifyToken(token, Config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Token');
    }
    const { _id } = verifiedToken;
    // Checking User
    const userData = yield user_model_1.User.findOne({ _id });
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Dynamically update handle
    const { name } = payload, profileData = __rest(payload, ["name"]);
    const updateProfileData = Object.assign({}, profileData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updateProfileData[nameKey] = name[key];
        });
    }
    if (payload.password) {
        // Hash the new password
        payload.password = yield bcrypt_1.default.hash(payload.password, Number(Config_1.default.bcrypt_salt_rounds));
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id }, updateProfileData, {
        new: true,
        projection: { name: 1, phoneNumber: 1, address: 1, _id: 0 },
    });
    return result;
});
exports.UserService = {
    craeteUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateProfile,
};
