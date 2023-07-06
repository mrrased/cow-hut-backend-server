"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const admin_Validation_1 = require("./admin.Validation");
const admin_Controller_1 = require("./admin.Controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_Validation_1.AdminValidation.createAdminZodSchema), admin_Controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_Validation_1.AdminValidation.adminLoginZodSchema), admin_Controller_1.AdminController.loginAdmin);
exports.AdminRoutes = router;
