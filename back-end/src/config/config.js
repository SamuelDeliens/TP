import process from "node:process";
import dotenv from "dotenv";
import {typePermissions} from "./constant.js";
dotenv.config();

export const config = {
    database: {
        name: process.env.DB_NAME || 'node',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql',
    },

    app: {
        port: process.env.APP_PORT || '3000',
        host: process.env.APP_HOST || 'localhost',
        root: process.env.APP_ROOT || '/api/v1',
    },

    client: {
        clientId: process.env.DEFAULT_CLIENT_ID,
        clientSecret: process.env.DEFAULT_CLIENT_SECRET,
        redirectUri: process.env.DEFAULT_CLIENT_REDIRECT_URI
    },

    token: {
        code: {
            expiresInString: '5min',
            expiresIn: 7200
        },
        accessToken: {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresInString: '15m',
            expiresIn: 7200
        },
        refreshToken: {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresInString: '2h',
            expiresIn: 7200
        },
        userToken: {
            secret: process.env.USER_TOKEN_SECRET,
            algorithm: process.env.USER_TOKEN_ALGORITHM || 'aes-256-cbc'
        }
    },

    user: {
        familyName: process.env.DEFAULT_USER_NAME,
        firstName: process.env.DEFAULT_USER_FIRSTNAME,
        login: process.env.DEFAULT_USER_LOGIN,
        password: process.env.DEFAULT_USER_PASSWORD,
        birthDate: process.env.DEFAULT_USER_BIRTHDATE,
        permissions: JSON.parse(process.env.DEFAULT_USER_PERMISSIONS || JSON.stringify(typePermissions.all))
    },
};
