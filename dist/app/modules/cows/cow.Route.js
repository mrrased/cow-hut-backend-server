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
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(cow_Validation_1.CowValidation.createCowZodSchema), cow_Controller_1.CowController.createCow);
router.get('/', cow_Controller_1.CowController.getAllCow);
router.get('/:id', cow_Controller_1.CowController.getSingleCow);
router.patch('/:id', (0, validateRequest_1.default)(cow_Validation_1.CowValidation.updateCowZodSchema), cow_Controller_1.CowController.updateCow);
router.delete('/:id', cow_Controller_1.CowController.deleteCow);
exports.CowRoutes = router;
