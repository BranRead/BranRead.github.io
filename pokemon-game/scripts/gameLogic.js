const gameLogic = {
    // General game logic
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

    //Potentially move elsewhere
    //Between 0-100. Higher numbers are harder.
    // battle
    fleeChance: 50,
    cvsTeam: document.querySelector('#spriteWindow'),
    ctxTeam: "",
    backBtn: document.getElementById("back-btn-menu"),
    inventoryOptions: document.querySelectorAll(".inventoryOption"),
    isBattleInitiated: false,


    init: () => {
        game.team = new Team([], 4);
        game.inventory =  new Inventory([], 10);

         //Save Game management, load unless save doesn't exist
        // if(localStorage.getItem("monsterGame") === null){
            // inventory.items.push(items.HealthPotion);
            // inventory.items.push(items.AtkBoost);
            // inventory.items.push(items.DefBoost);
            
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

        gameLogic.playerUpImage.src = '/pokemon-game/img/people/playerUp.png';
        gameLogic.playerRightImage.src = '/pokemon-game/img/people/playerRight.png';
         gameLogic.playerDownImage.src = '/pokemon-game/img/people/playerDown.png';
         gameLogic.playerLeftImage.src = '/pokemon-game/img/people/playerLeft.png';

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
                hold: 10
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


        // Maybe add elsewhere
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
        gameLogic.backBtn.addEventListener("click", () => {
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
            rectangle1.gamePosition.x + rectangle1.dimensions.width >= rectangle2.gamePosition.x +  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.x <= rectangle2.gamePosition.x + rectangle2.dimensions.width -  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.y + rectangle1.dimensions.height >= rectangle2.gamePosition.y +  gameLogic.collisionBuffer && 
            rectangle1.gamePosition.y <= rectangle2.gamePosition.y + rectangle2.dimensions.height -  gameLogic.collisionBuffer
        )

        
    },
    
    
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