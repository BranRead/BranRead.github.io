const ghasblrBackground = new Image();
ghasblrBackground.src = './img/gameWorld/ghasblrBackground.png';
const ghasblrBackgroundSprite = new Sprite({ 
    gamePosition: positions.GhasblrFromPlayerHouse,
    dimensions: {
        width: 3840,
        height: 2560
    },
    image: ghasblrBackground,
});

const ghasblrForeground = new Image();
ghasblrForeground.src = './img/gameWorld/ghasblrForeground.png';
const ghasblrForegroundSprite = new Sprite({ 
    gamePosition: positions.GhasblrFromPlayerHouse,
    dimensions: {
        width: 3360,
        height: 1920
    },
    image: ghasblrForeground 
});

const ghasblrBattleBackground = new Image();
ghasblrBattleBackground.src = './img/gameWorld/ghasblrBattleBackground.png';
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
playerHouseBackground.src = '../img/gameWorld/playerHouseBackground.png';

const playerHouseBackgroundSprite = new Sprite({
   gamePosition: positions.PlayerHouseFromGhasblr,
   dimensions: {
        width: 1280,
        height: 1280
   },
   image: playerHouseBackground
})
const playerHouseForeground = new Image();
playerHouseForeground.src = '../img/gameWorld/playerHouseForeground.png';

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
playerRoomBackground.src = '../img/gameWorld/playerRoomBackground.png';

const playerRoomBackgroundSprite = new Sprite({
    gamePosition: positions.PlayerRoomFromPlayerHouse,
    dimensions: {
        width: 1280,
        height: 1280
    },
    image: playerRoomBackground
 })

const playerRoomForeground = new Image();
playerRoomForeground.src = '../img/gameWorld/playerRoomForeground.png';

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
        name: "Ghasblr",
        isActive: false,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.Ghasblr,
        battleZonesData: battleZonesData.Ghasblr,
        doorsData: doorsData.Ghasblr,
        hiddenItemsInWorldData: hiddenItemsData.Ghasblr,
        encounterRate: 0.01,
        offset: positions.GhasblrFromPlayerHouse,
        playerPosition:  positions.playerPosition,
        backgroundSprite: ghasblrBackgroundSprite,
        foregroundSprite: ghasblrForegroundSprite,
        battleBackgroundSprite: ghasblrBattleBackgroundSprite,
        itemsInWorld: [
            new Item (itemsGhasblr.HealthPotion)
        ],
    },
    PlayerHouse: {
        name: "PlayerHouse",
        isActive: false,
        widthInTiles: 20,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.PlayerHouse,
        doorsData: doorsData.PlayerHouse,
        hiddenItemsInWorldData: hiddenItemsData.PlayerHouse,
        peopleInWorld: [new Sprite (peopleData.Healer)],
        encounterRate: 0,
        offset: positions.PlayerHouseFromGhasblr,
        playerPosition:  positions.playerPosition,
        backgroundSprite: playerHouseBackgroundSprite,
        foregroundSprite: playerHouseForegroundSprite,
        battleBackgroundSprite: null,
        itemsInWorld: [],
    },

    PlayerRoom: {
        name: "PlayerRoom",
        isActive: true,
        widthInTiles: 20,
        canvas: canvasSetup.canvas,
        collisionsData: collisionsData.PlayerRoom,
        doorsData: doorsData.PlayerRoom,
        hiddenItemsInWorldData: hiddenItemsData.PlayerRoom,
        encounterRate: 0,
        offset: positions.PlayerRoomFromPlayerHouse,
        playerPosition: positions.playerPosition,
        backgroundSprite: playerRoomBackgroundSprite,
        foregroundSprite: playerRoomForegroundSprite,
        battleBackgroundSprite: null,
        itemsInWorld: [],
    }
}