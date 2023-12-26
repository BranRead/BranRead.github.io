const ghasblrIsland = {
    cvs: document.querySelector('#gameCamera'),
    ctx: "",
    collidingObjects: [],
    boundaries: [],
    collisionsMap: [],
    battleZonesMap: [],
    battleZones: [],
    animateSprite: false,
    lastKey: "",
    animationID: 0,
    encounterRate: 0.01,
    offset: {
        x: -1952,
        y: -818
    },
    canvasMove: {
        x: 0,
        y: 0
    },
    rectDoor: new Boundary({
        gamePosition: {
            x: 480,
            y: 85
        }
    }),
    backgroundImage: new Image(),
    background: "",
    battleBackgroundImage: new Image(),
    battleBackground: "",
    foregroundImage: new Image(),
    foreground: "",
    itemsInWorld: [],
    playerPosition: {},

    init: () => {
        ghasblrIsland.ctx = ghasblrIsland.cvs.getContext('2d');
        ghasblrIsland.cvs.width = 1024;
        ghasblrIsland.cvs.height = 576;

        // Battle background for area
        ghasblrIsland.battleBackgroundImage.src = "/pokemon-game/img/gameWorld/battleBackground.png";
        ghasblrIsland.battleBackground = new Sprite({
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
            image: ghasblrIsland.battleBackgroundImage,
            opacity: 0
        });
    
        // Foreground image for area
        ghasblrIsland.foregroundImage.src = '/pokemon-game/img/gameWorld/ghasblrForeground.png';
        ghasblrIsland.foreground = new Sprite({ 
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: ghasblrIsland.offset.x,
                y: ghasblrIsland.offset.y
            },
            dimensions: {
                width: 3360,
                height: 1920
            },
            image: ghasblrIsland.foregroundImage 
        });
        
        // Background(map) image for area
        ghasblrIsland.backgroundImage.src = '/pokemon-game/img/gameWorld/ghasblr.png';
        ghasblrIsland.background = new Sprite({ 
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: ghasblrIsland.offset.x,
                y: ghasblrIsland.offset.y
            },
            dimensions: {
                width: 3840,
                height: 2560
            },
            image: ghasblrIsland.backgroundImage,
        });

        // Collisions
        for (let i = 0; i < collisions.length; i += 60) {
            ghasblrIsland.collisionsMap.push(collisions.slice(i, i + 60));
        };
        ghasblrIsland.collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol === 46)
                ghasblrIsland.boundaries.push(
                    new Boundary({
                        gamePosition: {
                            x: j * Boundary.width + game.offset.x, 
                            y: i * Boundary.height + game.offset.y,
                        }
                    })
                )
            })
        });

        // Adding to colliding objects
        ghasblrIsland.boundaries.forEach(boundary => {
            ghasblrIsland.collidingObjects.push(boundary);
        })

        // Encounter Spaces
        for (let i = 0; i < battleZonesData.length; i += 60) {
            ghasblrIsland.battleZonesMap.push(battleZonesData.slice(i, i + 60));
        };
        //Encounter Spaces
        ghasblrIsland.battleZonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol === 46)
                ghasblrIsland.battleZones.push(
                    new Boundary({
                        gamePosition: {
                            x: j * Boundary.width + ghasblrIsland.offset.x, 
                            y: i * Boundary.height + ghasblrIsland.offset.y,
                        }
                    })
                )
            })
        });
        
        ghasblrIsland.playerPosition.x = (ghasblrIsland.cvs.width / 2) - (192 / 8);
        ghasblrIsland.playerPosition.y = (ghasblrIsland.cvs.height / 2) - (68 / 2);
            
        ghasblrIsland.itemsInWorld = [
            new Item (itemsGhasblr.AtkBoost),
            new Item (itemsGhasblr.DefBoost),
            new Item (itemsGhasblr.HealthPotion)
        ];

        ghasblrIsland.itemsInWorld.forEach(item => {
            ghasblrIsland.collidingObjects.push(item);
        })

        // ghasblrIsland.cvs.addEventListener('click', () => {
        //     if(gameLogic.rectangularCollision({
        //         rectangle1: gameLogic.player, 
        //         rectangle2: ghasblrIsland.rectDoor
        //     })){
        //         window.cancelAnimationFrame(ghasblrIsland.animationID);
        //             audio.Map.stop()
        //             //Flashes the black div 
        //             gsap.to('#overlappingDiv', {
        //                 opacity: 1,
        //                 repeat: 3,
        //                 yoyo: true,
        //                 duration: 0.4,
        //                 onComplete() {
        //                     gsap.to('#overlappingDiv', {
        //                         opacity: 1,
        //                         duration: 0.4, 
        //                         onComplete() {
        //                             //activate a new animation loop
        //                             ghasblrIsland.ctx.save();
        //                             ghasblrIsland.ctx.setTransform(1, 0, 0, 1, 0, 0);
        //                             ghasblrIsland.ctx.clearRect(0, 0, game.cvs.width, game.cvs.height);
        //                             playerHouse.init();
        //                             playerHouse.animate();
        //                             //Also that black div is set to invisible
        //                             game.battleBackground.opacity = 1
        //                             gsap.to('#overlappingDiv', {
        //                                 opacity: 0,
        //                                 duration: 0.4,
        //                             })
        //                         }
        //                     })       
        //                 }
        //             })
        //     }
        // })

        // Event listener for items
        ghasblrIsland.cvs.addEventListener('click', () => {
            ghasblrIsland.itemsInWorld.forEach(item => {
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
                    ghasblrIsland.itemsInWorld.splice(ghasblrIsland.itemsInWorld.indexOf(item), 1);
                    ghasblrIsland.collidingObjects.splice(ghasblrIsland.collidingObjects.indexOf(item), 1);
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
    },

    animate: () => {
        ghasblrIsland.animationID = window.requestAnimationFrame(ghasblrIsland.animate);
        let moving = true;
    
        //Draws all objects needed at start
        ghasblrIsland.background.draw();
        ghasblrIsland.boundaries.forEach(boundary => {
            boundary.draw(ghasblrIsland.ctx);
        });
        ghasblrIsland.battleZones.forEach(battleZone => {
            battleZone.draw()
        });
        gameLogic.player.draw();
        ghasblrIsland.rectDoor.draw();
        ghasblrIsland.foreground.draw();
        game.itemsInWorld.forEach(item => {
            item.draw();
        });
    
        gameLogic.player.animate = false;
        if (gameLogic.isBattleInitiated) return
    
        // Activate a battle
        if(gameLogic.keys.w.pressed || gameLogic.keys.a.pressed || gameLogic.keys.s.pressed || gameLogic.keys.d.pressed) {
            for(let i = 0; i < ghasblrIsland.battleZones.length; i++) {
                const battleZone = ghasblrIsland.battleZones[i];
                //gets overlapping area of player with encounter zone
                const overlappingArea = 
                        (Math.min(
                            gameLogic.player.gamePosition.x + gameLogic.player.dimensions.width, 
                            battleZone.gamePosition.x + battleZone.dimensions.width
                            ) - 
                            Math.max(gameLogic.player.gamePosition.x, battleZone.gamePosition.x)
                        ) * 
                        (Math.min(
                            gameLogic.player.gamePosition.y + gameLogic.player.dimensions.height, 
                            battleZone.gamePosition.y + battleZone.dimensions.height
                            ) - 
                            Math.max(gameLogic.player.gamePosition.y, battleZone.gamePosition.y)
                        ) ;
                if (gameLogic.rectangularCollision({rectangle1: gameLogic.player, rectangle2: battleZone}) && 
                        overlappingArea > gameLogic.player.dimensions.width * gameLogic.player.dimensions.height / 2 &&
                        //The actual encounter chance if on the encounter zone
                        Math.random() < ghasblrIsland.encounterRate)  {
                    //deactivate existing animation loop
                    window.cancelAnimationFrame(ghasblrIsland.animationID);
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
                                    ghasblrIsland.battleBackground.opacity = 1
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
    
        //Movement for player, checking for collisions with either walls or NPC's
        //Maybe set NPC's as an array and a seperate function to be added here?
        if(dialog.dialogBox.style.display != "block" && !gameLogic.player.menuDisplayed){
            if(game.keys.w.pressed && game.lastKey === 'w') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.up;
                for(let i = 0; i < ghasblrIsland.collidingObjects.length; i++) {
                    const collidingObject = ghasblrIsland.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x,
                            y: collidingObject.gamePosition.y + 3
                        }}
                    }))  {
                        if(!debug.noClip){
                            moving = false;
                            break;
                        }
                    };
                };
                if(moving) {
                    ghasblrIsland.ctx.translate(0, 3);
                    ghasblrIsland.canvasMove.y += 3;
                    gameLogic.player.gamePosition.y -= 3;
                }
            } else if(gameLogic.keys.a.pressed && gameLogic.lastKey === 'a') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.left;
                for(let i = 0; i < ghasblrIsland.collidingObjects.length; i++) {
                    const collidingObject = ghasblrIsland.collidingObjects[i];
                    if (game.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x + 3,
                            y: collidingObject.gamePosition.y  
                        }}
                    }))  {
                        if(!debug.noClip){
                            moving = false;
                            break;
                        }
                    };
                };
                if(moving) {
                    ghasblrIsland.ctx.translate(3, 0);
                    ghasblrIsland.canvasMove.x += 3;
                    gameLogic.player.gamePosition.x -= 3;
                }
            } else if(gameLogic.keys.s.pressed && gameLogic.lastKey === 's') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.down;
                for(let i = 0; i < ghasblrIsland.collidingObjects.length; i++) {
                    const collidingObject = game.collidingObjects[i];
                    if (ghasblrIsland.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x,
                            y: collidingObject.gamePosition.y - 3
                        }}
                    }) )  {
                        if(!debug.noClip){
                            moving = false;
                            break;
                        }
                    };
                }
                if(moving) {
                    ghasblrIsland.ctx.translate(0, -3);
                    ghasblrIsland.canvasMove.y -= 3;
                    gameLogic.player.gamePosition.y += 3;
                }
            } else if(gameLogic.keys.d.pressed && gameLogic.lastKey === 'd') {
                gameLogic.player.animate = true;
                gameLogic.player.image = gameLogic.player.sprites.right;
                for(let i = 0; i < ghasblrIsland.collidingObjects.length; i++) {
                    const collidingObject = ghasblrIsland.collidingObjects[i];
                    if (gameLogic.rectangularCollision({
                        rectangle1: gameLogic.player, 
                        rectangle2: {...collidingObject, gamePosition: {
                            x: collidingObject.gamePosition.x - 3,
                            y: collidingObject.gamePosition.y
                        }}
                    })) {
                        if(!debug.noClip){
                            moving = false;
                            break;
                        }
                    };
                }
                if(moving) {
                    ghasblrIsland.ctx.translate(-3, 0);
                    ghasblrIsland.canvasMove.x -= 3;
                    gameLogic.player.gamePosition.x += 3;
                }
            }
        } // End of moving if/else statement
    }, //end of animate function
}