import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import catchAsync from '../../../shared/catchAsync';
import { CowService } from './cow.Service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { CowFilterableFields } from './cow.Constants';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.craeteCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Created Successfully',
    data: result,
  });
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCow(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrived Succesfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived Succesfully !',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
};
