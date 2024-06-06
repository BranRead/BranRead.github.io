//Might need to change how I track stat changes due to better javascripting
const battleFunctions = {
    animateBattle: () => {
        gameLogic.previousTime =  gameLogic.currentTime;
        gameLogic.currentTime = performance.now();
        gameLogic.deltaTime =  gameLogic.currentTime -  gameLogic.previousTime; 
        gameLogic.deltaTime /= 10;
        // console.log(deltaTime)
        battleSetup.battleAnimationId = window.requestAnimationFrame(battleFunctions.animateBattle)
        gameLogic.gameMap.battleBackgroundSprite.draw(gameLogic.gameMap.context);
        
        battleSetup.renderedMonsters.forEach((sprite) => {
            sprite.drawMonster(gameLogic.gameMap.context);
        });
    
        battleSetup.renderedAttacks.forEach((sprite) => {
            console.log(sprite.frames.elapsed)
            sprite.draw(gameLogic.gameMap.context);
            
        });
    },
    
    animateAttack: (attack, user, target, renderedAttacks, healthBar, rotation) => {
       
        switch(attack.name) {
            //Switch statement for animations
            case 'Fireball':
                //Plays initial fireball sound and creates it
                audio.initFireball.play();
                const fireballImage = new Image();
                fireballImage.src="./img/attacks/fireball.png";
                const fireball = new Sprite({
                    speedOfAnimation: 50,
                    spritePosition: {
                        x: 0,
                        y: 0
                    },
                    gamePosition: {
                        x: user.position.x,
                        y: user.position.y
                    },
                    dimensions: {
                        width: 64.5,
                        height: 64
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                });
                //Adds the fireball sprite to a specific spot in array
                renderedAttacks.splice(0, 0, fireball);
            
                //Animates the fireball to go to target
                gsap.to(fireball.gamePosition, {
                    x: target.position.x,
                    y: target.position.y,
                    onComplete: () => {
                        //Target gets hit
                        audio.fireballHit.play();
                        //removes the fireball sprite at the specific spot
                        renderedAttacks.splice(0, 1);
                        //Animates the health bar of target
                        gsap.to(healthBar, {
                            width: target.stats.hp + '%',
                            onComplete: () => {
                                //Only the player monster has detailed health info
                                if(target == battleSetup.playerMonster){
                                    let healthText = "";
                                    healthText = `${battleSetup.playerMonster.stats.hp}/${battleSetup.playerMonster.stats.maxHP}`;
                                    document.querySelector("#hpText").innerHTML = healthText;
                                } 
                            }
                        });
                        //Animates target to move and
                        gsap.to(target.position, {
                            x: target.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        });
                        //Flash
                        gsap.to(target, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        });           
                    }
                })
                break;
            case 'Tackle':
                //Creating timeline for tackle to first move user and then to hit target
                const tl = gsap.timeline();
                //player monster should move to the right
                //enemy monster should move to the left
                let movementDistance;
                if (user == battleSetup.playerMonster) {
                    movementDistance = 20;
                } else {
                    movementDistance = -20;
                };
                tl.to(user.position, {
                    x: user.position.x - movementDistance
                }).to(
                    user.position, {
                        x: user.position.x + movementDistance * 2,
                        duration: 0.1,
                        onComplete: () => {
                            //Enemy actually gets hit
                            audio.tackleHit.play()
                            //Healthbar animation of target
                            gsap.to(healthBar, {
                                width: target.stats.hp + '%',
                                onComplete: () => {
                                    //Only the player monster has detailed health info
                                    if(target == battleSetup.playerMonster){
                                        let healthText = "";
                                        healthText = `${battleSetup.playerMonster.stats.hp}/${battleSetup.playerMonster.stats.maxHP}`;
                                        document.querySelector("#hpText").innerHTML = healthText;
                                    } 
                                }
                            })
                            //Target move and 
                            gsap.to(target.position, {
                                x: target.position.x + 10,
                                yoyo: true,
                                repeat: 5,
                                duration: 0.08,
                            })
                            //flash
                            gsap.to(target, {
                                opacity: 0,
                                repeat: 5,
                                yoyo: true,
                                duration: 0.08
                            })
                        }
                    }).to(user.position, {
                        x: user.position.x
                    })
                break;
            default:
                //Default attack animation
                //Healthbar animation
                gsap.to(healthBar, {
                    width: battleSetup.playerMonster.stats.hp + '%',
                    onComplete: () => {
                        //Only the player monster has detailed health info
                        if(target == battleSetup.playerMonster){
                            let healthText = "";
                            healthText = `${battleSetup.playerMonster.stats.hp}/${battleSetup.playerMonster.stats.maxHP}`;
                            document.querySelector("#hpText").innerHTML = healthText;
                        } 
                    }
                })
            break;
        }
    },
    
    startTurn: (selectedAttack) => {
        document.querySelector("#goBack").style.display = "none";
        let ranAtk = Math.floor(Math.random() * (battleSetup.enemyMonster.attacks.length));
        let turnOrder = [];
    
        if(!gameLogic.player.otherAction) {
            if(battleSetup.enemyMonster.stats.spd > battleSetup.playerMonster.stats.spd){
                turnOrder.push(battleSetup.enemyMonster);
                turnOrder.push(battleSetup.playerMonster);
            } else if(battleSetup.enemyMonster.stats.spd < battleSetup.playerMonster.stats.spd){
                turnOrder.push(battleSetup.playerMonster);
                turnOrder.push(battleSetup.enemyMonster);
            } else {
                let speedChance = Math.floor(Math.random() * (2))
                if(speedChance > .5){
                    turnOrder.push(battleSetup.playerMonster);
                    turnOrder.push(battleSetup.enemyMonster); 
                } else {
                    turnOrder.push(battleSetup.enemyMonster);
                    turnOrder.push(battleSetup.playerMonster);
                }
            }
            turnOrder.forEach(monster => {
                if(monster == battleSetup.playerMonster){
                    battleSetup.playerMonster.attacking = true;
                    battleSetup.queue.push(() => {
                        battleSetup.playerMonster.attack({
                            attack: selectedAttack
                        })
                    },
                    () => {
                        battleFunctions.faintCheck(battleSetup.enemyMonster);
                    })
                } else {
                    battleSetup.playerMonster.attacking = false;
                    battleSetup.queue.push(() => {
                        battleSetup.enemyMonster.attack({
                            attack: battleSetup.enemyMonster.attacks[ranAtk]
                        })
                    },
                    () => {
                        battleFunctions.faintCheck(battleSetup.playerMonster);
                    }) 
                }
            })
        } else {
            battleSetup.playerMonster.attacking = false;
            battleSetup.queue.push(() => {
                battleFunctions.faintCheck(battleSetup.playerMonster);
            }) 
            battleSetup.enemyMonster.attack({
                attack: battleSetup.enemyMonster.attacks[ranAtk]
            })
        }
        if(!gameLogic.player.otherAction){
            battleSetup.queue[0]()
            battleSetup.queue.shift()
        }    
    },
    
    endBattle: (message) => {
        battleSetup.endQueue.push(() => {
            gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                    window.cancelAnimationFrame(battleFunctions.battleAnimationID);
                    gameLogic.animate();
                    document.querySelector('#userInterface').style.display = 'none'
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                    })
                    battleSetup.queue = [];
                    battleSetup.endQueue = [];
                    gameLogic.gameMap.context.translate(-gameLogic.canvasMove.x, -gameLogic.canvasMove.y);
                    dialog.dialogBox.style.display = "none";
                    gameLogic.gameMap.battleBackgroundSprite.opacity = 0;
                    audio.battle.stop();   
                    gameLogic.isBattleInitiated = false;
                    audio.Map.play();
                }
            })
        })
        dialog.displayDialog(message);
    },
    
    faintCheck: (target) => {
        if(target.stats.hp <= 0){
            if(target == battleSetup.playerMonster){
                battleSetup.endQueue.push(() => {target.faint()})
                dialog.displayDialog(`${target.name} took ${target.damage} points 
                of damage, they have no more HP left.`);    
            } else if(target == battleSetup.enemyMonster){
                battleSetup.endQueue.push(
                    () => {battleFunctions.expYield()},
                    () => {target.faint()}
                    )
                dialog.displayDialog(`${target.name} took ${target.damage} points 
                of damage, they have no more HP left.`);           
            }
        } else {
            dialog.displayDialog(`${target.name} took ${target.damage} points of damage!`)
            if(battleSetup.queue.length == 1){
                battleMenu.battleOptions();
            }
        }
    },
    
    levelUp: () => {
    // TODO: Add something here for leveling up
    // Make sure it can handle multiple levels at once
    },
    
    expYield: () => {
        let exp = battleSetup.enemyMonster.stats.level * 5;
        battleSetup.playerMonster.stats.currentEXP += exp;
        if(battleSetup.playerMonster.stats.currentEXP >= 
            battleSetup.playerMonster.stats.toNextLevelExp){
            battleSetup.queue.push(() => {
                battleFunctions.levelUp();
            });
            battleSetup.playerMonster.stats.level++;
            dialog.displayDialog(`${battleSetup.playerMonster.name} leveled up to level ${battleSetup.playerMonster.stats.level}.`);
        } else {
            battleSetup.endQueue.splice(1, 0, () => {
                let currentEXP = battleSetup.playerMonster.stats.currentEXP / 
                    battleSetup.playerMonster.stats.toNextLevelEXP;
                currentEXP *= 100;
                gsap.to(document.querySelector("#playerEXPBarBattle"), {
                    width: currentEXP + '%'
                })
            })
            dialog.displayDialog(`${battleSetup.playerMonster.name} gained ${exp} EXP.`); 
        }
    },
}
