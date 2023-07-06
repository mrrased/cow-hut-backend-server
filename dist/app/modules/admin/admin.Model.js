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
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const admin_Constant_1 = require("./admin.Constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Config_1 = __importDefault(require("../../../Config"));
const adminSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: admin_Constant_1.role,
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
}, {
    timestamps: true,
});
adminSchema.statics.isAdminExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Admin.findOne({ phoneNumber }, { phoneNumber: 1, password: 1, role: 1 });
    });
};
adminSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
adminSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing admin password
        this.password = yield bcrypt_1.default.hash(this.password, Number(Config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
