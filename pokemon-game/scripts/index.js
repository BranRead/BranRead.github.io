const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 
const menu = document.querySelectorAll(".menu-item");
const backBtn = document.getElementById("back-btn-menu");
const dialogueBox = document.querySelector("#dialogueBox");
const statsSave = []
let queue = [];
let endQueue = [];





const offset = {
    x: -832,
    y: -230
}

const canvasMove = {
    x: 0,
    y: 0
}

backBtn.addEventListener("click", () => {
    closeMenu();
    openMenu();
})

menu.forEach(item => {
    item.addEventListener('click', () => {
        let selection = item.innerHTML
        switch (selection) {
            case "Team":
                player.team.viewTeam();
                break;
            case "Inventory":
                player.inventory.openInventory();
                break;
            case "Settings":
                settings.openSettings();
                break;
            case "Save":
                player.save();
                break;
            case "Quit":
                player.quit();
                break;
            default:
                console.log("Error clicking menu");
                break;
        }
    })
})

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
};

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, i + 70));
};

const boundaries = [];

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

let team = new Team([], 4);
let inventory = new Inventory([], 10);
let playerPosition;

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

const background = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image 
});


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

const battleZones = [];

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

const foreground = new Sprite({ 
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage 
});



let player = new Person({
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
});



let healer = new Sprite({
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
        dialogBackground.style.display = "flex";
        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = "Would you like to heal your monsters?";
        
        const yesBtn = document.createElement("button");
        yesBtn.className = "yesBtn";
        yesBtn.innerHTML = "Yes";
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

        const noBtn = document.createElement("button");
        noBtn.className = "noBtn";
        noBtn.innerHTML = "No";
        noBtn.addEventListener("click", () => {
            dialogBackground.style.display = "none";
        })
        
        dialogueBox.append(yesBtn);
        dialogueBox.append(noBtn);
    }
})



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

// const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

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




function animate() {
    const animationID = window.requestAnimationFrame(animate)

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

    let moving = true;
    player.animate = false;

    if (battle.initiated) return

    // Activate a battle
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed && !player.menuDisplayed) {
        for(let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea = 
                (Math.min(
                    player.position.x + player.width, 
                    battleZone.position.x + battleZone.width
                    ) - 
                Math.max(
                    player.position.x, battleZone.position.x)
                    ) * 
                (Math.min(
                    player.position.y + player.height, 
                    battleZone.position.y + battleZone.height
                    ) - 
                Math.max(player.position.y, battleZone.position.y)) ;
            if (
                rectangularCollision({
                rectangle1: player, 
                rectangle2: battleZone
            }) && 
            overlappingArea > player.width * player.height / 2 
            &&
            Math.random() < 0.01
            )  {
                //deactivate existing animation loop
                window.cancelAnimationFrame(animationID);

                audio.Map.stop()
                audio.initBattle.play()
                audio.battle.play()
                battle.initiated = true
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
                                initBattle()
                                animateBattle()
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
    }
    
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
};
animate()


let lastKey = ""
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

let clicked = false
addEventListener('click', () => {
    if(!clicked) {
    audio.Map.play()
    clicked = true
    }
})

function clearDialog(){
        //Clears dialog box
        const buttonToRemove = document.querySelectorAll('.battleCommands');
        buttonToRemove.forEach(button => {
        button.remove();
    })
}

function queueChecker(){
    queue.forEach(item => {
        console.log(item)
    })
}

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