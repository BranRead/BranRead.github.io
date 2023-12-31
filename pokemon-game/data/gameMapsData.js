const positions = {
    GhasblrFromPlayerHouse: {
        x: -1952,
        y: -818 
    },

    PlayerHouseFromGhasblr: {
        x: 288,
        y: -918
    },

    PlayerHouseFromPlayerRoom: {
        x: -620,
        y: -190
    },

    PlayerRoomFromPlayerHouse: {
        x: -610,
        y: -190  
    },

    PlayerBed: {
        x: -224,
        y: -190  
    },
}



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

const playerHouseStairsUp = new Door({
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
                gameLogic.maps[1].isActive = false;
                gameLogic.maps[2].isActive = true;
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        })
    },
    gamePosition: {
        x: 1442,
        y: -500
    }
})


const playerHouseStairsDown = new Door({
    enterFunction: () => {
        // audio.Map.stop()
        // Turns on black div for a moment
        gsap.to('#overlappingDiv', {
            opacity: 1,
            repeat: 0,
            yoyo: false,
            duration: 1,
            onComplete() {
                gameLogic.maps[1].backgroundSprite.gamePosition = positions.PlayerHouseFromPlayerRoom;
                gameLogic.maps[1].foregroundSprite.gamePosition = positions.PlayerHouseFromPlayerRoom;
                gameLogic.maps[1].offset = positions.PlayerHouseFromPlayerRoom;

                gameLogic.maps[1].collidingObjects = [];

                gameLogic.maps[1].collisionsMap.forEach((row, i) => {
                    row.forEach((symbol, j) => {
                        if(symbol == gameLogic.maps[1].symbolForCollision)
                        gameLogic.maps[1].collidingObjects.push(
                            new Boundary({
                                gamePosition: {
                                    x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                    y: i * Boundary.height + gameLogic.maps[1].offset.y,
                                }
                            })
                        )
                    })
                });
                
        
                canvasSetup.clearScreen(gameLogic.maps[2].context);
                gameLogic.maps[2].isActive = false;
                gameLogic.maps[1].isActive = true;
                
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        })
    },
    gamePosition: {
        x: 540,
        y: 258
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
        y: 320
    }
})

const ghasblrBackground = new Image();
ghasblrBackground.src = '/pokemon-game/img/gameWorld/ghasblrBackground.png';
const ghasblrBackgroundSprite = new Sprite({ 
    gamePosition: positions.GhasblrFromPlayerHouse,
    dimensions: {
        width: 3840,
        height: 2560
    },
    image: ghasblrBackground,
});

const ghasblrForeground = new Image();
ghasblrForeground.src = '/pokemon-game/img/gameWorld/ghasblrForeground.png';
const ghasblrForegroundSprite = new Sprite({ 
    gamePosition: positions.GhasblrFromPlayerHouse,
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
   gamePosition: positions.PlayerHouseFromGhasblr,
   dimensions: {
        width: 1280,
        height: 1280
   },
   image: playerHouseBackground
})
const playerHouseForeground = new Image();
playerHouseForeground.src = '/pokemon-game/img/gameWorld/playerHouseForeground.png';

const playerHouseForegroundSprite = new Sprite({
    gamePosition: positions.PlayerHouseFromGhasblr,
    dimensions: {
        width: 1280,
        height: 1280
    },
    image: playerHouseForeground
 })

// Player room
const playerRoomBackground = new Image();
playerRoomBackground.src = '/pokemon-game/img/gameWorld/playerRoomBackground.png';

const playerRoomBackgroundSprite = new Sprite({
    gamePosition: positions.PlayerRoomFromPlayerHouse,
    dimensions: {
        width: 1280,
        height: 1280
    },
    image: playerRoomBackground
 })

const playerRoomForeground = new Image();
playerRoomForeground.src = '/pokemon-game/img/gameWorld/playerRoomForeground.png';

const playerRoomForegroundSprite = new Sprite({
    gamePosition: positions.PlayerRoomFromPlayerHouse,
    dimensions: {
        width: 1280,
        height: 1280
    },
    image: playerRoomForeground
 })


const gameMapsData = {
    Ghasblr: {
        isActive: false,
        symbolForCollision: 46,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.Ghasblr,
        battleZonesData: battleZonesData.Ghasblr,
        encounterRate: 0.01,
        offset: positions.GhasblrFromPlayerHouse,
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
        isActive: false,
        symbolForCollision: 860,
        widthInTiles: 20,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.PlayerHouse,
        encounterRate: 0,
        offset: positions.PlayerHouseFromGhasblr,
        doors: [playerHouseDoorExit, playerHouseStairsUp],
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
    },

    PlayerRoom: {
        isActive: true,
        symbolForCollision: 1070,
        widthInTiles: 20,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.PlayerRoom,
        encounterRate: 0,
        offset: positions.PlayerRoomFromPlayerHouse,
        doors: [playerHouseStairsDown],
        canvasMove: {
            x: 0,
            y: 0
        },
        // Need to edit
        playerPosition: {
            x: (canvasSetup.canvas.width / 2) - (192 / 8),
            y: (canvasSetup.canvas.height / 2) - (68 / 2)
        },
        backgroundSprite: playerRoomBackgroundSprite,
        foregroundSprite: playerRoomForegroundSprite,
        battleBackgroundSprite: null,
        itemsInWorld: [],
    }
}