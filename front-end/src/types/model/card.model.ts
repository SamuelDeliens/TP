export default interface CardModel {
    cardId: string;
    name: string;
    imageUrl: string;
    hp: string;
    rarity: string;
    attacks: {
        name: string;
        damage: string;
        description: string;
    }[];
    weaknesses: string;
}
