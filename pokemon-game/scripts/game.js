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
    collisionsMap: [],
    boundaries: [],
    battleZonesMap: [],
    battleZones: [],
    battle: { 
        initiated: false
    },
    rectDoor: new Boundary({
        position: {
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


  
    init: () => {
        game.ctx = game.cvs.getContext('2d');
        game.ctxTeam = game.cvsTeam.getContext('2d');
        game.cvs.width = 1024;
        game.cvs.height = 576;

        game.battleBackgroundImage.src = "/pokemon-game/img/gameWorld/battleBackground.png";
        game.battleBackground = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            image: game.battleBackgroundImage,
            opacity: 0
        });
    
        game.foregroundImage.src = '/pokemon-game/img/gameWorld/foregroundObjects.png';
        game.foreground = new Sprite({ 
            position: {
                x: game.offset.x,
                y: game.offset.y
            },
            image: game.foregroundImage 
        });
        
        game.backgroundImage.src = '/pokemon-game/img/gameWorld/newRidgeTown.png';
        game.background = new Sprite({ 
            position: {
                x: game.offset.x,
                y: game.offset.y
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
                        position: {
                            x: j * Boundary.width + game.offset.x, 
                            y: i * Boundary.height + game.offset.y,
                        }
                    })
                )
            })
        });

        for (let i = 0; i < battleZonesData.length; i += 70) {
            game.battleZonesMap.push(battleZonesData.slice(i, i + 70));
        };

        //Encounter Spaces
        game.battleZonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if(symbol === 1025)
                game.battleZones.push(
                    new Boundary({
                        position: {
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
            inventory.items.push(items.HealthPotion);
            inventory.items.push(items.AtkBoost);
            inventory.items.push(items.DefBoost);

            playerPosition.x = (game.cvs.width / 2) - (192 / 8);
            playerPosition.y = (game.cvs.height / 2) - (68 / 2);
            
            team.roster.push(new Monster(monsters.Emby));
            team.roster[0].frontImage = false;
            team.roster[0].backImage = true;
            team.roster[0].position = {
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
            position: {
                x: playerPosition.x,
                y: playerPosition.y
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
        
        //NPC
        game.healer = new Sprite({
            position: {
                x: 356,
                y: 182
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
                rectangle2: {...game.healer, position: {
                    x: game.healer.position.x + 3,
                    y: game.healer.position.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, position: {
                    x: game.healer.position.x - 3,
                    y: game.healer.position.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, position: {
                    x: game.healer.position.x,
                    y: game.healer.position.y + 3
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, position: {
                    x: game.healer.position.x,
                    y: game.healer.position.y - 3
                }}
            })
            ){
                //Heals monsters
                const yesBtn = document.createElement("button");
                const noBtn = document.createElement("button");

                
                dialogue.displayDialogue("Would you like to heal your monsters?");


                yesBtn.className = "yesBtn";
                yesBtn.innerHTML = "Yes";
                noBtn.className = "noBtn";
                noBtn.innerHTML = "No";
            
                yesBtn.addEventListener("click", () => {
                    game.player.team.roster.forEach((monster) => {
                        monster.stats.hp = monster.stats.maxHP;
                        battleSetup.queue.push(() => {
                            dialogue.displayDialogue("Your monsters are healed!");
                        
                        }, () => {
                            dialogBackground.style.display = "none";
                        })
                    })
                })
            
                noBtn.addEventListener("click", () => {
                    dialogBackground.style.display = "none";
                })

                dialogue.dialogueBox.append(yesBtn);
                dialogue.dialogueBox.append(noBtn);
            }
        })

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
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
                case 'i':
                    if(game.player.menuDisplayed) {
                        menu.close();
                    } else {
                        menu.open();
                    }
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
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

        document.querySelector("#goBack").addEventListener("click", () => {
            document.querySelector("#goBack").style.display = "none";
            battleMenu.battleOptions();
        })

        dialogue.dialogueBox.addEventListener("click", dialogue.progressTurn);

        window.addEventListener('click', () => {
            if(!game.clicked) {
            audio.Map.play()
            clicked = true
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
    
    rectangularCollision: ({rectangle1, rectangle2}) => {
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        )
    },
    
    animate: () => {
        const animationID = window.requestAnimationFrame(game.animate);
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
    
        game.player.animate = false;
        if (game.battle.initiated) return
    
        // Activate a battle
        if(game.keys.w.pressed || game.keys.a.pressed || game.keys.s.pressed || game.keys.d.pressed) {
            for(let i = 0; i < game.battleZones.length; i++) {
                const battleZone = game.battleZones[i];
                //gets overlapping area of player with encounter zone
                const overlappingArea = 
                    (Math.min(
                        game.player.position.x + game.player.width, 
                        battleZone.position.x + battleZone.width
                        ) - 
                        Math.max(game.player.position.x, battleZone.position.x)
                    ) * 
                    (Math.min(
                        game.player.position.y + game.player.height, 
                        battleZone.position.y + battleZone.height
                        ) - 
                        Math.max(game.player.position.y, battleZone.position.y)
                    ) ;
                if (
                    game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: battleZone
                }) && 
                overlappingArea > game.player.width * game.player.height / 2 
                &&
                //The actual encounter chance if on the encounter zone
                Math.random() < game.encounterRate
                )  {
                    //deactivate existing animation loop
                    window.cancelAnimationFrame(animationID);
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
        if(game.keys.w.pressed && game.lastKey === 'w' && !game.player.menuDisplayed) {
            game.player.animate = true;
            game.player.image = game.player.sprites.up;
            for(let i = 0; i < game.boundaries.length; i++) {
                const boundary = game.boundaries[i];
                if (game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...game.healer, position: {
                        x: game.healer.position.x,
                        y: game.healer.position.y + 3
                    }}
                })
                )  {
                    moving = false;
                    break;
                    };
            };
            if(moving) {
                game.ctx.translate(0, 3);
                game.canvasMove.y += 3;
                game.player.position.y -= 3;
            }
        } else if(game.keys.a.pressed && game.lastKey === 'a' && !game.player.menuDisplayed) {
            game.player.animate = true;
            game.player.image = game.player.sprites.left;
            for(let i = 0; i < game.boundaries.length; i++) {
                const boundary = game.boundaries[i];
                if (game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y  
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...game.healer, position: {
                        x: game.healer.position.x + 3,
                        y: game.healer.position.y
                    }}
                })
                )  {
                    moving = false;
                    break;
                    };
            };
            if(moving) {
                game.ctx.translate(3, 0);
                game.canvasMove.x += 3;
                game.player.position.x -= 3;
            }
        } else if(game.keys.s.pressed && game.lastKey === 's' && !game.player.menuDisplayed) {
            game.player.animate = true;
            game.player.image = game.player.sprites.down;
            for(let i = 0; i < game.boundaries.length; i++) {
                const boundary = game.boundaries[i];
                if (game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                }) || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...game.healer, position: {
                        x: game.healer.position.x,
                        y: game.healer.position.y - 3
                    }}
                })
                )  {
                    moving = false;
                    break;
                    };
            }
            if(moving) {
                game.ctx.translate(0, -3);
                game.canvasMove.y -= 3;
                game.player.position.y += 3;
            }
        } else if(game.keys.d.pressed && game.lastKey === 'd' && !game.player.menuDisplayed) {
            game.player.animate = true;
            game.player.image = game.player.sprites.right;
            for(let i = 0; i < game.boundaries.length; i++) {
                const boundary = game.boundaries[i];
                if (game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })  || game.rectangularCollision({
                    rectangle1: game.player, 
                    rectangle2: {...game.healer, position: {
                        x: game.healer.position.x - 3,
                        y: game.healer.position.y
                    }}
                })
                )  {
                    moving = false;
                    break;
                    };
            }
            if(moving) {
                game.ctx.translate(-3, 0);
                game.canvasMove.x -= 3;
                game.player.position.x += 3;
            }
        }
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
            playerPosition: game.player.position,
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
        //Dialogue
        menu.close();
        dialogBackground.style.display = "flex";
        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = "Are you sure you'd like to quit? Unsaved changes will be lost.";
        
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
        
        dialogueBox.append(yesBtn);
        dialogueBox.append(noBtn);
    }
}
game.init();
game.animate();