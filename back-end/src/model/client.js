import {Model} from "sequelize";

import { config } from "../config/config.js";

class ClientModel extends Model {}

const Client = async (sequelize, DataTypes) => {

    ClientModel.init(
        {
            clientId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            clientSecret: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING(50),
            },
            redirectUri: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            oauthCode: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            codeDate: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Client',
        },
    )

    try {
        await ClientModel.sync();

        console.log('init Client');

        await ClientModel.findOrCreate({
            where: {
                clientId: config.client.clientId,
                redirectUri: config.client.redirectUri
            },
            defaults: {
                clientId: config.client.clientId,
                clientSecret: config.client.clientSecret,
                redirectUri: config.client.redirectUri,
                oauthCode: null,
                codeDate: null
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export {
    Client,
    ClientModel
}
