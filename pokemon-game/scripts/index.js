const canvas = document.querySelector('#gameCamera');
const cvsSprite = document.querySelector('#spriteWindow');
const c = canvas.getContext('2d'); 
const ctxSprite = cvsSprite.getContext('2d'); 
const backBtn = document.getElementById("back-btn-menu");
const statsSave = [];
//Between 0-100. Higher numbers are harder.
const fleeChance = 50;
let queue = [];
let endQueue = [];
let clicked = false;
const battleZones = [];
let lastKey = "";
encounterRate = 0.01;
const keys = {
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
};
const offset = {
    x: -832,
    y: -230
};
const canvasMove = {
    x: 0,
    y: 0
};
let inventoryOptions = document.querySelectorAll(".inventoryOption");
inventoryOptions.forEach((option) =>{
    option.addEventListener("click", (e) => {
        document.querySelectorAll(".inventoryItem").forEach((item) => {
            item.remove();
        })
        displayItems(e.currentTarget.dataset.value);
    })
});
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
};
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70));
};
const boundaries = [];

const battle = { 
    initiated: false
};

let rectDoor = new Rectangle({
    width: 60,
    height: 1,
    position: {
        x: 480,
        y: 250
    }
})

const image = new Image();
image.src = '/pokemon-game/img/gameWorld/newRidgeTown.png';

const foregroundImage = new Image();
foregroundImage.src = '/pokemon-game/img/gameWorld/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = '/pokemon-game/img/people/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = '/pokemon-game/img/people/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = '/pokemon-game/img/people/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = '/pokemon-game/img/people/playerRight.png';

const foreground = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage 
});

let team = new Team([], 4);
let inventory = new Inventory([], 10);
let playerPosition;
const background = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image 
});
canvas.width = 1024;
canvas.height = 576;

//Save Game management, load unless save doesn't exist
// if(localStorage.getItem("monsterGame") === null){
    inventory.items.push(items.HealthPotion);
    inventory.items.push(items.AtkBoost);
    inventory.items.push(items.DefBoost);
    
    playerPosition = {
        x: (canvas.width / 2) - (192 / 8),
        y: (canvas.height / 2) - (68 / 2)
    };
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

const player = new Person({
    name: "Brandon",
    team: team,
    inventory: inventory,
    position: {
        x: playerPosition.x,
        y: playerPosition.y
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,

    },
    monsterFriend: 15,
});

//Collsion 
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x, 
                    y: i * Boundary.height + offset.y,
                }
            })
        )
    })
});

//Encounter Spaces
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        battleZones.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x, 
                    y: i * Boundary.height + offset.y,
                }
            })
        )
    })
});

//NPC
const healer = new Sprite({
    position: {
        x: 356,
        y: 182
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    },
})

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
};

