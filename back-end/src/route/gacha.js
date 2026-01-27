import express from 'express';
import * as gachaController from '../controller/gachaController.js';
import * as oauthService from "../service/oauthService.js";
import * as permissionService from "../service/permissionService.js";

const gachaRoutes = express.Router();

gachaRoutes.post(
    "/gacha",
    oauthService.isLogin,
    permissionService.check(),
    gachaController.performGacha
);

gachaRoutes.post(
    "/gacha/add",
    gachaController.addGacha
)

export default gachaRoutes;

