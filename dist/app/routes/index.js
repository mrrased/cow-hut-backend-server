"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user,route");
const cow_Route_1 = require("../modules/cows/cow.Route");
const order_Route_1 = require("../modules/order/order.Route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_Route_1 = require("../modules/auth/auth.Route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_Route_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_Route_1.OrderRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_Route_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
