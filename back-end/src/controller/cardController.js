import {CardModel} from '../model/card.js';

async function getCards(req, res) {
    try {
        const cards = await CardModel.findAll();
        return res.status(200).send({
            error: false,
            message: 'Cards retrieved successfully',
            data: cards,
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getCardById(req, res) {
    const cardId = req.params.cardId;
    try {
        const card = await CardModel.findByPk(cardId);
        if (!card) {
            return res.status(404).send({
                error: true,
                message: 'Card not found',
            });
        }
        return res.status(200).send({
            error: false,
            message: 'Card retrieved successfully',
            data: card,
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: 'Internal server error',
        });
    }
}

export {
    getCards,
    getCardById
}