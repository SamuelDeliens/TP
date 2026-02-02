import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcryptjs from "bcryptjs";

import {config, getOauthStatus} from "../config/config.js";
import {ClientModel} from "../model/client.js";
import {UserModel} from "../model/user.js";

function generateToken(userId, secret, expiresIn) {
    return jwt.sign(
        { userId },
        secret,
        { expiresIn }
    );
}

function refreshTokens(userId) {
    return {
        accessToken: generateToken(
            userId,
            config.token.accessToken.secret,
            config.token.accessToken.expiresInString
        ),
        refreshToken: generateToken(
            userId,
            config.token.refreshToken.secret,
            config.token.refreshToken.expiresInString
        )
    };
}

function isTokenValid(token, secret) {
    try {
        jwt.verify(token, secret);
        return true;
    } catch(_e) {
        return false;
    }
}

function getUserIdFromToken(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decodedToken.userId;
    } catch (_e) {
        return null;
    }
}

async function handleAuthorize(req, res, _next) {
    console.log('authorize');
    //Front connection
    //Front app ask API to return code to be sure Front is not a scam
    //We suppose the front app is the fake: client1, http://localhost/callback
    //The API have to return code + redirect page login
    //Then the user have to enter credential and code
    // => the page send now a new request to token
    const clientId = req.query.clientId;
    const redirectUri = req.query.redirectUri;

    if (!clientId || !redirectUri) {
        return res.status(400).send({
            error: true,
            message: 'Bad request',
            data: 'clientId and redirectUri are required'
        });
    }

    const client = await ClientModel.findOne({
        where: {clientId: clientId, redirectUri: redirectUri}
    })
    if (!client) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized client',
            data: 'Authentication credentials were not provided or are invalid'
        });
    }

    client.oauthCode = crypto.randomBytes(16).toString('hex');
    client.codeDate = new Date();
    await client.save();

    res.redirect(`${redirectUri}?code=${client.oauthCode}`);
}

async function handleToken(req, res, _next) {
    console.log('token');
    //User connection
    //the user send code + credential of the user
    //then API check the code and the credential
    //then API generate tokens
    //store tokens to base
    //send user access token to connect then
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;
    const authCode = req.query.code;

    const client = await ClientModel.findOne({
        where: {clientId: clientId, clientSecret: clientSecret, oauthCode: authCode}
    })
    if (!client) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized client',
            data: 'Authentication credentials were not provided or are invalid'
        });
    }

    if (client.codeDate < new Date(Date.now() - config.token.code.expiresIn * 1000)) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized client',
            data: 'Authentication code has expired'
        });
    }

    const login = req.body.login;
    const password = req.body.password;

    const user = await UserModel.findOne({
        where: {login: login},
        attributes: { include: ['password'] },
    });
    if (!user) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized',
            data: 'Invalid user credentials'
        });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized',
            data: 'Invalid user credentials'
        });
    }

    const userId = user.userId;
    const { accessToken, refreshToken } = refreshTokens(userId);

    return res.status(200).send({
        error: false,
        message: 'OK',
        data: {
            user_id: userId,
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer',
            access_expires_in: config.token.accessToken.expiresIn,
            refresh_expires_in: config.token.refreshToken.expiresIn
        }
    });
}

function isLogin(req, res, next) {
    console.log('isLogin');
    if (!getOauthStatus()) {
        return next()
    }

    let accessToken = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    let refreshToken = "";

    if (!accessToken) {
        return res.status(400).send({
            error: true,
            message: 'Unauthorized',
            data: 'Missing user credentials'
        });
    }

    if (!isTokenValid(accessToken, process.env.ACCESS_TOKEN_SECRET)) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized',
            data: 'Access token and refresh token are invalid'
        });
    }

    let userId = getUserIdFromToken(accessToken);
    if (!userId) {
        return res.status(401).send({
            error: true,
            message: 'Unauthorized',
            data: 'Access token and refresh token are invalid'
        });
    }
    else {
        ({accessToken, refreshToken} = refreshTokens(userId));
    }

    req.userId = userId;

    res.set('Authorization', `Bearer ${accessToken}`);
    res.set('Refresh_Token', `Bearer ${refreshToken}`);

    next();
}


export {
    handleAuthorize,
    handleToken,
    isLogin
}