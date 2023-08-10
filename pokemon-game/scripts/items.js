const items = {
    HealthPotion: {
        name: "Health Potion", 
        sprite: null, 
        quantity: 3, 
        useCategory: "healing", 
        strength: 25
    },

    SmokeScreen: {
        name: "Smoke Screen",
        sprite: null,
        quantity: 1,
        useCategory: "flee"
    },

    WaterStaff: {
        name: "Water Staff",
        sprite: null,
        quantity: 1,
        useCategory: "attack",
        durability: 25,
        attack: attacks.WaterStaff
    },

    AtkBoost: {
        name: "Atk Boost",
        sprite: null,
        quantity: 1,
        useCategory: "stat boost",
        boost: {
            stat: "atk",
            amount: 10
        }
    },
    
    DefBoost: {
        name: "Def Boost",
        sprite: null,
        quantity: 1,
        useCategory: "stat boost",
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
        boost: {
            stat: "spd",
            amount: 10
        }
    }
}