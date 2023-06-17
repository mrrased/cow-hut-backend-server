import ApiError from '../../../errors/ApiError';
import { Order } from './order.Model';
import { IOrder } from './order.interface';

const craeteOrder = async (
  // student: IStudent,
  user: IOrder
): Promise<IOrder | null> => {
  // auto generated incremental id

  // default password
  // if (!user.password) {
  //   user.password = Config.default_student_pass as string;
  // }

  // // set role
  // user.role = 'student';

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
