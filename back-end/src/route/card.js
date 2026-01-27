import express from 'express';
import * as cardController from '../controller/cardController.js';
import * as oauthService from "../service/oauthService.js";
import * as permissionService from "../service/permissionService.js";

const cardRoutes = express.Router();

cardRoutes.get(
    "/cards",
    oauthService.isLogin,
    permissionService.check(),
    cardController.getCards
);

cardRoutes.get(
    "/cards/:cardId",
    oauthService.isLogin,
    permissionService.check(),
    cardController.getCardById
);

export default cardRoutes;