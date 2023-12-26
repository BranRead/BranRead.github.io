const game = {
    // General game logic
    cvsTeam: document.querySelector('#spriteWindow'),
    ctxTeam: "",
    backBtn: document.getElementById("back-btn-menu"),
    itemUsed: "false",
    statsSave: [],
    clicked: false,
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
    inventoryOptions: document.querySelectorAll(".inventoryOption"),
    collidingObjects: [],
    boundaries: [],
    collisionsMap: [],
    battleZonesMap: [],
    battleZones: [],
    battle: { 
        initiated: false
    },
    playerDownImage: new Image(),
    playerUpImage: new Image(),
    playerLeftImage: new Image(),
    playerRightImage: new Image(),
    player: "",

    //Potentially move elsewhere
    //Between 0-100. Higher numbers are harder.
    // battle
    fleeChance: 50,

    
   
    
    
   
   
    
    
   
    
    
    

    /**
     * Checks for collision between two rectangles
     * @param {two different rectangle objects}  
     * @returns boolean
     */
    rectangularCollision: ({rectangle1, rectangle2}) => {
        return (
            rectangle1.gamePosition.x + rectangle1.dimensions.width >= rectangle2.gamePosition.x + game.collisionBuffer && 
            rectangle1.gamePosition.x <= rectangle2.gamePosition.x + rectangle2.dimensions.width - game.collisionBuffer && 
            rectangle1.gamePosition.y + rectangle1.dimensions.height >= rectangle2.gamePosition.y + game.collisionBuffer && 
            rectangle1.gamePosition.y <= rectangle2.gamePosition.y + rectangle2.dimensions.height - game.collisionBuffer
        )
    },
    
    animate: () => {
        game.animationID = window.requestAnimationFrame(game.animate);
        let moving = true;
    
        //Draws all objects needed at start
        game.background.draw();
        game.boundaries.forEach(boundary => {
            boundary.draw()
        });
        game.battleZones.forEach(battleZone => {
            battleZone.draw()
        });
        game.player.draw();
        // game.healer.draw();
        game.rectDoor.draw();
        game.foreground.draw();
        
        game.itemsInWorld.forEach(item => {
            item.draw();
        });
    
        game.player.animate = false;
        if (game.battle.initiated) return
    
        // Activate a battle
        if(game.keys.w.pressed || game.keys.a.pressed || game.keys.s.pressed || game.keys.d.pressed) {
            for(let i = 0; i < game.battleZones.length; i++) {
                const battleZone = game.battleZones[i];
                //gets overlapping area of player with encounter zone
                const overlappingArea = 
                    (Math.min(
                        game.player.gamePosition.x + game.player.dimensions.width, 
                        battleZone.gamePosition.x + battleZone.dimensions.width
                        ) - 
                        Math.max(game.player.gamePosition.x, battleZone.gamePosition.x)
                    ) * 
                    (Math.min(
                        game.player.gamePosition.y + game.player.dimensions.height, 
                        battleZone.gamePosition.y + battleZone.dimensions.height
                        ) - 
                        Math.max(game.player.gamePosition.y, battleZone.gamePosition.y)
                    ) ;
                if (
                    game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: battleZone
                }) && 
                overlappingArea > game.player.dimensions.width * game.player.dimensions.height / 2 
                &&
                //The actual encounter chance if on the encounter zone
                Math.random() < game.encounterRate
                )  {
                    //deactivate existing animation loop
                    window.cancelAnimationFrame(game.animationID);
                    audio.Map.stop()
                    audio.initBattle.play()
                    audio.battle.play()
                    game.battle.initiated = true
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
                                    game.battleBackground.opacity = 1
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
        if(dialog.dialogBox.style.display != "block" && !game.player.menuDisplayed){
            if(game.keys.w.pressed && game.lastKey === 'w') {
                game.player.animate = true;
                game.player.image = game.player.sprites.up;
                for(let i = 0; i < game.collidingObjects.length; i++) {
                    const collidingObject = game.collidingObjects[i];
                    if (game.rectangularCollision({
                        rectangle1: game.player, 
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
                    game.ctx.translate(0, 3);
                    game.canvasMove.y += 3;
                    game.player.gamePosition.y -= 3;
                }
            } else if(game.keys.a.pressed && game.lastKey === 'a') {
                game.player.animate = true;
                game.player.image = game.player.sprites.left;
                for(let i = 0; i < game.collidingObjects.length; i++) {
                    const collidingObject = game.collidingObjects[i];
                    if (game.rectangularCollision({
                        rectangle1: game.player, 
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
                    game.ctx.translate(3, 0);
                    game.canvasMove.x += 3;
                    game.player.gamePosition.x -= 3;
                }
            } else if(game.keys.s.pressed && game.lastKey === 's') {
                game.player.animate = true;
                game.player.image = game.player.sprites.down;
                for(let i = 0; i < game.collidingObjects.length; i++) {
                    const collidingObject = game.collidingObjects[i];
                    if (game.rectangularCollision({
                        rectangle1: game.player, 
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
                    game.ctx.translate(0, -3);
                    game.canvasMove.y -= 3;
                    game.player.gamePosition.y += 3;
                }
            } else if(game.keys.d.pressed && game.lastKey === 'd') {
                game.player.animate = true;
                game.player.image = game.player.sprites.right;
                for(let i = 0; i < game.collidingObjects.length; i++) {
                    const collidingObject = game.collidingObjects[i];
                    if (game.rectangularCollision({
                        rectangle1: game.player, 
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
                    game.ctx.translate(-3, 0);
                    game.canvasMove.x -= 3;
                    game.player.gamePosition.x += 3;
                }
            }
        } // End of moving if/else statement
    }, //end of animate function

    /*Save this for after everything else is done*/
    // save: () => {
    //     game.player.team.roster.forEach(monster => {
    //         let statsObject = {
    //             name: monster.name,
    //             isEnemy: monster.isEnemy,
    //             stats: monster.stats,
    //             attacks: monster.attacks
    //         }

    //         game.statsSave.push(statsObject);
    //     })
    //     const saveState = {
    //         canvasPosition: game.canvasMove,
    //         playerPosition: game.player.gamePosition,
    //         team: {
    //             stats: game.statsSave,
    //             size: game.player.team.maxSize
    //         },
    //         inventory: game.player.inventory
    //     }
    //     localStorage.setItem("monsterGame", JSON.stringify(saveState));
    //     console.log("Saved");
    // },

    quit: () => {
        //Dialog
        menu.close();
        dialogBackground.style.display = "flex";
        dialogBox.style.display = "block";
        dialogBox.innerHTML = "Are you sure you'd like to quit? Unsaved changes will be lost.";
        
        const yesBtn = document.createElement("button");
        yesBtn.className = "yesBtn";
        yesBtn.innerHTML = "Yes";
        yesBtn.addEventListener("click", () => {
            window.location.href = "/projects.html";
        })

        const noBtn = document.createElement("button");
        noBtn.className = "noBtn";
        noBtn.innerHTML = "No";
        noBtn.addEventListener("click", () => {
            dialogBackground.style.display = "none";
        })
        
        dialogBox.append(yesBtn);
        dialogBox.append(noBtn);
    }
}
// game.init();
// game.animate();