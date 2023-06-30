import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { CowValidation } from './cow.Validation';
import { CowController } from './cow.Controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get('/', CowController.getAllCow);
router.get('/:id', CowController.getSingleCow);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;
