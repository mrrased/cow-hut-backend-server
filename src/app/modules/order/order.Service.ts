import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cows/cow.Model';
import { ICow } from '../cows/cow.interface';
import { Order } from './order.Model';
import { IOrder } from './order.interface';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import { IUser } from '../users/user.interface';
import { jwtHelpers } from '../../../helpers/jwt.Helpers';
import Config from '../../../Config';
import { Secret } from 'jsonwebtoken';

const craeteOrder = async (user: IOrder): Promise<IOrder | null> => {
  const cow: ICow | null = await Cow.findById(user.cow);
  const buyer: IUser | null = await User.findById(user.buyer);
  const seller: IUser | null = await User.findById(cow?.seller);

  if (cow && buyer) {
    if (cow?.price > buyer?.budget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Your Need More Budget buying This Cow'
      );
    }
  }

  let createdOrder = null;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (cow && buyer && seller) {
      const subBuyerBudget = buyer.budget - cow.price;
      buyer.budget = subBuyerBudget;
      await User.findOneAndUpdate(
        { _id: user.buyer },
        { $set: buyer },
        {
          new: true,
        }
      );

      seller.income = cow.price;
      await User.findOneAndUpdate(
        { _id: cow.seller },
        { $set: seller },
        {
          new: true,
        }
      );
    }

    if (cow) {
      cow.label = 'sold out';
      await Cow.findOneAndUpdate(
        { _id: user.cow },
        { $set: cow },
        {
          new: true,
        }
      );
    }

    createdOrder = await Order.create(user);
    if (!createdOrder) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return createdOrder;
};

const getAllOrder = async (): Promise<IOrder[]> => {
  const result = await Order.find({});

  return result;
};

const getSingleOrder = async (
  id: string,
  token: string
): Promise<IOrder | null> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(token, Config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  }

  const { _id, role } = verifiedToken;
  let result = null;

  if (role) {
    result = await Order.findById(id)
      .populate('cow')
      .populate('cow.seller')
      .populate('buyer');
    if (role === 'admin') {
      return result;
    } else if (result?.buyer?._id?.toString() === _id) {
      return result;
    } else if (result?.cow?.seller?.toString() === _id) {
      return result;
    }
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Id');
  }

  return result;
};

export const OrderService = {
  craeteOrder,
  getAllOrder,
  getSingleOrder,
};
