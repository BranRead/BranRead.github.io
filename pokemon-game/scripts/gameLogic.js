const gameLogic = {
    itemUsed: "false",
    playerSpeed: 2,
    moving: true,
    teamStatsSave: [],
    inventoryStatsSave: [],
    mapStatsSave: [],
    clicked: false,
    previousTime: 0,
    currentTime: 0,
    deltaTime: 0,
    numOfWaterFrames: 4,
    currentWaterFrame: 0,
    elapsedWaterFrames: 0,
    speedOfWaterWaves: 100,

    canvasMove: {
        x: 0,
        y: 0
    },
    keys: {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        s: {
            pressed: false
        },
        d: {
            pressed: false
        }
    },
    collisionBuffer : 6,
    battle: { 
        initiated: false
    },
   
    playerDownImage: new Image(),
    playerUpImage: new Image(),
    playerLeftImage: new Image(),
    playerRightImage: new Image(),
    player: "",
    team: "",
    inventory: "",
    maps: [],
    animationID: 0,
    gameMap: "",
    usingItem: false,
    menuDisplayed: false,
    isInventoryWindowOpen: false,
    intervalAnimate: "",

    // I think this is for the menu animated sprite
    isTeamSpriteVisible: false, 
    

    //Potentially move elsewhere
    //Between 0-100. Higher numbers are harder.
    // battle
    fleeChance: 50,
    
    backBtn: document.getElementById("back-btn-menu"),
    inventoryOptions: document.querySelectorAll(".inventoryOption"),
    isBattleInitiated: false,

    init: () => {
        setInterval(() => {
                    if(dialog.nextBtn.textContent == "▼"){
                        dialog.nextBtn.textContent = "▽";
                    } else {
                        dialog.nextBtn.textContent = "▼";
                    }
                }, 300)

    
        gameLogic.maps.push(new GameMap(gameMapsData.Ghasblr));
        gameLogic.maps.push(new GameMap(gameMapsData.PlayerHouse));
        if(localStorage.getItem("monsterGame") === null){
            gameMapsData.PlayerRoom.offset = positions.GameStart;
            playerRoomBackgroundSprite.gamePosition = positions.GameStart;
            playerRoomForegroundSprite.gamePosition = positions.GameStart;
            gameLogic.maps.push(new GameMap(gameMapsData.PlayerRoom));
        } else {
            gameLogic.maps.push(new GameMap(gameMapsData.PlayerRoom));
        }
        

       
        gameLogic.maps.forEach(map => {
            if(map.hiddenItemsInWorld.length > 0){
                map.hiddenItemsInWorld.forEach((item, i) => {
                    let name = "pickupItem" + i + map.name; 
                    canvasSetup.canvas.addEventListener("click", name = function(e) {
                        if(item.pickupFunction()){
                            console.log(e.target)
                            e.target.removeEventListener("click", name);
                        }
                    })
                })
            }
        })

        additionalGameFunctions.addHiddenItems();
        additionalGameFunctions.addDoorFunctions();
        additionalGameFunctions.peopleFunctions();
        
        gameLogic.team = new Team([], 4);
        gameLogic.inventory =  new Inventory([], 10);

        
        //  Save Game management, load unless save doesn't exist
        if(localStorage.getItem("monsterGame") === null){
            console.log("No saved game found, starting new game.");
            gameLogic.team.roster.push(new Monster(monsters.Emby));
            gameLogic.team.roster[0].frontImage = false;
            gameLogic.team.roster[0].backImage = true;
            gameLogic.team.roster[0].gamePosition = {
                x: 280,
                y: 325
            };
            gameLogic.maps[2].offset = positions.GameStart;
            gameLogic.maps[2].backgroundSprite.gamePosition = positions.GameStart;
            gameLogic.maps[2].foregroundSprite.gamePosition = positions.GameStart;
        } else {
            let save = JSON.parse(localStorage.getItem("monsterGame"));
            console.log("Loaded");
            
            gameLogic.canvasMove.x = save.canvasPosition.x;
            gameLogic.canvasMove.y = save.canvasPosition.y;
            let indexOfMap = 0;
            gameLogic.maps.forEach((map, index) => {
                if(map.name == save.activeMap){
                    map.isActive = true;
                    indexOfMap = index;
                    gameLogic.gameMap = map;
                } else {
                    map.isActive = false;
                }
            })
            gameLogic.gameMap.context.translate(-gameLogic.canvasMove.x, -gameLogic.canvasMove.y);
            positions.playerPosition.x += gameLogic.canvasMove.x;
            positions.playerPosition.y += gameLogic.canvasMove.y;
            gameLogic.maps[indexOfMap].playerPosition = positions.playerPosition;
            
            save.team.stats.forEach((monster, index) => {
                let name = monster.name.replace(/\s/g, '');
                gameLogic.team.roster.push(new Monster(monsters[name]));
                gameLogic.team.roster[index].stats = monster.stats;
                gameLogic.team.roster[index].attacks = monster.attacks;
                gameLogic.team.roster[index].isEnemy = false;
                gameLogic.team.roster[index].position = {
                    x: 280,
                    y: 325
                };
            })

            save.inventory.forEach(item => {
                let name = item.name.replace(/\s/g, '');
                let savedItem = new Item(itemsGhasblr[name])
                savedItem.quantity = item.quantity
                gameLogic.inventory.items.push(savedItem);
            }) 
        }

        gameLogic.playerUpImage.src = './img/people/playerUp.png';
        gameLogic.playerRightImage.src = './img/people/playerRight.png';
        gameLogic.playerDownImage.src = './img/people/playerDown.png';
        gameLogic.playerLeftImage.src = './img/people/playerLeft.png';

        gameLogic.player = new Person({
            name: "Brandon",
            team: gameLogic.team,
            inventory: gameLogic.inventory,
            spritePosition: {
                x: 0,
                y: 0
            },
            dimensions: {
                width: 48,
                height: 68
            },
            image: gameLogic.playerDownImage,
            frames: {
                max: 4,
                hold: 20
            },
            sprites: {
                up:  gameLogic.playerUpImage,
                left:  gameLogic.playerLeftImage,
                right:  gameLogic.playerRightImage,
                down:  gameLogic.playerDownImage,
            
            },
            monsterFriend: 15,
        });

        dialog.nextBtn.addEventListener('click', () => {
            dialog.progressTurn();
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                //Lower case keys for movement
                case 'w':
                    gameLogic.keys.w.pressed = true;
                    gameLogic.lastKey = "w"
                    break;
                case 'a':
                    gameLogic.keys.a.pressed = true;
                    gameLogic.lastKey = "a"
                    break;
                case 's':
                    gameLogic.keys.s.pressed = true;
                    gameLogic.lastKey = "s"
                    break;
                case 'd':
                    gameLogic.keys.d.pressed = true;
                    gameLogic.lastKey = "d"
                    break;
                //Lower case keys for actions
                case 'i':
                    if(gameLogic.menuDisplayed) {
                        menu.close();
                    } else {
                        menu.open();
                    }
                    break;
                case 'Escape':
                    if(gameLogic.menuDisplayed) {
                        menu.close();
                    } else {
                        menu.open();
                    }
                    break;
                //Upper case keys for movement
                case 'W':
                    gameLogic.keys.w.pressed = true;
                    gameLogic.lastKey = "w"
                    break;
                case 'A':
                    gameLogic.keys.a.pressed = true;
                    gameLogic.lastKey = "a"
                    break;
                case 'S':
                    gameLogic.keys.s.pressed = true;
                    gameLogic.lastKey = "s"
                    break;
                case 'D':
                    gameLogic.keys.d.pressed = true;
                    gameLogic.lastKey = "d"
                    break;
                //Upper case keys for actions
                case 'I':
                    if(gameLogic.menuDisplayed) {
                        menu.close();
                    } else {
                        menu.open();
                    }
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                //Lower and then upper case
                case 'w':
                    gameLogic.keys.w.pressed = false;
                    break;

                case 'a':
                    gameLogic.keys.a.pressed = false;
                    break;

                case 's':
                    gameLogic.keys.s.pressed = false;
                    break;

                case 'd':
                    gameLogic.keys.d.pressed = false;
                    break;

                case 'W':
                    gameLogic.keys.w.pressed = false;
                    break;

                case 'A':
                    gameLogic.keys.a.pressed = false;
                    break;

                case 'S':
                    gameLogic.keys.s.pressed = false;
                    break;

                case 'D':
                    gameLogic.keys.d.pressed = false;
                    break;
            }
        });


        // Maybe add elsewhere
        document.querySelectorAll(".menu-item").forEach(item => {
            item.addEventListener('click', () => {
                let selection = item.firstChild.textContent
                switch (selection) {
                    case "Team":
                        gameLogic.player.team.viewTeam();
                        break;
                    case "Inventory":
                        gameLogic.player.inventory.openInventory();
                        break;
                    case "Settings":
                        settings.open();
                        break;
                    case "Save":
                        save.save();
                        break;
                    case "Quit":
                        gameLogic.quit();
                        break;
                    default:
                        console.log("Error clicking menu");
                        break;
                }
            })
        })
       
        gameLogic.inventoryOptions.forEach((option) =>{
            option.addEventListener("click", (e) => {
                document.querySelectorAll(".inventoryItem").forEach((item) => {
                    item.remove();
                })
                inventoryMenu.display(e.currentTarget.dataset.value);
            })
        });

        
    },
   
    /**
     * Checks for collision between two rectangles
     * @param {two different rectangle objects}  
     * @returns boolean
     */
    rectangularCollision: ({rectangle1, rectangle2}) => {
        return (
            rectangle1.gamePosition.x + rectangle1.dimensions.width >= rectangle2.gamePosition.x +  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.x <= rectangle2.gamePosition.x + rectangle2.dimensions.width -  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.y + rectangle1.dimensions.height >= rectangle2.gamePosition.y +  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.y <= rectangle2.gamePosition.y + rectangle2.dimensions.height -  gameLogic.collisionBuffer
        )

        
    },

    animate: () => {
        gameLogic.animationID = window.requestAnimationFrame(gameLogic.animate);
        gameLogic.previousTime =  gameLogic.currentTime;
        gameLogic.currentTime = performance.now();
        gameLogic.deltaTime =  gameLogic.currentTime -  gameLogic.previousTime; 
        gameLogic.deltaTime /= 10;
        gameLogic.maps.forEach((map, index) => {
            if(map.isActive){
                gameLogic.gameMap = gameLogic.maps[index];
                if(index === 0){
                    gameLogic.elapsedWaterFrames += gameLogic.deltaTime;
                   
                    if(gameLogic.elapsedWaterFrames > gameLogic.speedOfWaterWaves) {
                        if(gameLogic.currentWaterFrame < gameLogic.numOfWaterFrames - 1) {
                            gameLogic.currentWaterFrame++;
                            gameLogic.elapsedWaterFrames = 0;
                        }
                        else {
                            gameLogic.currentWaterFrame = 0;
                            gameLogic.elapsedWaterFrames = 0;
                        }
                    }
                    
                    switch(gameLogic.currentWaterFrame){
                        case 0: 
                            map.backgroundSprite.image = map.backgroundSprite.sprites.first;
                            break;
                        case 1:
                            map.backgroundSprite.image = map.backgroundSprite.sprites.second;
                            break;
                        case 2:
                            map.backgroundSprite.image = map.backgroundSprite.sprites.third;
                            break;
                        case 3:
                            map.backgroundSprite.image = map.backgroundSprite.sprites.second;
                            break;
                        default: 
                            map.backgroundSprite.image = map.backgroundSprite.sprites.first;
                            break;
                    }
                }
                
                map.backgroundSprite.draw(map.context);
                map.collidingObjects.forEach(boundary => {
                    boundary.draw(map.context);
                });
                map.battleZones.forEach(battleZone => {
                    battleZone.draw(map.context)
                });
                map.doors.forEach(door => {
                    door.draw(map.context)
                })
                gameLogic.player.draw(map.context, map.playerPosition);
                gameLogic.player.gamePosition = map.playerPosition;
                map.foregroundSprite.draw(map.context);
                map.itemsInWorld.forEach(item => {
                    item.draw(map.context);
                });
                map.hiddenItemsInWorld.forEach(item => {
                    item.draw(map.context);
                })
            }
        })
        gameLogic.player.animate = false;
        if (gameLogic.isBattleInitiated) return
    
        if(gameLogic.gameMap.encounterRate > 0){
            // Activate a battle
            if(gameLogic.keys.w.pressed || gameLogic.keys.a.pressed || gameLogic.keys.s.pressed || gameLogic.keys.d.pressed) {
                for(let i = 0; i < gameLogic.gameMap.battleZones.length; i++) {
                    const battleZone = gameLogic.gameMap.battleZones[i];
                    //gets overlapping area of player with encounter zone
                    const overlappingArea = 
                            (Math.min(
                                gameLogic.gameMap.playerPosition.x + gameLogic.player.dimensions.width, 
                                battleZone.gamePosition.x + battleZone.dimensions.width
                                ) - 
                                Math.max(gameLogic.gameMap.playerPosition.x, battleZone.gamePosition.x)
                            ) * 
                            (Math.min(
                                gameLogic.gameMap.playerPosition.y + gameLogic.player.dimensions.height, 
                                battleZone.gamePosition.y + battleZone.dimensions.height
                                ) - 
                                Math.max(gameLogic.gameMap.playerPosition.y, battleZone.gamePosition.y)
                            ) ;
                    if (gameLogic.rectangularCollision({rectangle1: gameLogic.player, rectangle2: battleZone}) && 
                            overlappingArea > gameLogic.player.dimensions.width * gameLogic.player.dimensions.height / 2 &&
                            //The actual encounter chance if on the encounter zone
                            Math.random() < gameLogic.gameMap.encounterRate)  {
                        //deactivate existing animation loop
                        window.cancelAnimationFrame(this.animationID);
                        audio.Map.stop()
                        audio.initBattle.play()
                        audio.battle.play()
                        gameLogic.isBattleInitiated = true
                        //Flashes the black div 
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.4,
                            onComplete() {
                                gsap.to('#overlappingDiv', {
                                    opacity: 1,
                                    duration: 0.4, 
                                    onComplete() {
                                        //activate a new animation loop
                                        battleSetup.initBattle();
                                        battleFunctions.animateBattle();
                                        //The battle background is a sprite and set to full visibility here
                                        //Also that black div is set to invisible
                                        gameLogic.gameMap.battleBackgroundSprite.opacity = 1
                                        gsap.to('#overlappingDiv', {
                                            opacity: 0,
                                            duration: 0.4,
                                        })
                                    }
                                })       
                            }
                        })
                        break;
                    };
                };
            };
        }
        
    
        //Movement for player, checking for collisions with either walls or NPC's
        //Maybe set NPC's as an array and a seperate function to be added here?
        if(dialog.dialogBox.style.display != "block" && !gameLogic.player.menuDisplayed){
            if(gameLogic.keys.w.pressed && gameLogic.lastKey === 'w') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.up;
                for(let i = 0; i < gameLogic.gameMap.collidingObjects.length; i++) {
                    const collidingObject = gameLogic.gameMap.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x,
                            y: collidingObject.gamePosition.y + gameLogic.playerSpeed
                        }}
                    }))  {
                        if(!debug.noClip){
                            gameLogic.moving = false;
                            break;
                        }
                    } else {
                        gameLogic.moving = true;
                    };
                };
                for(let i = 0; i < gameLogic.gameMap.doors.length; i++) {
                    const door = gameLogic.gameMap.doors[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...door, gamePosition: {
                            x: door.gamePosition.x,
                            y: door.gamePosition.y + gameLogic.playerSpeed
                        }}
                    }))  {
                        gameLogic.moving = false;
                        door.enterFunction();
                        break;
                    };
                };

                if(gameLogic.moving) {
                    console.log(gameLogic.playerSpeed)
                    gameLogic.gameMap.context.translate(0, gameLogic.deltaTime * gameLogic.playerSpeed);
                    gameLogic.canvasMove.y -=  gameLogic.deltaTime * gameLogic.playerSpeed;
                    gameLogic.gameMap.playerPosition.y -=  gameLogic.deltaTime * gameLogic.playerSpeed;
                }
            } else if(gameLogic.keys.a.pressed && gameLogic.lastKey === 'a') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.left;
                for(let i = 0; i < gameLogic.gameMap.collidingObjects.length; i++) {
                    const collidingObject = gameLogic.gameMap.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x + gameLogic.playerSpeed,
                            y: collidingObject.gamePosition.y  
                        }}
                    }))  {
                        if(!debug.noClip){
                            gameLogic.moving = false;
                            break;
                        }
                    } else {
                        gameLogic.moving = true;
                    };
                };
                for(let i = 0; i < gameLogic.gameMap.doors.length; i++) {
                    const door = gameLogic.gameMap.doors[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...door, gamePosition: {
                            x: door.gamePosition.x + gameLogic.playerSpeed,
                            y: door.gamePosition.y 
                        }}
                    }))  {
                        gameLogic.moving = false;
                        door.enterFunction();
                        break;
                    };
                };
                if(gameLogic.moving) {
                    gameLogic.gameMap.context.translate( gameLogic.deltaTime * gameLogic.playerSpeed, 0);
                    gameLogic.canvasMove.x -=  gameLogic.deltaTime * gameLogic.playerSpeed;
                    gameLogic.gameMap.playerPosition.x -=  gameLogic.deltaTime * gameLogic.playerSpeed;
                }
            } else if(gameLogic.keys.s.pressed && gameLogic.lastKey === 's') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.down;
                for(let i = 0; i < gameLogic.gameMap.collidingObjects.length; i++) {
                    const collidingObject = gameLogic.gameMap.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x,
                            y: collidingObject.gamePosition.y - gameLogic.playerSpeed
                        }}
                    }) )  {
                        if(!debug.noClip){
                            gameLogic.moving = false;
                            break;
                        }
                    } else {
                        gameLogic.moving = true;
                    };
                }
                for(let i = 0; i < gameLogic.gameMap.doors.length; i++) {
                    const door = gameLogic.gameMap.doors[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...door, gamePosition: {
                            x: door.gamePosition.x,
                            y: door.gamePosition.y - gameLogic.playerSpeed
                        }}
                    }))  {
                        gameLogic.moving = false;
                        door.enterFunction();
                        break;
                    };
                };
                if(gameLogic.moving) {
                    gameLogic.gameMap.context.translate(0,  gameLogic.deltaTime * -gameLogic.playerSpeed);
                    gameLogic.canvasMove.y +=  gameLogic.deltaTime * gameLogic.playerSpeed;
                    gameLogic.gameMap.playerPosition.y +=  gameLogic.deltaTime * gameLogic.playerSpeed;
                }
            } else if(gameLogic.keys.d.pressed && gameLogic.lastKey === 'd') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.right;
                for(let i = 0; i < gameLogic.gameMap.collidingObjects.length; i++) {
                    const collidingObject = gameLogic.gameMap.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x - gameLogic.playerSpeed,
                            y: collidingObject.gamePosition.y
                        }}
                    })) {
                        if(!debug.noClip){
                            gameLogic.moving = false;
                            break;
                        }
                    } else {
                        gameLogic.moving = true;
                    };
                }
                for(let i = 0; i < gameLogic.gameMap.doors.length; i++) {
                    const door = gameLogic.gameMap.doors[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...door, gamePosition: {
                            x: door.gamePosition.x - gameLogic.playerSpeed,
                            y: door.gamePosition.y
                        }}
                    }))  {
                        gameLogic.moving = false;
                        door.enterFunction();
                        break;
                    };
                };
                if(gameLogic.moving) {
                    gameLogic.gameMap.context.translate( gameLogic.deltaTime * -gameLogic.playerSpeed, 0);
                    gameLogic.canvasMove.x +=  gameLogic.deltaTime * gameLogic.playerSpeed;
                    gameLogic.gameMap.playerPosition.x +=  gameLogic.deltaTime * gameLogic.playerSpeed;
                }
            }
        } // End of moving if/else statement
    }, //end of animate function

    quit: () => {
        //Dialog
        menu.close();
        dialog.displayDialog("Are you sure you'd like to quit? Unsaved changes will be lost.")
    
        document.querySelector(".nextBtn").style.display = "none";
        const yesBtn = document.createElement("button");
        yesBtn.classList.add("yesBtn", "standardBtn", "dialogBtn");
        yesBtn.textContent = "Yes";
        yesBtn.addEventListener("click", () => {
            window.location.href = "/projects.html";
        })

        const noBtn = document.createElement("button");
        noBtn.classList.add("noBtn", "standardBtn", "dialogBtn");
        noBtn.textContent = "No";
        noBtn.addEventListener("click", () => {
            dialog.progressTurn();
        })
        
        dialogBox.append(yesBtn);
        dialogBox.append(noBtn);
    }
}
gameLogic.init();
gameLogic.animate();