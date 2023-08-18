const embyBack = new Image();
embyBack.src = '/pokemon-game/img/embyBack.png';

const embyFront = new Image();
embyFront.src = '/pokemon-game/img/embyBack.png';

const wyvyBack = new Image();
wyvyBack.src = '/pokemon-game/img/wyvyBack.png';

const wyvyFront = new Image();
wyvyFront.src = '/pokemon-game/img/wyvyFront.png';

const slimeBack = new Image();
slimeBack.src = '/pokemon-game/img/slimeBack.png';

const slimeFront = new Image();
slimeFront.src = '/pokemon-game/img/slimeFront.png';

const monsters = {
    Emby: {
        position: {
            x: 280,
            y: 325
        },
        image: embyBack,
        icon: "/pokemon-game/img/iconEmby.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: {
            backImage: embyBack,
            frontImage: embyFront
        },
        animate: true,
        isEnemy: false,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball, attacks.DisarmingLook, attacks.SleepCharm],
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
            friend: 50,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Wyvy: {
        position: {
            x: 800,
            y: 100
        },
        image: wyvyFront,
        icon: "/pokemon-game/img/iconWyvy.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: {
            backImage: wyvyBack,
            frontImage: wyvyFront
        },
        animate: true,
        isEnemy: true,
        name: 'Wyvy',
        attacks: [attacks.Tackle, attacks.Fireball],
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
            spd: 50,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },

    Slime: {
        position: {
            x: 800,
            y: 100
        },
        image: slimeFront,
        icon: "/pokemon-game/img/iconEmby.png",
        frames: {
            max: 4,
            hold: 30
        },
        sprites: {
            backImage: slimeBack,
            frontImage: slimeFront
            },
        animate: true,
        isEnemy: true,
        name: 'Slime',
        attacks: [attacks.Tackle, attacks.Fireball],
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
            spd: 50,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    },
}