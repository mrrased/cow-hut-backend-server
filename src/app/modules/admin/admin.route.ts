import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AdminValidation } from './admin.Validation';
import { AdminController } from './admin.Controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidation.adminLoginZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
