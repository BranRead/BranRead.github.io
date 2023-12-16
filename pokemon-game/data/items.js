const potionImage = new Image();
potionImage.src = '/pokemon-game/img/inventory/restoration.png';

const items = {
    HealthPotion: {
        name: "Health Potion", 
        sprite: potionImage, 
        quantity: 3, 
        useCategory: "restore", 
        description: "A health potion which heals 25 health.",
        strength: 25
    },

    SmokeScreen: {
        name: "Smoke Screen",
        sprite: null,
        quantity: 1,
        useCategory: "flee",
        description: "A health potion which heals 25 health.",
    },

    WaterStaff: {
        name: "Water Staff",
        sprite: null,
        quantity: 1,
        useCategory: "attack",
        description: "A health potion which heals 25 health.",
        durability: 25,
        attack: attacks.WaterStaff
    },

    AtkBoost: {
        name: "Atk Boost",
        sprite: potionImage,
        quantity: 1,
        useCategory: "statBoost",
        description: "An item which temporarily boosts the attack of a monster by 10 points.",
        boost: {
            stat: "atk",
            amount: 10
        }
    },
    
    DefBoost: {
        name: "Def Boost",
        sprite: potionImage,
        quantity: 1,
        useCategory: "statBoost",
        description: "An item which temporarily boosts the defense of a monster by 10 points.",
        boost: {
            stat: "def",
            amount: 10
        }
    },
    
    MagicalAtkBoost: {
        name: "Magical Atk Boost",
        sprite: null,
        quantity: 1,
        useCategory: "stat boost",
        description: "A health potion which heals 25 health.",
        boost: {
            stat: "magAtk",
            amount: 10
        }
    }, 

    MagicalDefBoost: {
        name: "Magical Def Boost",
        sprite: null,
        quantity: 1,
        useCategory: "stat boost",
        description: "A health potion which heals 25 health.",
        boost: {
            stat: "magDef",
            amount: 10
        }
    }, 

    SpdBoost: {
        name: "Atk Boost",
        sprite: null,
        quantity: 1,
        useCategory: "stat boost",
        description: "A health potion which heals 25 health.",
        boost: {
            stat: "spd",
            amount: 10
        }
    }
}