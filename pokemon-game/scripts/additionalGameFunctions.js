additionalGameFunctions = {

    /**
     * Function which adds items to world maps
     * Change logic here when adding new worlds or hidden items.
     */
    addHiddenItems: () => {
        // Repurpose each time it's needed
        let itemsToBeAdded = [];

        gameLogic.maps[2].hiddenItemsInWorld[0].pickupFunction = () => {
            let item = gameLogic.maps[2].hiddenItemsInWorld[0];
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
                let hiddenItem = new Item(itemsGhasblr.HealthPotion);
                hiddenItem.quantity = 2
                dialog.displayDialog("You found " + hiddenItem.quantity + " " + hiddenItem.name + "s!");
                gameLogic.maps[2].hiddenItemsInWorld.splice(gameLogic.maps[2].hiddenItemsInWorld.indexOf(item), 1);
                gameLogic.player.inventory.pickUp(hiddenItem);
                return true;
            } else {
                return false
            }
        }
        
        itemsToBeAdded = [itemsGhasblr.HealthPotion, itemsGhasblr.AtkBoost, itemsGhasblr.DefBoost, itemsGhasblr.HealthPotion];
        gameLogic.maps[0].hiddenItemsInWorld.forEach((item, i) => {
            item.pickupFunction = () => {
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
                    let hiddenItem = itemsToBeAdded[i];
                    if(hiddenItem.quantity > 1) {
                        dialog.displayDialog("You found " + hiddenItem.quantity + " " + hiddenItem.name + "s!");
                    } else {
                        dialog.displayDialog("You found a " + hiddenItem.name + "!");

                    }
                    
                    gameLogic.maps[0].hiddenItemsInWorld.splice(gameLogic.maps[0].hiddenItemsInWorld.indexOf(item), 1);
                    gameLogic.player.inventory.pickUp(hiddenItem);
                    return true;
                } else {
                    return false
                }
            }
        })
    },

    /**
     * Function to add functions to doors/stairs
     * Change logic here when adding more entrances/exits
     */
    addDoorFunctions: () => {
        // Entering player house
        gameLogic.maps[0].doors[1].enterFunction = () => {
            window.cancelAnimationFrame(gameLogic.animationID);
            // console.log("Before entering");
            // console.log("Player position is: " + gameLogic.maps[0].playerPosition.x + " " + gameLogic.maps[0].playerPosition.y);
            // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);

            audio.Map.stop()
            // Turns on black div for a moment
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 0,
                yoyo: false,
                duration: 1,
                onComplete() {
                    gameLogic.maps[1].backgroundSprite.gamePosition = positions.PlayerHouseFromGhasblr;
                    gameLogic.maps[1].foregroundSprite.gamePosition = positions.PlayerHouseFromGhasblr;
                    gameLogic.maps[1].offset = positions.PlayerHouseFromGhasblr;
    
                    let collisionIndex = 0;
                    gameLogic.maps[1].collisionsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0) {
                                gameLogic.maps[1].collidingObjects[collisionIndex].gamePosition = {
                                            x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                            y: i * Boundary.height + gameLogic.maps[1].offset.y,
                                    }
                                collisionIndex++;
                            }
                        })
                    });

                    let doorIndex = 0;
                    gameLogic.maps[1].doorsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0){
                                gameLogic.maps[1].doors[doorIndex].gamePosition = {
                                    x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                    y: i * Boundary.height + gameLogic.maps[1].offset.y, 
                                }
                                doorIndex++;
                            }
                        })
                    })
                    gameLogic.maps[1].peopleInWorld[0].gamePosition = {
                        x: positions.PlayerHouseFromPlayerRoom.x + positions.HealerPosition.x,
                        y: positions.PlayerHouseFromPlayerRoom.y + positions.HealerPosition.y,
                    }
                    positions.playerPosition.x -= gameLogic.canvasMove.x;
                    positions.playerPosition.y -= gameLogic.canvasMove.y;
                    gameLogic.canvasMove = {
                        x: 0,
                        y: 0
                    }
                    gameLogic.player.image = gameLogic.playerUpImage;
                    canvasSetup.clearScreen(gameLogic.maps[0].context);
                    gameLogic.maps[1].isActive = true;
                    gameLogic.maps[1].playerPosition = positions.playerPosition;
                    gameLogic.maps[0].isActive = false;
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                        duration: 0.4,
                    })
                    // console.log("After entering");
                    // console.log("Player position is: " + gameLogic.maps[1].playerPosition.x + " " + gameLogic.maps[1].playerPosition.y);
                    // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
                    gameLogic.animate();
                }
            })
        }
        
    
    
   
        // Stairs up to players room
        gameLogic.maps[1].doors[0].enterFunction = () => {
            window.cancelAnimationFrame(gameLogic.animationID);
            // console.log("Before entering");
            // console.log("Player position is: " + gameLogic.maps[1].playerPosition.x + " " + gameLogic.maps[1].playerPosition.y);
            // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
            // Turns on black div for a moment
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 0,
                yoyo: false,
                duration: 1,
                onComplete() {
                    gameLogic.maps[2].backgroundSprite.gamePosition = positions.PlayerRoomFromPlayerHouse;
                    gameLogic.maps[2].foregroundSprite.gamePosition = positions.PlayerRoomFromPlayerHouse;
                    gameLogic.maps[2].offset = positions.PlayerRoomFromPlayerHouse;
    
                    let collisionIndex = 0;
                    gameLogic.maps[2].collisionsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0) {
                                gameLogic.maps[2].collidingObjects[collisionIndex].gamePosition = {
                                            x: j * Boundary.width + gameLogic.maps[2].offset.x, 
                                            y: i * Boundary.height + gameLogic.maps[2].offset.y,
                                    }
                                collisionIndex++;
                            }
                        })
                    });
                    let doorIndex = 0;
                    gameLogic.maps[1].doorsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0){
                                gameLogic.maps[1].doors[doorIndex].gamePosition = {
                                    x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                    y: i * Boundary.height + gameLogic.maps[1].offset.y, 
                                }
                                doorIndex++;
                            }
                        })
                    })
                    
                    positions.playerPosition.x -= gameLogic.canvasMove.x;
                    positions.playerPosition.y -= gameLogic.canvasMove.y;
                    gameLogic.canvasMove = {
                        x: 0,
                        y: 0
                    }
                    gameLogic.player.image = gameLogic.playerLeftImage;
                    canvasSetup.clearScreen(gameLogic.maps[1].context);
                    gameLogic.maps[1].isActive = false;
                    gameLogic.maps[2].isActive = true;
                    gameLogic.maps[2].playerPosition = positions.playerPosition;
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                        duration: 0.4,
                    })
                    // console.log("After entering");
                    // console.log("Player position is: " + gameLogic.maps[2].playerPosition.x + " " + gameLogic.maps[2].playerPosition.y);
                    // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
                    gameLogic.animate();
                }
            })
        }
    
    
    

        // Stairs down from Players Room
        gameLogic.maps[2].doors[0].enterFunction = () => {
            window.cancelAnimationFrame(gameLogic.animationID);
            // console.log("Before entering");
            // console.log("Player position is: " + gameLogic.maps[2].playerPosition.x + " " + gameLogic.maps[2].playerPosition.y);
            // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
            // audio.Map.stop()
            // Turns on black div for a moment
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 0,
                yoyo: false,
                duration: 1,
                onComplete() {
                    gameLogic.maps[1].backgroundSprite.gamePosition = positions.PlayerHouseFromPlayerRoom;
                    gameLogic.maps[1].foregroundSprite.gamePosition = positions.PlayerHouseFromPlayerRoom;
                    gameLogic.maps[1].offset = positions.PlayerHouseFromPlayerRoom;
    
                    let collisionIndex = 0;
                    gameLogic.maps[1].collisionsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0) {
                                gameLogic.maps[1].collidingObjects[collisionIndex].gamePosition = {
                                            x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                            y: i * Boundary.height + gameLogic.maps[1].offset.y,
                                    }
                                collisionIndex++;
                            }
                        })
                    });
                    let doorIndex = 0;
                    gameLogic.maps[1].doorsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0){
                                gameLogic.maps[1].doors[doorIndex].gamePosition = {
                                    x: j * Boundary.width + gameLogic.maps[1].offset.x, 
                                    y: i * Boundary.height + gameLogic.maps[1].offset.y, 
                                }
                                doorIndex++;
                            }
                        })
                    })
                    gameLogic.maps[1].peopleInWorld[0].gamePosition = {
                        x: positions.PlayerHouseFromPlayerRoom.x + positions.HealerPosition.x,
                        y: positions.PlayerHouseFromPlayerRoom.y + positions.HealerPosition.y,
                    }
                    positions.playerPosition.x -= gameLogic.canvasMove.x;
                    positions.playerPosition.y -= gameLogic.canvasMove.y;
                    gameLogic.canvasMove = {
                        x: 0,
                        y: 0
                    }
                    gameLogic.player.image = gameLogic.playerLeftImage;
                    canvasSetup.clearScreen(gameLogic.maps[2].context);
                    gameLogic.maps[2].isActive = false;
                    gameLogic.maps[1].isActive = true;
                    gameLogic.maps[1].playerPosition = positions.playerPosition;
                    
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                        duration: 0.4,
                    })
                    // console.log("After entering");
                    // console.log("Player position is: " + gameLogic.maps[1].playerPosition.x + " " + gameLogic.maps[1].playerPosition.y);
                    // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
                    gameLogic.animate();
                }
            })
        }
    
        // Exit from players house
        gameLogic.maps[1].doors[1].enterFunction = () => {
            window.cancelAnimationFrame(gameLogic.animationID);
            // console.log("Before entering");
            // console.log("Player position is: " + gameLogic.maps[1].playerPosition.x + " " + gameLogic.maps[1].playerPosition.y);
            // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
            // audio.Map.stop()
            // Turns on black div for a moment
            gsap.to('#overlappingDiv', {
                opacity: 1,
                repeat: 0,
                yoyo: false,
                duration: 1,
                onComplete() {
                    gameLogic.maps[0].backgroundSprite.gamePosition = positions.GhasblrFromPlayerHouse;
                    gameLogic.maps[0].foregroundSprite.gamePosition = positions.GhasblrFromPlayerHouse;
                    gameLogic.maps[0].offset = positions.GhasblrFromPlayerHouse;
    
                    let collisionIndex = 0;
                    gameLogic.maps[0].collisionsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0) {
                                gameLogic.maps[0].collidingObjects[collisionIndex].gamePosition = {
                                            x: j * Boundary.width + gameLogic.maps[0].offset.x, 
                                            y: i * Boundary.height + gameLogic.maps[0].offset.y,
                                    }
                                collisionIndex++;
                            }
                        })
                    });
                    let doorIndex = 0;
                    gameLogic.maps[0].doorsMap.forEach((row, i) => {
                        row.forEach((symbol, j) => {
                            if(symbol != 0){
                                gameLogic.maps[0].doors[doorIndex].gamePosition = {
                                    x: j * Boundary.width + gameLogic.maps[0].offset.x, 
                                    y: i * Boundary.height + gameLogic.maps[0].offset.y, 
                                }
                                doorIndex++;
                            }
                        })
                    })
                    positions.playerPosition.x -= gameLogic.canvasMove.x;
                    positions.playerPosition.y -= gameLogic.canvasMove.y;
                    gameLogic.canvasMove = {
                        x: 0,
                        y: 0
                    }
                    gameLogic.player.image = gameLogic.playerDownImage;
                    canvasSetup.clearScreen(gameLogic.maps[1].context);
                    gameLogic.maps[1].isActive = false;
                    gameLogic.maps[0].isActive = true;
                    gameLogic.maps[0].playerPosition = positions.playerPosition;
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                        duration: 0.4,
                    })
                    // console.log("After entering");
                    // console.log("Player position is: " + gameLogic.maps[0].playerPosition.x + " " + gameLogic.maps[0].playerPosition.y);
                    // console.log("Canavs move: " + gameLogic.canvasMove.x + " " + gameLogic.canvasMove.y);
                    gameLogic.animate();
                }
            })
        }
    },

    peopleFunctions: () => {
        
        canvasSetup.canvas.addEventListener('click', () => {
            if(gameLogic.rectangularCollision({
                rectangle1: gameLogic.player, 
                rectangle2: {...gameLogic.maps[1].peopleInWorld[0], gamePosition: {
                    x: gameLogic.maps[1].peopleInWorld[0].gamePosition.x + gameLogic.playerSpeed,
                    y: gameLogic.maps[1].peopleInWorld[0].gamePosition.y
                }}
            }) || gameLogic.rectangularCollision({
                rectangle1: gameLogic.player, 
                rectangle2: {...gameLogic.maps[1].peopleInWorld[0], gamePosition: {
                    x: gameLogic.maps[1].peopleInWorld[0].gamePosition.x - gameLogic.playerSpeed,
                    y: gameLogic.maps[1].peopleInWorld[0].gamePosition.y
                }}
            }) || gameLogic.rectangularCollision({
                rectangle1: gameLogic.player, 
                rectangle2: {...gameLogic.maps[1].peopleInWorld[0], gamePosition: {
                    x: gameLogic.maps[1].peopleInWorld[0].gamePosition.x,
                    y: gameLogic.maps[1].peopleInWorld[0].gamePosition.y + gameLogic.playerSpeed
                }}
            }) || gameLogic.rectangularCollision({
                rectangle1: gameLogic.player, 
                rectangle2: {...gameLogic.maps[1].peopleInWorld[0], gamePosition: {
                    x: gameLogic.maps[1].peopleInWorld[0].gamePosition.x,
                    y: gameLogic.maps[1].peopleInWorld[0].gamePosition.y - gameLogic.playerSpeed
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
                    gameLogic.player.team.roster.forEach((monster) => {
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
    }
}