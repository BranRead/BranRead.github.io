// Ghasblr

const playerHouseDoor = new Door({
    enterFunction: () => {
        console.log("Entering house")
    },
    gamePosition: {
        x: 480,
        y: 85
    }
})
const ghasblrBackground = new Image();
ghasblrBackground.src = '/pokemon-game/img/gameWorld/ghasblrBackground.png';
const ghasblrBackgroundSprite = new Sprite({ 
    spritePosition: {
        x: 0,
        y: 0
    },
    gamePosition: {
        /////////////////////////////////////////////
        x: -1952,
        y: -818
        /////////////////////////////////////////////
    },
    dimensions: {
        width: 3840,
        height: 2560
    },
    image: ghasblrBackground,
});

const ghasblrForeground = new Image();
ghasblrForeground.src = '/pokemon-game/img/gameWorld/ghasblrForeground.png';
const ghasblrForegroundSprite = new Sprite({ 
    spritePosition: {
        x: 0,
        y: 0
    },
    gamePosition: {
        x: -1952,
        y: -818
    },
    dimensions: {
        width: 3360,
        height: 1920
    },
    image: ghasblrForeground 
});

const ghasblrBattleBackground = new Image();
ghasblrBattleBackground.src = '/pokemon-game/img/gameWorld/ghasblrBattleBackground.png';
const ghasblrBattleBackgroundSprite = new Sprite({
    spritePosition: {
        x: 0,
        y: 0
    },
    gamePosition: {
        x: 0,
        y: 0
    },
    dimensions: {
        width: 1024,
        height: 576
    },
    image: ghasblrBattleBackground,
    opacity: 0
});


// Player House
const playerHouseBackground = new Image();
playerHouseBackground.src = '/pokemon-game/img/gameWorld/playerHouseBackground.png';
const playerHouseForeground = new Image();
playerHouseForeground.src = '/pokemon-game/img/gameWorld/playerHouseForeground.png';

// Player room
const playerRoomBackground = new Image();
playerRoomBackground.src = '/pokemon-game/img/gameWorld/playerRoomBackground.png';
const playerRoomForeground = new Image();
playerRoomForeground.src = '/pokemon-game/img/gameWorld/playerRoomForeground.png';

const gameMapsData = {
    Ghasblr: {
        isActive: true,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.Ghasblr,
        battleZonesData: battleZonesData.Ghasblr,
        encounterRate: 0.01,
        offset: {
            x: -1952,
            y: -818
        },
        doors: [playerHouseDoor],
        canvasMove: {
            x: 0,
            y: 0
        },
        playerPosition: {
            x: (canvasSetup.canvas.width / 2) - (192 / 8),
            y: (canvasSetup.canvas.height / 2) - (68 / 2)
        },
        backgroundSprite: ghasblrBackgroundSprite,
        foregroundSprite: ghasblrForegroundSprite,
        battleBackgroundSprite: ghasblrBattleBackgroundSprite,
        itemsInWorld: [
            new Item (itemsGhasblr.AtkBoost),
            new Item (itemsGhasblr.DefBoost),
            new Item (itemsGhasblr.HealthPotion)
        ],
    }
}