import express from 'express';
import * as userCardController from '../controller/userCardController.js';
import * as oauthService from "../service/oauthService.js";
import * as permissionService from "../service/permissionService.js";

const userCardRoutes = express.Router();

userCardRoutes.get(
    "/users/:userId/cards",
    oauthService.isLogin,
    permissionService.check(),
    userCardController.getUserCards
);

export default userCardRoutes;

