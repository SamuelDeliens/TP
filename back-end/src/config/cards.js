export const cards = [
    {
        name: "Luma the Forest Sprite",
        image: "test.png",
        height: 6,
        weight: 25,
        rarity: "Common",
        attacks: [
            {
                name: "Leaf Cut",
                damage: 20,
                description: "Grass"
            },
            {
                name: "Nature Touch",
                damage: 10,
                description: "Grass"
            }
        ],
        weaknesses: "Fire"
    },
    {
        name: "Rocky the Pebble Beast",
        image: "test.png",
        height: 8,
        weight: 120,
        rarity: "Common",
        attacks: [
            {
                name: "Stone Punch",
                damage: 25,
                description: "Rock"
            },
            {
                name: "Ground Shake",
                damage: 15,
                description: "Rock"
            }
        ],
        weaknesses: "Water"
    },
    {
        name: "Zephy the Wind Cub",
        image: "test.png",
        height: 7,
        weight: 30,
        rarity: "Common",
        attacks: [
            {
                name: "Gust",
                damage: 18,
                description: "Air"
            },
            {
                name: "Swift Dash",
                damage: 12,
                description: "Air"
            }
        ],
        weaknesses: "Electric"
    },

    {
        name: "Elie the Firelord",
        image: "test.png",
        height: 10,
        weight: 80,
        rarity: "Rare",
        attacks: [
            {
                name: "Flame Burst",
                damage: 50,
                description: "Fire"
            },
            {
                name: "Heat Wave",
                damage: 30,
                description: "Fire"
            }
        ],
        weaknesses: "Water"
    },
    {
        name: "Voltaris the Storm Blade",
        image: "test.png",
        height: 11,
        weight: 65,
        rarity: "Rare",
        attacks: [
            {
                name: "Lightning Strike",
                damage: 45,
                description: "Electric"
            },
            {
                name: "Charge Slash",
                damage: 25,
                description: "Electric"
            }
        ],
        weaknesses: "Rock"
    },

    {
        name: "Astra the Celestial Dragon",
        image: "test.png",
        height: 18,
        weight: 220,
        rarity: "Legendary",
        attacks: [
            {
                name: "Cosmic Breath",
                damage: 90,
                description: "Cosmic"
            },
            {
                name: "Starfall",
                damage: 60,
                description: "Cosmic"
            }
        ],
        weaknesses: "Dark"
    },
    {
        name: "Nyx the Eternal Shadow",
        image: "test.png",
        height: 16,
        weight: 150,
        rarity: "Legendary",
        attacks: [
            {
                name: "Void Slash",
                damage: 85,
                description: "Dark"
            },
            {
                name: "Nightmare Pulse",
                damage: 65,
                description: "Dark"
            }
        ],
        weaknesses: "Light"
    }
]

export const raritiesProbabilities = {
    "Common": 0.7,
    "Rare": 0.25,
    "Legendary": 0.05
}