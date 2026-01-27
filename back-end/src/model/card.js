import {Model} from "sequelize";
import {cards} from "../config/cards.js";
import {config} from "../config/config.js";

const isValidAttack = (value) => {
    for (const attack of value) {
        if (!attack || typeof attack !== 'object') {
            throw new Error('attack must be an object');
        }
        if (typeof attack.name !== 'string' || attack.name.trim() === '') {
            throw new Error('attack.name must be a non-empty string');
        }
        if (typeof attack.description !== 'string') {
            throw new Error('attack.description must be a string');
        }
        if (typeof attack.damage !== 'number' || Number.isNaN(attack.damage)) {
            throw new Error('attack.damage must be a number');
        }
    }
}

class CardModel extends Model {}

const Card = async (sequelize, DataTypes) => {
    CardModel.init(
        {
            cardId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING(50),
            },
            imageUrl: {
                allowNull: false,
                unique: false,
                type: DataTypes.STRING,
                get() {
                    const rawValue = this.getDataValue('imageUrl');

                    if (!rawValue) return null;

                    return `http://${config.app.host}:${config.app.port}${config.app.root}/images/${rawValue}`;
                }
            },
            height: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                }
            },
            weight: {
                allowNull: false,
                type: DataTypes.FLOAT,
                validate: {
                    min: 0.10,
                }
            },
            rarity: {
                allowNull: false,
                type: DataTypes.STRING(50),
                validate: {
                    is: 'Common|Rare|Legendary'
                }
            },
            attacks: {
                allowNull: false,
                type: DataTypes.JSON,
                validate: {
                    isValidAttack: isValidAttack
                }
            },
            weakness: {
                allowNull: true,
                type: DataTypes.STRING(50),
            }
        },
        {
            sequelize,
            modelName: 'Card'
        },
    )

    try {
        await CardModel.sync();

        console.log('init Card');

        for (const card of cards) {
            await CardModel.findOrCreate({
                where: {
                    name: card.name
                },
                defaults: {
                    name: card.name,
                    imageUrl: card.image,
                    height: card.height,
                    weight: card.weight,
                    rarity: card.rarity,
                    attacks: card.attacks || [],
                    weakness: card.weaknesses || null
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export {
    Card,
    CardModel
};
