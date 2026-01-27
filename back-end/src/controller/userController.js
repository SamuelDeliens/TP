import {typePermissions} from '../config/constant.js';
import {UserModel} from '../model/user.js';
import {encrypt} from "../service/encryptService.js";
import {validateFields} from "../service/validatorService.js";

async function createUser(req, res) {
    const { login, password } = req.body;
    const permissions = req.body.permissions || typePermissions.default;

    const requireFields = [
        {value: login, name: 'login', type: String},
        {value: password, name: 'password', type: String},
        {value: permissions, name: 'permissions', type: Array, default: typePermissions.default}
    ];

    const error = validateFields(requireFields);
    if (error) {
        return res.status(400).send({
            error: true,
            message: error,
        });
    }
    if (permissions !== typePermissions.default) {
        for (const permission of permissions) {
            if (!typePermissions.all.includes(permission)) {
                return res.status(400).send({
                    error: true,
                    message: 'Invalid field permissions',
                });
            }
        }
    }

    try {
        const [user, created] = await UserModel.findOrCreate({
            where: {
                login: login
            },
            defaults: {
                login,
                password,
                permissions,
            }
        });
        if (!created) {
            return res.status(400).send({
                error: true,
                message: 'User already exists'
            });
        }

        delete user.dataValues.password;
        const result = {
            method: 'Create',
            status: 201,
            message: 'User Created',
            detail: encrypt(user.dataValues.login),
        }

        return res.status(result.status).send({
            error: false,
            message: result.message,
            data: user
        });
    }
    catch (e) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
            data: e
        });
    }
}

async function getUsers (req, res) {
    let page = req.query.page || 1;
    let pageSize = req.query.pageSize ||  20;

    const requiredFields = [
        {value: page, name: 'page', type: Number, default: 1},
        {value: pageSize, name: 'pageSize', type: Number, default: 20},
    ];
    const error = validateFields(requiredFields);
    if (error) {
        return res.status(400).send({
            error: true,
            message: error,
        });
    }

    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    try {
        const users = await UserModel.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: {
                exclude: ['password']
            }
        });

        return res.status(200).send({
            error: false,
            message: "Users found",
            data: {
                total: users.count,
                users: users.rows,
                currentPage: page,
                totalPages: Math.ceil(users.count / limit),
            }
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
            data: e
        });
    }

}

async function getUserById(req, res)  {
    const userId = req.params.userId;

    try {
        const user = await UserModel.findByPk(userId);

        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }
        return res.status(200).send({
            error: false,
            message: "User found",
            data: user
        })
    }
    catch (e) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
            data: e
        });
    }

}

async function updateUser(req, res) {
    const userId = req.params.userId;
    const {
        family_name: familyName,
        first_name: firstName,
        login,
        password,
        birth_date: birthDate,
        permissions: permissions
    } = req.body;

    const requireFields = [
        {value: familyName, name: 'familyName', type: String, default: ''},
        {value: firstName, name: 'firstName', type: String, default: ''},
        {value: login, name: 'login', type: String, default: ''},
        {value: password, name: 'password', type: String, default: ''},
        {value: birthDate, name: 'birthDate', type: Date, default: ''},
        {value: permissions, name: 'permissions', type: Array, default: typePermissions.default}
    ];

    const error = validateFields(requireFields);
    if (error) {
        return res.status(400).send({
            error: true,
            message: error,
            data: null
        });
    }
    if (permissions) {
        for (const permission of permissions) {
            if (!typePermissions.all.includes(permission)) {
                return res.status(400).send({ error: true, message: 'Invalid field permission' });
            }
        }
    }

    let updateValues = {};
    for (const field of requireFields) {
        if (field.value) {
            updateValues[field.name] = field.value;
        }
    }
    updateValues.permissions = permissions ? permissions : undefined;

    try {
        let user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }

        user = await user.update(updateValues);
        delete user.dataValues.password;

        const result = {
            method: 'Update',
            status: 200,
            message: 'User updated',
            detail: encrypt(user.dataValues.login),
        }

        return res.status(result.status).send({
            error: false,
            message: result.message,
            data: user
        });
    } catch (e) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
            data: e
        });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId;

    try {
        const user = await UserModel.findByPk(userId);
        if (!user) {
            return res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }

        await user.destroy();

        const result = {
            method: 'Delete',
            status: 204,
            message: 'User deleted',
            detail: user
        }

        return res.status(result.status).send({
            error: false,
            message: result.message,
            data: result.detail
        });
    } catch (e) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
            data: e });
    }
}


export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
