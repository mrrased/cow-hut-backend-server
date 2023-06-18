import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cows/cow.Model';
import { ICow } from '../cows/cow.interface';
// import { IUser } from '../users/user.interface';
import { Order } from './order.Model';
import { IOrder } from './order.interface';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import { IUser } from '../users/user.interface';
// import httpStatus from 'http-status';

const craeteOrder = async (
  // student: IStudent,
  // cow: ICow,
  // buyer: IUser,
  user: IOrder
): Promise<IOrder | null> => {
  // auto generated incremental id

  // default password
  // if (!user.password) {
  //   user.password = Config.default_student_pass as string;
  // }

  // // set role
  // user.role = 'student';

  const cow: ICow | null = await Cow.findById(user.cow);
  const buyer: IUser | null = await User.findById(user.buyer);
  const seller: IUser | null = await User.findById(cow?.seller);

  console.log(cow?.price, 'cow price');
  console.log(buyer?.budget, 'buyer price');
  console.log(seller?.income, 'seller income price');

  if (cow && buyer) {
    if (cow?.price > buyer?.budget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Your Need More Budget buying This Cow'
      );
    }
  }

  const session = await mongoose.startSession();

  let result = null;
  let update = null;
  let sellerUpadte = null;

  try {
    session.startTransaction();
    if (cow && buyer && seller) {
      const subBuyerBudget = buyer.budget - cow.price;
      buyer.budget = subBuyerBudget;
      update = await User.findOneAndUpdate(
        { _id: user.buyer },
        { $set: buyer },
        {
          new: true,
        }
      );

      seller.income = cow.price;
      sellerUpadte = await User.findOneAndUpdate(
        { _id: cow.seller },
        { $set: seller },
        {
          new: true,
        }
      );
    }

    if (cow) {
      cow.label = 'sold out';
      result = await Cow.findOneAndUpdate(
        { _id: user.cow },
        { $set: cow },
        {
          new: true,
        }
      );
    }
    // cow?.label
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  console.log(result, update, sellerUpadte, 'updated cow and buyer and seller');
  // const academicSemester = await AcademicSemester.findById(
  //   student.academicSemester
  // );

  // let newUserAllData = null;
  // // generate student id
  // const session = await mongoose.startSession();
  // try {
  //   session.startTransaction();
  //   const id = await generateStudentId(academicSemester);
  //   user.id = id;
  //   student.id = id;
  //   const newStudent = await Student.create([student], [session]);

  //   if (!newStudent.length) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  //   }
  //   // set student _id into user
  //   user.student = newStudent[0]._id;
  //   const newUser = await User.create([user], [session]);

  //   if (!newUser.length) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  //   }

  //   newUserAllData = newUser[0];

  //   await session.commitTransaction();
  //   await session.endSession();
  // } catch (error) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw error;
  // }

  // if (newUserAllData) {
  //   newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
  //     path: 'student',
  //     populate: [
  //       {
  //         path: 'academicSemester',
  //       },
  //       {
  //         path: 'academicDepartment',
  //       },
  //       {
  //         path: 'academicFaculty',
  //       },
  //     ],
  //   });
  // }

  // return newUserAllData;

  const createdOrder = await Order.create(user);
  if (!createdOrder) {
    throw new ApiError(400, 'Failed to create user!');
  }

  return createdOrder;
};

export const OrderService = {
  craeteOrder,
};
