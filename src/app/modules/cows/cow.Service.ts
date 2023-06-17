import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHllper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOPtions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.Constants';
import { Cow } from './cow.Model';
import { ICow, ICowFilters } from './cow.interface';

const craeteCow = async (
  // student: IStudent,
  user: ICow
): Promise<ICow | null> => {
  // auto generated incremental id

  // default password
  // if (!user.password) {
  //   user.password = Config.default_user_pass as string;
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

  const createdCow = await Cow.create(user);
  if (!craeteCow) {
    throw new ApiError(400, 'Failed to create Cow!');
  }

  return createdCow;
};

const getAllCow = async (
  filters: Partial<ICowFilters>,
  paginationOptions: Partial<IPaginationOPtions>
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.caculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);

  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICowFilters>
): Promise<ICow | null> => {
  // if (payload.name) {
  //   if (!payload.name?.firstName) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'FirstName is required');
  //   } else if (!payload.name?.lastName) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'LastName is required');
  //   }
  // }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);

  return result;
};

export const CowService = {
  craeteCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
