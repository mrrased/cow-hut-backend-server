import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { CowValidation } from './cow.Validation';
import { CowController } from './cow.Controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCow
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
