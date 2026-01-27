import express from 'express'
import { handleAuthorize, handleToken } from "../service/oauthService.js";

const oauthRoutes = express.Router();

oauthRoutes.get('/', (req, res) => res.status(200).send({
    error: false,
    message: 'Welcome to the oauth root'
}))

oauthRoutes.get(
    '/authorize',
    handleAuthorize
)

oauthRoutes.post(
    '/token',
    handleToken
)

export default oauthRoutes;