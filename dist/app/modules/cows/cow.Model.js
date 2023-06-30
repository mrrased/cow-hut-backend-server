"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_Constants_1 = require("./cow.Constants");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: cow_Constants_1.location,
    },
    breed: {
        type: String,
        enum: cow_Constants_1.breed,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: cow_Constants_1.label,
    },
    category: {
        type: String,
        enum: cow_Constants_1.category,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
    },
}, {
    timestamps: true,
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
