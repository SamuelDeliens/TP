import {CardModel} from '../model/card.js';
import {UserCardModel} from '../model/userCard.js';
import {raritiesProbabilities} from '../config/cards.js';
import {UserModel} from "../model/user.js";

export async function performGacha(req, res) {
    console.log("gacha")

    const userId = req.body.userId;

    const user = await UserModel.findByPk(userId);
    if (!user) {
        return res.status(404).send({
            error: true,
            message: 'User not found',
        });
    }

    const availableGachaCound = user.availableGachaPulls || 0;
    if (availableGachaCound <= 0) {
        return res.status(400).send({
            error: true,
            message: 'No available gacha pulls left',
        });
    }

    try {
        const rand = Math.random();
        let cumulativeProbability = 0;
        let selectedRarity = 'common';

        for (const [rarity, probability] of Object.entries(raritiesProbabilities)) {
            cumulativeProbability += probability;
            if (rand <= cumulativeProbability) {
                selectedRarity = rarity;
                break;
            }
        }

        const availableCards = await CardModel.findAll({
            where: {rarity: selectedRarity}
        });
        if (availableCards.length === 0) {
            return res.status(404).send({
                error: true,
                message: `No cards available for selected rarity: ${selectedRarity}`,
            });
        }

        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const obtainedCard = availableCards[randomIndex];

        //add the obtained card to the user's collection
        await UserCardModel.create({
            userId: userId,
            cardId: obtainedCard.cardId,
        });

        user.availableGachaPulls -= 1;
        await user.save();

        return res.status(200).send({
            error: false,
            message: 'Gacha performed successfully',
            data: {
                obtainedCard: obtainedCard,
                user: user
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
        });
    }
}

export async function addGacha(req, res) {
    const userId = req.body.userId;

    const user = await UserModel.findByPk(userId);
    if (!user) {
        return res.status(404).send({
            error: true,
            message: 'User not found',
        });
    }

    user.availableGachaPulls += 1;
    await user.save();

    return res.status(200).send({
        error: false,
        message: 'Gacha add successfully',
        data: user
    });
}