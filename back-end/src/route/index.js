import express from "express";
import oauthRoutes from "./oauth.js";
import userRoutes from "./user.js";
import cardRoutes from "./card.js";
import userCardRoutes from "./userCard.js";
import gachaRoutes from "./gacha.js";
import path from "path";
import {fileURLToPath} from "node:url";
import {getOauthStatus, switchOauthStatus} from "../config/config.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
    error: false,
    message: 'Welcome to the api root'
}))

router.get(
    '/swichAuth',
    (req, res) => {
        switchOauthStatus();
        return res.status(200).send({
            error: false,
            message: 'Oauth Status Updated',
            data: {
                status: getOauthStatus()
            }
        });
    }
)

router.use(
    '/images',
    express.static(path.join(__dirname, '../assets'))
);

router.use('/oauth', oauthRoutes);
router.use('/', userRoutes);
router.use('/', cardRoutes);
router.use('/', userCardRoutes);
router.use('/', gachaRoutes);

export default router;
