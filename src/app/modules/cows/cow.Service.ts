import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHllper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOPtions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.Constants';
import { Cow } from './cow.Model';
import { ICow, ICowFilters } from './cow.interface';
// import { Schema } from 'mongoose';
// import { IUser } from '../users/user.interface';

const craeteCow = async (user: ICow): Promise<ICow | null> => {
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
  const { searchTerm, location, minPrice, maxPrice, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.caculatePagination(paginationOptions);

  //  // Default to sorting by "price" if not provided
  // const minPrice = parseInt(req.query.minPrice) || 0; // Default to 0 if not provided
  // const maxPrice = parseInt(req.query.maxPrice) || Infinity; // Default to Infinity if not provided

  // // Build the filter object based on the provided query parameters
  // const filter = {
  //   price: { $gte: minPrice, $lte: maxPrice },

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
  } else if (location) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: location,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
  }

  // console.log(minPrice, r, 'min price');
  // console.log(maxPrice, 'max price');

  // const sortCondition: { [key: string]: Schema.Types.Number } = 0;

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     price: cowSearchableFields.map(field => ({
  //       [field]: {
  //         $gte: parseInt(minPrice),
  //         $lte: parseInt(maxPrice),
  //       },
  //     })),
  //   });
  // }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortBys = sortBy || 'price';

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBys && sortOrder) {
    sortConditions[sortBys] = sortOrder;
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
