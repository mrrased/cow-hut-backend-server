"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_Controller_1 = require("./order.Controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderZodSchema), order_Controller_1.OrderController.createOrder);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER), order_Controller_1.OrderController.getSingleOrder);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), order_Controller_1.OrderController.getAllOrder);
exports.OrderRoutes = router;
