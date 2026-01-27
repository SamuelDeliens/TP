import {Model} from "sequelize";

class UserCardModel extends Model {}

const UserCard = async (sequelize, DataTypes) => {
    UserCardModel.init(
        {
            userCardId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            cardId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: "UserCard"
        }
    )

    try {
        await UserCardModel.sync();

        console.log('init UserCard');
    } catch (e) {
        console.log(e);
    }
}

export {
    UserCard,
    UserCardModel
}
