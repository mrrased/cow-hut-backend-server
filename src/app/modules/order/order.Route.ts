import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.Controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.BUYER),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getSingleOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrder);

export const OrderRoutes = router;
