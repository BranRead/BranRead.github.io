

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw();
    
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

function animateAttack(attack, user, target, renderedSprites, healthBar, rotation) {
    switch(attack.name) {
        //Switch statement for animations
        case 'Fireball':
        audio.initFireball.play()
        const fireballImage = new Image();
        fireballImage.src="/pokemon-game/img/fireball.png"

            const fireball = new Sprite({
                position: {
                    x: user.position.x,
                    y: user.position.y
                },
                image: fireballImage,
                frames: {
                    max: 4,
                    hold: 10
                },
                animate: true,
                rotation
            })
            
            renderedSprites.splice(1, 0, fireball)

            gsap.to(fireball.position, {
                x: target.position.x,
                y: target.position.y,
                onComplete: () => {
                    //Enemy actually gets hit
                    audio.fireballHit.play()
                    renderedSprites.splice(1, 1)
                    gsap.to(healthBar, {
                        width: target.stats.hp + '%'
                    })
                    gsap.to(target.position, {
                        x: target.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.08,
                    })
                    gsap.to(target, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08
                    })
                    if(target == playerMonster){
                        let healthText = `${playerMonster.stats.hp}/${playerMonster.stats.maxHP}`;
                        document.querySelector("#hpText").innerHTML = healthText
                    } 
                }
            })
        break

        case 'Tackle':
            const tl = gsap.timeline()

            
        let movementDistance = 20
        if (user == enemyMonster) movementDistance = -20
                tl.to(user.position, {
                    x: user.position.x - movementDistance
                })
                    .to(user.position, {
                    x: user.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        //Enemy actually gets hit
                        audio.tackleHit.play()
                        gsap.to(healthBar, {
                            width: target.stats.hp + '%'
                        })
                        gsap.to(target.position, {
                            x: target.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })
                        gsap.to(target, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        if(target == playerMonster){
                            let healthText = `${playerMonster.stats.hp}/${playerMonster.stats.maxHP}`;
                            document.querySelector("#hpText").innerHTML = healthText
                        }
                    }
                })
                    .to(user.position, {
                    x: user.position.x
                })
            break
            default:
                gsap.to(healthBar, {
                    width: playerMonster.stats.hp + '%'
                })
                if(target == playerMonster){
                    let healthText = `${playerMonster.stats.hp}/${playerMonster.stats.maxHP}`;
                    document.querySelector("#hpText").innerHTML = healthText
                }
                break
    }
}

function startTurn(selectedAttack){
    
    let ranAtk = Math.floor(Math.random() * (enemyMonster.attacks.length))
    let turnOrder = [];

    if(!player.otherAction) {
       
        if(enemyMonster.stats.spd > playerMonster.stats.spd){
            turnOrder.push(enemyMonster);
            turnOrder.push(playerMonster);
        } else if(enemyMonster.stats.spd < playerMonster.stats.spd){
            turnOrder.push(playerMonster);
            turnOrder.push(enemyMonster);
        } else {
            let speedChance = Math.floor(Math.random() * (2))
            if(speedChance > .5){
                turnOrder.push(playerMonster);
                turnOrder.push(enemyMonster); 
            } else {
                turnOrder.push(enemyMonster);
                turnOrder.push(playerMonster);
            }
        }
    } else {
        turnOrder.push(enemyMonster);
    }

    turnOrder.forEach(monster => {
        if(monster == playerMonster){
            playerMonster.attacking = true;
            queue.push(() => {
                playerMonster.attack({
                    attack: selectedAttack,
                    renderedSprites
                })
            },
            () => {
                faintCheck(enemyMonster);
            })
        } else {
            playerMonster.attacking = false;
            queue.push(() => {
                enemyMonster.attack({
                    attack: enemyMonster.attacks[ranAtk],
                    renderedSprites
                })
            },
            () => {
                faintCheck(playerMonster);
            }) 
        }
    })

    if(!player.otherAction){
        queue[0]()
        queue.shift()
    }    
}

function endBattle(message){
    endQueue.push(() => {
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                window.cancelAnimationFrame(battleAnimationID);
                animate();
                document.querySelector('#userInterface').style.display = 'none'
    
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                })
                c.translate(canvasMove.x, canvasMove.y);
                battleBackground.opacity = 0;   
                battle.initiated = false;
                audio.Map.play();
            }
        })
    })

    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = message;
}

function faintCheck(target){
    if(target.stats.hp <= 0){
        player.monsterFainted = true;
        endQueue.push(() => {target.faint()})
        document.querySelector('#dialogueBox').innerHTML = 
                `${target.name} took ${target.damage} points of damage,
                they have no more HP left.`
    } else {
        document.querySelector('#dialogueBox').innerHTML = 
        `${target.name} took ${target.damage} points of damage!`
        if(queue.length == 1){
            battleOptions();
        }
    }
}

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(endQueue.length > 0){
        endQueue[0]()
        endQueue.shift()
    } else if (queue.length > 0){
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})