class GameMap {
    constructor({
        isActive,
        widthInTiles = 60,
        canvas,
        collisionsData = [],
        battleZonesData = [],
        doorsData = [],
        collidingObjects = [],
        offset = {
            x: 0,
            y: 0
        },
        peopleInWorld = [],
        encounterRate = 0.01,
        playerPosition,
        backgroundSprite,
        foregroundSprite,
        battleBackgroundSprite,
        itemsInWorld,
        hiddenItemsInWorldData,
    }) {
        this.isActive = isActive;
        this.widthInTiles = widthInTiles;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.collisionsData = collisionsData;
        this.collisionsMap = [];
        this.battleZonesData = battleZonesData;
        this.doorsData = doorsData; 
        this.doorsMap = [];
        this.doors = [];

        this.battleZonesMap = [];
        this.battleZones = [];
        this.collidingObjects = collidingObjects;
        this.offset = offset;
        // Collisions
        for (let i = 0; i < this.collisionsData.length; i += this.widthInTiles) {
           this.collisionsMap.push(this.collisionsData.slice(i, i + this.widthInTiles));
        };
        this.collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol != 0) {
                    this.collidingObjects.push(
                        new Boundary({
                            gamePosition: {
                                x: j * Boundary.width + this.offset.x, 
                                y: i * Boundary.height + this.offset.y,
                            }
                        })
                    )
                }
            })
        });

        for(let i = 0; i < this.doorsData.length; i += this.widthInTiles) {
            this.doorsMap.push(this.doorsData.slice(i, i + this.widthInTiles));
        }
        this.doorsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol != 0){
                    this.doors.push(
                        new Door({
                            gamePosition: {
                                x: j * Boundary.width + this.offset.x,
                                y: i * Boundary.height + this.offset.y
                            }
                        })
                    )
                }
            })
        })

        if(this.battleZonesData.length > 0){
        // Encounter Spaces
            for (let i = 0; i < this.battleZonesData.length; i += this.widthInTiles) {
               this.battleZonesMap.push(this.battleZonesData.slice(i, i + this.widthInTiles));
            };
               //Encounter Spaces
            this.battleZonesMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if(symbol != 0){
                        this.battleZones.push(
                            new Boundary({
                                gamePosition: {
                                    x: j * Boundary.width + this.offset.x, 
                                    y: i * Boundary.height + this.offset.y,
                                }
                            })
                        )
                    } 
                })
            });
        } else {
            this.battleZones = [];
        }


        this.hiddenItemsInWorldData = hiddenItemsInWorldData;
        this.hiddenItemsInWorldMap = [];
        this.hiddenItemsInWorld = [];
        if(this.hiddenItemsInWorldData.length > 0){
            for(let i = 0; i < this.hiddenItemsInWorldData.length; i+= this.widthInTiles){
                this.hiddenItemsInWorldMap.push(this.hiddenItemsInWorldData.slice(i, i + this.widthInTiles))
            }
            this.hiddenItemsInWorldMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if(symbol != 0){
                        this.hiddenItemsInWorld.push(
                            new HiddenItem({
                                gamePosition: {
                                    x: j * Boundary.width + this.offset.x,
                                    y: i * Boundary.height + this.offset.y
                                }
                            })
                        )
                    }
                })
            })
        }
       
        
        this.encounterRate = encounterRate;
        this.playerPosition = playerPosition;

        this.backgroundSprite = backgroundSprite;
        this.foregroundSprite = foregroundSprite;
        this.battleBackgroundSprite = battleBackgroundSprite;

        this.itemsInWorld = itemsInWorld;
        this.peopleInWorld = peopleInWorld;

        this.itemsInWorld.forEach(item => {
            this.collidingObjects.push(item);
        })

        this.peopleInWorld.forEach(person => {
            this.collidingObjects.push(person);
        })

        canvasSetup.canvas.addEventListener('click', () => {
            this.itemsInWorld.forEach(item => {
                if(gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x + gameLogic.playerSpeed,
                        y: item.gamePosition.y
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x - gameLogic.playerSpeed,
                        y: item.gamePosition.y
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y + gameLogic.playerSpeed
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y - gameLogic.playerSpeed
                    }}
                })
                ){
                    dialog.clearDialog();
                    dialog.displayDialog("You found " + item.name + "!");
                    this.itemsInWorld.splice(this.itemsInWorld.indexOf(item), 1);
                    this.collidingObjects.splice(this.collidingObjects.indexOf(item), 1);
                    gameLogic.player.inventory.pickUp(item);
                }
            })
        })

        window.addEventListener('click', () => {
            if(!gameLogic.clicked) {
            audio.Map.play()
            gameLogic.clicked = true
            }
        })
    }
}