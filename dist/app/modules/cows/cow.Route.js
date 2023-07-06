"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const cow_Validation_1 = require("./cow.Validation");
const cow_Controller_1 = require("./cow.Controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cow_Validation_1.CowValidation.createCowZodSchema), cow_Controller_1.CowController.createCow);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.ADMIN), cow_Controller_1.CowController.getAllCow);
router.get('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER, users_1.ENUM_USER_ROLE.BUYER, users_1.ENUM_USER_ROLE.ADMIN), cow_Controller_1.CowController.getSingleCow);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.default)(cow_Validation_1.CowValidation.updateCowZodSchema), cow_Controller_1.CowController.updateCow);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.SELLER), cow_Controller_1.CowController.deleteCow);
exports.CowRoutes = router;
