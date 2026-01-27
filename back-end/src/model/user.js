import { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
import {typePermissions} from "../config/constant.js";
import {config} from "../config/config.js";

class UserModel extends Model {}

const User = async (sequelize, DataTypes) => {
    UserModel.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            login: {
                type: DataTypes.STRING(50),
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            permissions: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: typePermissions.default,
            },
            cards: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            availableGachaPulls: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2,
            }
        },
        {
            sequelize,
            modelName: 'User',
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        user.password = await bcryptjs.hash(user.password, 10);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        user.password = await bcryptjs.hash(user.password, 10);
                    }
                },
            },
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
        }
    );

    try {
        await UserModel.sync();

        console.log('init User');

        await UserModel.findOrCreate({
            where: {
                login: config.user.login
            },
            defaults: {
                password: config.user.password,
                permissions: config.user.permissions,
                availableGachaPulls: 2
            },
        });
    } catch (e) {
        console.log(e);
    }
}

export {
    User,
    UserModel
}
