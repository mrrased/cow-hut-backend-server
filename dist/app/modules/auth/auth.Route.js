"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const auth_Validation_1 = require("./auth.Validation");
const auth_Controller_1 = require("./auth.Controller");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_Validation_1.AuthValidation.userLoginZodSchema), auth_Controller_1.AuthController.loginUsers);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_Validation_1.AuthValidation.refreshTokenZodSchema), auth_Controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
