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
exports.OrderService = {
    craeteOrder,
    getAllOrder,
};
