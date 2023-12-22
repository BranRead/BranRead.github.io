const game = {
    cvs: document.querySelector('#gameCamera'),
    cvsTeam: document.querySelector('#spriteWindow'),
    ctx: "",
    ctxTeam: "",
    backBtn: document.getElementById("back-btn-menu"),
    
    itemUsed: "false",
    statsSave: [],
    //Between 0-100. Higher numbers are harder.
    fleeChance: 50,
    clicked: false,
    animateSprite: false,
    lastKey: "",
    encounterRate: 0.01,
    animationID: 0,
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
    offset: {
        x: -832,
        y: -230
    },
    canvasMove: {
        x: 0,
        y: 0
    },
    inventoryOptions: document.querySelectorAll(".inventoryOption"),
    collidingObjects: [],
    boundaries: [],
    collisionsMap: [],
    battleZonesMap: [],
    battleZones: [],
    battle: { 
        initiated: false
    },
    rectDoor: new Boundary({
        gamePosition: {
            x: 480,
            y: 250
        }
    }),
    backgroundImage: new Image(),
    background: "",
    battleBackgroundImage: new Image(),
    battleBackground: "",
    foregroundImage: new Image(),
    foreground: "",
    playerDownImage: new Image(),
    playerUpImage: new Image(),
    playerLeftImage: new Image(),
    playerRightImage: new Image(),
    player: "",
    healer: "",
    itemsInWorld: [],
    
    init: () => {
        game.ctx = game.cvs.getContext('2d');
        game.ctxTeam = game.cvsTeam.getContext('2d');
        game.cvs.width = 1024;
        game.cvs.height = 576;

        game.battleBackgroundImage.src = "/pokemon-game/img/gameWorld/battleBackground.png";
        game.battleBackground = new Sprite({
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
            image: game.battleBackgroundImage,
            opacity: 0
        });
    
        game.foregroundImage.src = '/pokemon-game/img/gameWorld/foregroundObjects.png';
        game.foreground = new Sprite({ 
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: game.offset.x,
                y: game.offset.y
            },
            dimensions: {
                width: 3360,
                height: 1920
            },
            image: game.foregroundImage 
        });
        
        game.backgroundImage.src = '/pokemon-game/img/gameWorld/newRidgeTown.png';
        game.background = new Sprite({ 
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: game.offset.x,
                y: game.offset.y
            },
            dimensions: {
                width: 3360,
                height: 1920
            },
            image: game.backgroundImage,
        });

        for (let i = 0; i < collisions.length; i += 70) {
            game.collisionsMap.push(collisions.slice(i, i + 70));
        };

        //Collsion 
        game.collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol === 1025)
                game.boundaries.push(
                    new Boundary({
                        gamePosition: {
                            x: j * Boundary.width + game.offset.x, 
                            y: i * Boundary.height + game.offset.y,
                        }
                    })
                )
            })
        });

        game.boundaries.forEach(boundary => {
            game.collidingObjects.push(boundary);
        })

        for (let i = 0; i < battleZonesData.length; i += 70) {
            game.battleZonesMap.push(battleZonesData.slice(i, i + 70));
        };

        //Encounter Spaces
        game.battleZonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol === 1025)
                game.battleZones.push(
                    new Boundary({
                        gamePosition: {
                            x: j * Boundary.width + game.offset.x, 
                            y: i * Boundary.height + game.offset.y,
                        }
                    })
                )
            })
        });
        
        const playerPosition = {};
        const team = new Team([], 4);
        const inventory =  new Inventory([], 10);
    //Save Game management, load unless save doesn't exist
        // if(localStorage.getItem("monsterGame") === null){
            // inventory.items.push(items.HealthPotion);
            // inventory.items.push(items.AtkBoost);
            // inventory.items.push(items.DefBoost);

            playerPosition.x = (game.cvs.width / 2) - (192 / 8);
            playerPosition.y = (game.cvs.height / 2) - (68 / 2);
            
            team.roster.push(new Monster(monsters.Emby));
            team.roster[0].frontImage = false;
            team.roster[0].backImage = true;
            team.roster[0].gamePosition = {
                        x: 280,
                        y: 325
                    };
        // } else {
        //     let save = JSON.parse(localStorage.getItem("monsterGame"));
        //     console.log("Loaded");
        //     inventory.items = save.inventory.items;
        //     canvasMove.x = save.canvasPosition.x;
        //     canvasMove.y = save.canvasPosition.y;
        //     c.translate(canvasMove.x, canvasMove.y);
        //     playerPosition = save.playerPosition
                
        //     save.team.stats.forEach((monster, index) => {
        //         let name = monster.name.replace(/\s/g, '');
        //         team.roster.push(new Monster(monsters[name]));
        //         team.roster[index].stats = monster.stats;
        //         team.roster[index].attacks = monster.attacks;
        //         team.roster[index].isEnemy = monster.isEnemy;
        //         team.roster[index].image = team.roster[index].sprites.backImage;
        //         team.roster[index].position = {
        //             x: 280,
        //             y: 325
        //         };
        //     })
        // }
                
        game.playerUpImage.src = '/pokemon-game/img/people/playerUp.png';
        game.playerRightImage.src = '/pokemon-game/img/people/playerRight.png';
        game.playerDownImage.src = '/pokemon-game/img/people/playerDown.png';
        game.playerLeftImage.src = '/pokemon-game/img/people/playerLeft.png';

        game.player = new Person({
            name: "Brandon",
            team: team,
            inventory: inventory,
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: playerPosition.x,
                y: playerPosition.y
            },
            dimensions: {
                width: 48,
                height: 68
            },
            image: game.playerDownImage,
            frames: {
                max: 4,
                hold: 10
            },
            sprites: {
                up: game.playerUpImage,
                left: game.playerLeftImage,
                right: game.playerRightImage,
                down: game.playerDownImage,
            
            },
            monsterFriend: 15,
        });

        console.log(game.player.gamePosition);
        
        //NPC
        game.healer = new Sprite({
            image: game.playerDownImage,
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: 356,
                y: 182
            },
            dimensions: {
                width: 48,
                height: 68
            },
            frames: {
                max: 4,
                hold: 10
            },
            sprites: {
                up: game.playerUpImage,
                left: game.playerLeftImage,
                right: game.playerRightImage,
                down: game.playerDownImage,
            }
        })

        game.itemsInWorld = [
            new Item (itemsGhasblr.AtkBoost),
            new Item (itemsGhasblr.DefBoost),
            new Item (itemsGhasblr.HealthPotion)
        ];

        game.collidingObjects.push(game.healer);

        game.itemsInWorld.forEach(item => {
            game.collidingObjects.push(item);
        })

        dialog.nextBtn.addEventListener('click', () => {
            dialog.progressTurn();
        })

        game.cvs.addEventListener('click', () => {
            if(game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: game.rectDoor
            })){
                console.log("Entering house")
            }
        })

        //event listener for healer
        game.cvs.addEventListener('click', () => {
            if(game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x + 3,
                    y: game.healer.gamePosition.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x - 3,
                    y: game.healer.gamePosition.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x,
                    y: game.healer.gamePosition.y + 3
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x,
                    y: game.healer.gamePosition.y - 3
                }}
            })
            ){
                //Heals monsters
                const yesBtn = document.createElement("button");
                const noBtn = document.createElement("button");
                dialog.nextBtn.style.display = "none";
                dialog.clearDialog();

                
                dialog.displayDialog("Would you like to heal your monsters?");


                yesBtn.classList.add("yesBtn", "dialogBtn");
                yesBtn.innerHTML = "Yes";
                noBtn.classList.add("noBtn", "dialogBtn");
                noBtn.innerHTML = "No";
            
                yesBtn.addEventListener("click", () => {
                    game.player.team.roster.forEach((monster) => {
                        monster.stats.hp = monster.stats.maxHP;
                    })
                    
                    dialog.clearDialog();
                    dialog.displayDialog("Your monsters are healed!");
                    dialog.nextBtn.style.display = "block";
                })
            
                noBtn.addEventListener("click", () => {
                    dialog.dialogBox.style.display = "none";
                    dialog.nextBtn.style.display = "block";
                })

                dialog.dialogBox.append(yesBtn);
                dialog.dialogBox.append(noBtn);
            }
        })

        // Event listener for items
        game.cvs.addEventListener('click', () => {
            game.itemsInWorld.forEach(item => {
                if(game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x + 3,
                        y: item.gamePosition.y
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x - 3,
                        y: item.gamePosition.y
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y + 3
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...item, gamePosition: {
                        x: item.gamePosition.x,
                        y: item.gamePosition.y - 3
                    }}
                })
                ){
                    dialog.clearDialog();
                    dialog.displayDialog("You found " + item.name + "!");
                    game.itemsInWorld.splice(game.itemsInWorld.indexOf(item), 1);
                    game.collidingObjects.splice(game.collidingObjects.indexOf(item), 1);
                    game.player.inventory.pickUp(item);
                }
            })
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                //Lower case keys for movement
                case 'w':
                    game.keys.w.pressed = true;
                    game.lastKey = "w"
                    break;
                case 'a':
                    game.keys.a.pressed = true;
                    game.lastKey = "a"
                    break;
                case 's':
                    game.keys.s.pressed = true;
                    game.lastKey = "s"
                    break;
                case 'd':
                    game.keys.d.pressed = true;
                    game.lastKey = "d"
                    break;
                //Lower case keys for actions
                case 'i':
                    if(game.player.menuDisplayed) {
                        menu.close();
                    } else {
                        menu.open();
                    }
                    break;
                //Lower case keys for movement
                case 'W':
                    game.keys.w.pressed = true;
                    game.lastKey = "w"
                    break;
                case 'A':
                    game.keys.a.pressed = true;
                    game.lastKey = "a"
                    break;
                case 'S':
                    game.keys.s.pressed = true;
                    game.lastKey = "s"
                    break;
                case 'D':
                    game.keys.d.pressed = true;
                    game.lastKey = "d"
                    break;
                //Lower case keys for actions
                case 'I':
                    if(game.player.menuDisplayed) {
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
                    game.keys.w.pressed = false;
                    break;

                case 'a':
                    game.keys.a.pressed = false;
                    break;

                case 's':
                    game.keys.s.pressed = false;
                    break;

                case 'd':
                    game.keys.d.pressed = false;
                    break;

                case 'W':
                    game.keys.w.pressed = false;
                    break;

                case 'A':
                    game.keys.a.pressed = false;
                    break;

                case 'S':
                    game.keys.s.pressed = false;
                    break;

                case 'D':
                    game.keys.d.pressed = false;
                    break;
            }
        });

        document.querySelectorAll(".menu-item").forEach(item => {
            item.addEventListener('click', () => {
                let selection = item.innerHTML
                switch (selection) {
                    case "Team":
                        game.player.team.viewTeam();
                        break;
                    case "Inventory":
                        game.player.inventory.openInventory();
                        break;
                    case "Settings":
                        settings.open();
                        break;
                    case "Save":
                        game.save();
                        break;
                    case "Quit":
                        game.quit();
                        break;
                    default:
                        console.log("Error clicking menu");
                        break;
                }
            })
        })

        window.addEventListener('click', () => {
            if(!game.clicked) {
            audio.Map.play()
            game.clicked = true
            }
        })

        game.backBtn.addEventListener("click", () => {
            menu.close();
            menu.open();
        })

        game.inventoryOptions.forEach((option) =>{
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
            rectangle1.gamePosition.x + rectangle1.dimensions.width >= rectangle2.gamePosition.x && 
            rectangle1.gamePosition.x <= rectangle2.gamePosition.x + rectangle2.dimensions.width && 
            rectangle1.gamePosition.y + rectangle1.dimensions.height >= rectangle2.gamePosition.y && 
            rectangle1.gamePosition.y <= rectangle2.gamePosition.y + rectangle2.dimensions.height
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
        game.healer.draw();
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

    save: () => {
        game.player.team.roster.forEach(monster => {
            let statsObject = {
                name: monster.name,
                isEnemy: monster.isEnemy,
                stats: monster.stats,
                attacks: monster.attacks
            }

            game.statsSave.push(statsObject);
        })
        const saveState = {
            canvasPosition: game.canvasMove,
            playerPosition: game.player.gamePosition,
            team: {
                stats: game.statsSave,
                size: game.player.team.maxSize
            },
            inventory: game.player.inventory
        }
        localStorage.setItem("monsterGame", JSON.stringify(saveState));
        console.log("Saved");
    },

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
game.init();
game.animate();