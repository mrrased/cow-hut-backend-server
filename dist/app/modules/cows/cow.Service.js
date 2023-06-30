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
exports.CowService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHllper_1 = require("../../../helpers/paginationHllper");
const cow_Constants_1 = require("./cow.Constants");
const cow_Model_1 = require("./cow.Model");
const craeteCow = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCow = yield cow_Model_1.Cow.create(user);
    if (!craeteCow) {
        throw new ApiError_1.default(400, 'Failed to create Cow!');
    }
    return createdCow;
});
const getAllCow = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, location, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "location", "minPrice", "maxPrice"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHllper_1.paginationHelpers.caculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_Constants_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    else if (location) {
        andConditions.push({
            $or: cow_Constants_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: location,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice && maxPrice) {
        andConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortBys = sortBy || 'price';
    const sortConditions = {};
    if (sortBys && sortOrder) {
        sortConditions[sortBys] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_Model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_Model_1.Cow.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_Model_1.Cow.findById(id);
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_Model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_Model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    craeteCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteCow,
};
