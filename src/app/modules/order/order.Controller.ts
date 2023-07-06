import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { Request, Response } from 'express';
import { OrderService } from './order.Service';
import ApiError from '../../../errors/ApiError';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const result = await OrderService.craeteOrder(orderData);

  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrder();

  sendResponse<IOrder[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Authorization header is missing'
    );
  }

  const result = await OrderService.getSingleOrder(id, authorization);

  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order information retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
