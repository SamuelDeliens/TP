import express from 'express';
import * as userController from '../controller/userController.js';
import * as oauthService from "../service/oauthService.js";
import * as permissionService from "../service/permissionService.js";

const userRoutes = express.Router();

userRoutes.post(
    '/register',
    (req, res, next) => {
        req.body.permissions = undefined;
        next();
    },
    userController.createUser
);

userRoutes.post(
    '/users',
    oauthService.isLogin,
    permissionService.check(),
    userController.createUser
);

userRoutes.get(
    '/users',
    oauthService.isLogin,
    permissionService.check(),
    userController.getUsers
);

userRoutes.get(
    '/users/:userId',
    oauthService.isLogin,
    permissionService.check(),
    userController.getUserById
);

userRoutes.put(
    '/users/:userId',
    oauthService.isLogin,
    permissionService.check(),
    userController.updateUser
);

userRoutes.patch(
    '/users/:userId',
    oauthService.isLogin,
    permissionService.check(),
    userController.updateUser
);

userRoutes.delete(
    '/users/:userId',
    oauthService.isLogin,
    permissionService.check(),
    userController.deleteUser
);

export default userRoutes;