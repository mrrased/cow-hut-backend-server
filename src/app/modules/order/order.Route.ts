import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
