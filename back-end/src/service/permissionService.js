import { typePermissions } from "../config/constant.js";
import {UserModel} from "../model/user.js";

function retrievePermissions(req) {
    const permissions = [];

    // setup default variables permLoggedUser and permRsrcUserId
    // permLoggedUser is the user who is currently logged in
    // permRsrcUserId is the user who owns the resource
    req.permLoggedUser = req.permLoggedUser ? req.permLoggedUser : req.userId;
    req.permRsrcUserId = req.permRsrcUserId ? req.permRsrcUserId : req.params.userId;

    let destination = null;
    if (req.permRsrcUserId && req.method !== 'GET') {
        destination =
            req.permRsrcUserId === req.permLoggedUser ? typePermissions.destination.self : typePermissions.destination.all;
    }

    const method = typePermissions.method[req.method];
    for (const resource in typePermissions.resource) {
        if (req.url.includes(resource)) {
            let finalPermission;
            if (destination) {
                finalPermission = `${typePermissions.resource[resource]}:${method}:${destination}`;
            } else {
                finalPermission = `${typePermissions.resource[resource]}:${method}`;
            }
            if (!permissions.includes(finalPermission)) {
                permissions.push(finalPermission);
            }
            break;
        }
    }

    return permissions;
}

function check(otherPermissions) {
    return async (req, res, next) => {
        console.log('isAuthorized');

        try {
            let permissions = [];
            if (!otherPermissions) {
                permissions = retrievePermissions(req);
            } else {
                permissions = permissions.concat(otherPermissions);
            }

            const user = await UserModel.findByPk(req.userId);
            const userPermissions = user.permissions;

            for (const permission of permissions) {
                if (!userPermissions.includes(permission)) {
                    return res.status(403).send({
                        error: true,
                        message: 'User not authorized to access this resource',
                    });
                }
            }
        } catch(e) {
            return res.status(500).send({
                error: true,
                message: 'Internal server error',
                data: e
            });
        }

        next();
    }
}

export {
    check
}