function animate() {
    const animationID = window.requestAnimationFrame(animate);
    let moving = true;

    //Draws all objects needed at start
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    });
    battleZones.forEach(battleZone => {
        battleZone.draw()
    });
    player.draw();
    healer.draw();
    rectDoor.drawRect();
    foreground.draw();

    player.animate = false;
    if (battle.initiated) return

    // Activate a battle
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for(let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            //gets overlapping area of player with encounter zone
            const overlappingArea = 
                (Math.min(
                    player.position.x + player.width, 
                    battleZone.position.x + battleZone.width
                    ) - 
                    Math.max(player.position.x, battleZone.position.x)
                ) * 
                (Math.min(
                    player.position.y + player.height, 
                    battleZone.position.y + battleZone.height
                    ) - 
                    Math.max(player.position.y, battleZone.position.y)
                ) ;
            if (
                rectangularCollision({
                rectangle1: player, 
                rectangle2: battleZone
            }) && 
            overlappingArea > player.width * player.height / 2 
            &&
            //The actual encounter chance if on the encounter zone
            Math.random() < encounterRate
            )  {
                //deactivate existing animation loop
                window.cancelAnimationFrame(animationID);
                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                battle.initiated = true
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
                                battleSetup.initBattle()
                                battleFunctions.animateBattle()
                                //The battle background is a sprite and set to full visibility here
                                //Also that black div is set to invisible
                                battleBackground.opacity = 1
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
    if(keys.w.pressed && lastKey === 'w' && !player.menuDisplayed) {
        player.animate = true;
        player.image = player.sprites.up;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player, 
                rectangle2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }}
            }) || rectangularCollision({
                rectangle1: player, 
                rectangle2: {...healer, position: {
                    x: healer.position.x,
                    y: healer.position.y + 3
                }}
            })
            )  {
                moving = false;
                break;
                };
        };
        if(moving) {
            c.translate(0, 3);
            canvasMove.y += 3;
            player.position.y -= 3;
        }
    } else if(keys.a.pressed && lastKey === 'a' && !player.menuDisplayed) {
        player.animate = true;
        player.image = player.sprites.left;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player, 
                rectangle2: {...boundary, position: {
                    x: boundary.position.x + 3,
                    y: boundary.position.y  
                }}
            }) || rectangularCollision({
                rectangle1: player, 
                rectangle2: {...healer, position: {
                    x: healer.position.x + 3,
                    y: healer.position.y
                }}
            })
            )  {
                moving = false;
                break;
                };
        };
        if(moving) {
            c.translate(3, 0);
            canvasMove.x += 3;
            player.position.x -= 3;
        }
    } else if(keys.s.pressed && lastKey === 's' && !player.menuDisplayed) {
        player.animate = true;
        player.image = player.sprites.down;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player, 
                rectangle2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }}
            }) || rectangularCollision({
                rectangle1: player, 
                rectangle2: {...healer, position: {
                    x: healer.position.x,
                    y: healer.position.y - 3
                }}
            })
            )  {
                moving = false;
                break;
                };
        }
        if(moving) {
            c.translate(0, -3);
            canvasMove.y -= 3;
            player.position.y += 3;
        }
    } else if(keys.d.pressed && lastKey === 'd' && !player.menuDisplayed) {
        player.animate = true;
        player.image = player.sprites.right;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangle1: player, 
                rectangle2: {...boundary, position: {
                    x: boundary.position.x - 3,
                    y: boundary.position.y
                }}
            })  || rectangularCollision({
                rectangle1: player, 
                rectangle2: {...healer, position: {
                    x: healer.position.x - 3,
                    y: healer.position.y
                }}
            })
            )  {
                moving = false;
                break;
                };
        }
        if(moving) {
            c.translate(-3, 0);
            canvasMove.x -= 3;
            player.position.x += 3;
        }
    }
}; //end of animate function
animate()

//event listener for healer
canvas.addEventListener('click', () => {
    if(rectangularCollision({
        rectangle1: player, 
        rectangle2: {...healer, position: {
            x: healer.position.x + 3,
            y: healer.position.y
        }}
    }) || rectangularCollision({
        rectangle1: player, 
        rectangle2: {...healer, position: {
            x: healer.position.x - 3,
            y: healer.position.y
        }}
    }) || rectangularCollision({
        rectangle1: player, 
        rectangle2: {...healer, position: {
            x: healer.position.x,
            y: healer.position.y + 3
        }}
    }) || rectangularCollision({
        rectangle1: player, 
        rectangle2: {...healer, position: {
            x: healer.position.x,
            y: healer.position.y - 3
        }}
    })
    ){
        //Heals monsters
        const yesBtn = document.createElement("button");
        const noBtn = document.createElement("button");
        
        dialogBackground.style.display = "flex";
        dialogue.displayDialogue("Would you like to heal your monsters?");
        
        
        yesBtn.className = "yesBtn";
        yesBtn.innerHTML = "Yes";
        noBtn.className = "noBtn";
        noBtn.innerHTML = "No";

        yesBtn.addEventListener("click", () => {
            player.team.roster.forEach((monster) => {
                monster.stats.hp = monster.stats.maxHP;
                queue.push(() => {
                    dialogueBox.innerHTML = "Your monsters are healed!";

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
            keys.w.pressed = true;
            lastKey = "w"
            break;
        
        case 'a':
            keys.a.pressed = true;
            lastKey = "a"
            break;
        
        case 's':
            keys.s.pressed = true;
            lastKey = "s"
            break;
            
        case 'd':
            keys.d.pressed = true;
            lastKey = "d"
            break;
        case 'i':
            if(player.menuDisplayed) {
                closeMenu();
            } else {
                openMenu();
            }
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        
        case 'a':
            keys.a.pressed = false;
            break;
        
        case 's':
            keys.s.pressed = false;
            break;
            
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

window.addEventListener('click', () => {
    if(!clicked) {
    audio.Map.play()
    clicked = true
    }
})

backBtn.addEventListener("click", () => {
    closeMenu();
    openMenu();
})

canvas.addEventListener('click', () => {
    if(rectangularCollision({
        rectangle1: player, 
        rectangle2: rectDoor
    })){
        ///////////////////////////////////////////////////////////
        //////////////////Function to enter house//////////////////
        ///////////////////////////////////////////////////////////
        console.log("Entering house")
    }
})