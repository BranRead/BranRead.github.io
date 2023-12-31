class GameMap {
    constructor({
        isActive,
        symbolForCollision,
        widthInTiles = 60,
        canvas,
        collisionsData = [],
        battleZonesData = [],
        collidingObjects = [],
        offset = {
            x: 0,
            y: 0
        },
        peopleInWorld = [],
        doors = [],
        encounterRate = 0.01,
        
        canvasMove = {
            x: 0,
            y: 0
        },
        playerPosition,
        backgroundSprite,
        foregroundSprite,
        battleBackgroundSprite,
        itemsInWorld
    }) {
        this.isActive = isActive;
        this.symbolForCollision = symbolForCollision;
        this.widthInTiles = widthInTiles;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.collisionsData = collisionsData;
        this.collisionsMap = [];
        this.battleZonesData = battleZonesData;
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
                if(symbol == this.symbolForCollision)
                this.collidingObjects.push(
                    new Boundary({
                        gamePosition: {
                            x: j * Boundary.width + this.offset.x, 
                            y: i * Boundary.height + this.offset.y,
                        }
                    })
                )
            })
        });

        if(this.battleZonesData.length > 0){
        // Encounter Spaces
            for (let i = 0; i < this.battleZonesData.length; i += this.widthInTiles) {
               this.battleZonesMap.push(this.battleZonesData.slice(i, i + this.widthInTiles));
            };
               //Encounter Spaces
            this.battleZonesMap.forEach((row, i) => {
                row.forEach((symbol, j) => {
                    if(symbol == this.symbolForCollision)
                    this.battleZones.push(
                        new Boundary({
                            gamePosition: {
                                x: j * Boundary.width + this.offset.x, 
                                y: i * Boundary.height + this.offset.y,
                            }
                        })
                    )
                })
            });
        } else {
            this.battleZones = [];
        }
       
        this.doors = doors; 
        this.encounterRate = encounterRate;
       
        this.canvasMove = canvasMove;
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

      
        this.canvas.addEventListener('click', () => {
            this.doors.forEach(door => {
                if(gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player,
                    rectangle2:  {...door, gamePosition: {
                        x: door.gamePosition.x,
                        y: door.gamePosition.y + 3
                    }}
                })
                    ){
                    door.enterFunction();
                }
            })
            
        });

        this.canvas.addEventListener('click', () => {
            this.itemsInWorld.forEach(item => {
                if(gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x + 3,
                        y: item.gamePosition.y
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x - 3,
                        y: item.gamePosition.y
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y + 3
                    }}
                }) || gameLogic.rectangularCollision({
                    rectangle1: gameLogic.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y - 3
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