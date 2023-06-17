import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { CowValidation } from './cow.Validation';
import { CowController } from './cow.Controller';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get('/', CowController.getAllCow);
router.get('/:id', CowController.getSingleCow);

export const CowRoutes = router;
