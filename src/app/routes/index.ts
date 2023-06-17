import express from 'express';
import { UserRoutes } from '../modules/users/user,route';
import { CowRoutes } from '../modules/cows/cow.Route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users/', UserRoutes);
// router.use('/academic-semesters', SemesterRoutes);

export default router;
