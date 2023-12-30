// Ghasblr

const playerHouseDoor = new Door({
    enterFunction: () => {
        audio.Map.stop()
        // Turns on black div for a moment
        gsap.to('#overlappingDiv', {
            opacity: 1,
            repeat: 0,
            yoyo: false,
            duration: 1,
            onComplete() {
                canvasSetup.clearScreen(gameLogic.maps[0].context);
                gameLogic.maps[1].isActive = true;
                gameLogic.maps[0].isActive = false;
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        })
    },
    gamePosition: {
        x: 480,
        y: 85
    }
})

const playerHouseDoorExit = new Door({
    enterFunction: () => {
        // audio.Map.stop()
        // Turns on black div for a moment
        gsap.to('#overlappingDiv', {
            opacity: 1,
            repeat: 0,
            yoyo: false,
            duration: 1,
            onComplete() {
                canvasSetup.clearScreen(gameLogic.maps[1].context);
                gameLogic.maps[0].context.restore();
                gameLogic.maps[1].isActive = false;
                gameLogic.maps[0].isActive = true;
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        })
    },
    gamePosition: {
        x: 480,
        y: 350
    }
})
const ghasblrBackground = new Image();
ghasblrBackground.src = '/pokemon-game/img/gameWorld/ghasblrBackground.png';
const ghasblrBackgroundSprite = new Sprite({ 
    gamePosition: {
        x: -1952,
        y: -818
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

const playerHouseBackgroundSprite = new Sprite({
   gamePosition: {
        // Also offset for whole house
        x: 288,
        y: -890
   },
   dimensions: {
        width: 1280,
        height: 1280
   },
   image: playerHouseBackground
})
const playerHouseForeground = new Image();
playerHouseForeground.src = '/pokemon-game/img/gameWorld/playerHouseForeground.png';

const playerHouseForegroundSprite = new Sprite({
    gamePosition: {
        x: 288,
        y: -890
    },
    dimensions: {
        width: 1280,
        height: 1280
    },
    image: playerHouseForeground
 })

// Player room
const playerRoomBackground = new Image();
playerRoomBackground.src = '/pokemon-game/img/gameWorld/playerRoomBackground.png';
const playerRoomForeground = new Image();
playerRoomForeground.src = '/pokemon-game/img/gameWorld/playerRoomForeground.png';

const gameMapsData = {
    Ghasblr: {
        isActive: false,
        symbolForCollision: 46,
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
    },
    PlayerHouse: {
        isActive: true,
        symbolForCollision: 860,
        widthInTiles: 20,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.PlayerHouse,
        encounterRate: 0,
        offset: {
            x: 288,
            y: -890
        },
        doors: [playerHouseDoorExit],
        canvasMove: {
            x: 0,
            y: 0
        },
        // Need to edit
        playerPosition: {
            x: (canvasSetup.canvas.width / 2) - (192 / 8),
            y: (canvasSetup.canvas.height / 2) - (68 / 2)
        },
        backgroundSprite: playerHouseBackgroundSprite,
        foregroundSprite: playerHouseForegroundSprite,
        battleBackgroundSprite: null,
        itemsInWorld: [],
    }
}