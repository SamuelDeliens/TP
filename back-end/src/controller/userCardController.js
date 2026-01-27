import {UserCardModel} from '../model/userCard.js';
import {CardModel} from "../model/card.js";

async function getUserCards(req, res) {
    const {userId} = req.params;

    try {
        const userCards = await UserCardModel.findAll({
            where: {userId: userId}
        });

        const cards = [];
        for (const userCard of userCards) {
            const card = await CardModel.findOne({
                where: {cardId: userCard.cardId}
            })
            cards.push(card);
        }

        return res.status(200).send({
            error: false,
            message: 'User cards retrieved successfully',
            data: cards,
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
        });
    }
}

export {
    getUserCards
}