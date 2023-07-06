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
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_Model_1 = require("../cows/cow.Model");
const order_Model_1 = require("./order.Model");
const user_model_1 = require("../users/user.model");
const http_status_1 = __importDefault(require("http-status"));
const jwt_Helpers_1 = require("../../../helpers/jwt.Helpers");
const Config_1 = __importDefault(require("../../../Config"));
const craeteOrder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_Model_1.Cow.findById(user.cow);
    const buyer = yield user_model_1.User.findById(user.buyer);
    const seller = yield user_model_1.User.findById(cow === null || cow === void 0 ? void 0 : cow.seller);
    if (cow && buyer) {
        if ((cow === null || cow === void 0 ? void 0 : cow.price) > (buyer === null || buyer === void 0 ? void 0 : buyer.budget)) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Your Need More Budget buying This Cow');
        }
    }
    let createdOrder = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (cow && buyer && seller) {
            const subBuyerBudget = buyer.budget - cow.price;
            buyer.budget = subBuyerBudget;
            yield user_model_1.User.findOneAndUpdate({ _id: user.buyer }, { $set: buyer }, {
                new: true,
            });
            seller.income = cow.price;
            yield user_model_1.User.findOneAndUpdate({ _id: cow.seller }, { $set: seller }, {
                new: true,
            });
        }
        if (cow) {
            cow.label = 'sold out';
            yield cow_Model_1.Cow.findOneAndUpdate({ _id: user.cow }, { $set: cow }, {
                new: true,
            });
        }
        createdOrder = yield order_Model_1.Order.create(user);
        if (!createdOrder) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user!');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return createdOrder;
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_Model_1.Order.find({});
    return result;
});
const getSingleOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let verifiedToken = null;
    try {
        verifiedToken = jwt_Helpers_1.jwtHelpers.verifyToken(token, Config_1.default.jwt.secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Token');
    }
    const { _id, role } = verifiedToken;
    let result = null;
    if (role) {
        result = yield order_Model_1.Order.findById(id)
            .populate('cow')
            .populate('cow.seller')
            .populate('buyer');
        if (role === 'admin') {
            return result;
        }
        else if (((_b = (_a = result === null || result === void 0 ? void 0 : result.buyer) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) === _id) {
            return result;
        }
        else if (((_d = (_c = result === null || result === void 0 ? void 0 : result.cow) === null || _c === void 0 ? void 0 : _c.seller) === null || _d === void 0 ? void 0 : _d.toString()) === _id) {
            return result;
        }
    }
    else {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Id');
    }
    return result;
});
exports.OrderService = {
    craeteOrder,
    getAllOrder,
    getSingleOrder,
};
