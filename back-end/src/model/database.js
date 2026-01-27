import {DataTypes, Sequelize} from "sequelize";
import {config} from "../config/config.js";
import {Client} from "./client.js";
import {User} from "./user.js";
import {UserCard} from "./userCard.js";
import {Card} from "./card.js";

const db = {};

const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        dialect: config.database.dialect,
        host: config.database.host,
        port: config.database.port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(() => console.log('error connection'));

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected');
    } catch (e) {
        console.log(e);
    }
}
db.init = async () => {
    await db.connect();
    await Client(db.sequelize, DataTypes);
    await User(db.sequelize, DataTypes);
    await Card(db.sequelize, DataTypes);
    await UserCard(db.sequelize, DataTypes);
}

export default db;
