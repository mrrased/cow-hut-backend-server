"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.patch('/my-profile', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateProfileZodSchema), user_controller_1.UserController.updateProfile);
router.get('/my-profile', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER), user_controller_1.UserController.getMyProfile);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateUser);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
