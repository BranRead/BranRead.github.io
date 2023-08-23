const axyImage = new Image();
axyImage.src = '/pokemon-game/img/monsterSpriteSheets/axy.png';

const axyBlueImage = new Image();
axyBlueImage.src = '/pokemon-game/img/monsterSpriteSheets/axyBlue.png';

const bambooImage = new Image();
bambooImage.src = '/pokemon-game/img/monsterSpriteSheets/bamboo.png';

const bambooYellowImage = new Image();
bambooYellowImage.src = '/pokemon-game/img/monsterSpriteSheets/bambooYellow.png';

const butterflyImage = new Image();
butterflyImage.src = '/pokemon-game/img/monsterSpriteSheets/butterfly.png';

const butterflyBlueImage = new Image();
butterflyBlueImage.src = '/pokemon-game/img/monsterSpriteSheets/butterflyBlue.png';

const cyclopeImage = new Image();
cyclopeImage.src = '/pokemon-game/img/monsterSpriteSheets/cyclope.png';

const draggleImage = new Image();
draggleImage.src = '/pokemon-game/img/monsterSpriteSheets/draggle.png';

const embyImage = new Image();
embyImage.src = '/pokemon-game/img/monsterSpriteSheets/emby.png';

const skullImage = new Image();
skullImage.src = '/pokemon-game/img/monsterSpriteSheets/skull.png';

const skullBlueImage = new Image();
skullBlueImage.src = '/pokemon-game/img/monsterSpriteSheets/skullBlue.png';

const spiritImage = new Image();
spiritImage.src = '/pokemon-game/img/monsterSpriteSheets/spirit.png';

const spiritRedImage = new Image();
spiritRedImage.src = '/pokemon-game/img/monsterSpriteSheets/spiritRed.png';

const monsters = {
    Axy: {
        type: "Water",
        position: {
            x: 800,
            y: 100
        },
        image: axyImage,
        icon: "/pokemon-game/img/icons/axyIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: axyImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Axy',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Axy. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Bambo: {
        type: "Plant",
        position: {
            x: 800,
            y: 100
        },
        image: bambooImage,
        icon: "/pokemon-game/img/icons/bambooIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: bambooImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Bambo',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Bambo. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Boscis: {
        type: "Insect",
        position: {
            x: 800,
            y: 100
        },
        image: butterflyImage,
        icon: "/pokemon-game/img/icons/butterflyIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: butterflyImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Boscis',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Boscis. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Cranio: {
        type: "Ghost",
        position: {
            x: 800,
            y: 100
        },
        image: skullImage,
        icon: "/pokemon-game/img/icons/skullIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: skullImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Cranio',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Cranio. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Draggle: {
        type: "Dragon",
        position: {
            x: 800,
            y: 100
        },
        image: draggleImage,
        icon: "/pokemon-game/img/icons/draggleIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: draggleImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Draggle. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Emby: {
        type: "Fire",
        position: {
            x: 280,
            y: 325
        },
        image: embyImage,
        icon: "/pokemon-game/img/icons/embyIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: embyImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: false,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball, attacks.DisarmingLook, attacks.SleepCharm],
        about: "This is Emby. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Spookli: {
        type: "Ghost",
        position: {
            x: 800,
            y: 100
        },
        image: spiritImage,
        icon: "/pokemon-game/img/icons/spiritIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: spiritImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Spookli',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Spookli. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    UnoUne: {
        type: "Normal",
        position: {
            x: 800,
            y: 100
        },
        image: cyclopeImage,
        icon: "/pokemon-game/img/icons/cyclopeIcon.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: cyclopeImage,
        frontImage: true,
        backImage: false,
        animate: true,
        isEnemy: true,
        name: 'Uno-Une',
        attacks: [attacks.Tackle, attacks.Fireball],
        about: "This is Uno-Une. They are a wisp of flame given life by some unknown force. They develop close bonds with their friends and like to help out.",
        stats: {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },
    
}