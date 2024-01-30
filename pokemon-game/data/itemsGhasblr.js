const itemSpritesheet = new Image();
itemSpritesheet.src = "img/inventory/itemSpritesheet.png";

const itemsGhasblr = {
    HealthPotion: {
        spritePosition: {
            x: 32,
            y: 256
        },
        gamePosition: {
            x: -200,
            y: -375
        },
        image: itemSpritesheet,
        sprites: itemSpritesheet,
        name: "Health Potion",  
        quantity: 1, 
        useCategory: "restore", 
        description: "A health potion which heals 25 health.",
        strength: 25
    },

    AtkBoost: {
        spritePosition: {
            x: 352,
            y: 32
        },
        gamePosition: {
            x: 695,
            y: 350
        },
        image: itemSpritesheet,
        sprites: itemSpritesheet,
        name: "Atk Boost",
        quantity: 1,
        useCategory: "statBoost",
        description: "An item which temporarily boosts the attack of a monster by 10 points.",
        boost: {
            stat: "atk",
            amount: 10
        }
    },
    
    DefBoost: {
        spritePosition: {
            x: 384,
            y: 32
        },
        gamePosition: {
            x: -388,
            y: 680
        },
        image: itemSpritesheet,
        sprites: itemSpritesheet,
        name: "Def Boost",
        quantity: 1,
        useCategory: "statBoost",
        description: "An item which temporarily boosts the defense of a monster by 10 points.",
        boost: {
            stat: "def",
            amount: 10
        }
    },
}

// spritePosition,
// gamePosition,
// dimensions = {
//     width: 32,
//     height: 32
// },
// image,
// sprites,
// animate,
// frames = { max: 1, hold: 10 },
// rotation = 0,

// name,
// quantity = 1,
// useCategory,
// description,
// strength,
// boost 