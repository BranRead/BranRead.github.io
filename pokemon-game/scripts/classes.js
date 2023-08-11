class Sprite {
    constructor({ 
        position, 
        image, 
        frames = { max: 1, hold: 10 }, 
        sprites, 
        animate, 
        rotation = 0,
        
    }) {
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.image.src = image.src
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        
        this.rotation = rotation
    }

    draw() {
        c.save()
        c.translate(
            this.position.x + this.width / 2, 
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width / 2, 
            -this.position.y - this.height / 2
        )
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max, 
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );
        c.restore()
        
        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0  
            }
    }
};

class Monster extends Sprite {
    constructor({ 
        position, 
        image, 
        icon,
        frames = { max: 1, hold: 10 }, 
        sprites, 
        animate, 
        rotation = 0,
        isEnemy = false, 
        name, 
        attacks,
        stats = {
            hp: 100,
            maxHP: 100,
            atk: 10,
            tempAtk: 0,
            def: 10,
            tempDef: 0,
            magAtk: 10,
            tempMagAtk: 0,
            magDef: 10,
            tempMagDef: 0,
            spd: 10,
            tempSpd: 0,
            friend: 10,
            tempFriend: 0,
            level: 1,
            currentEXP: 0,
            toNextLevelEXP: 10
        }
    }) {
        super({
            position, 
            image, 
            frames, 
            sprites, 
            animate, 
            rotation,
        })
        this.icon = icon;
        this.stats = stats
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }
    faint() {
        audio.victory.play();
        audio.battle.stop();
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })

        renderedSprites = []
        battleBackground.opacity = 0;
    }

    attack({attack, user, recipient, renderedSprites}) {
        let hit = true;
        if(hit && player.monsterAttack){
            let ranNum = (Math.random() * (1 - 0.75 + 1) + 0.75);
            let trueDamage = Math.floor((((user.stats.atk + user.stats.tempAtk) / (recipient.stats.def + user.stats.tempDef)) * attack.damage) * ranNum)
            document.querySelector('#dialogueBox').style.display = 'block'
            document.querySelector('#dialogueBox').innerHTML = 
                `${user.name} used ${attack.name}! ${recipient.name} took ${trueDamage} points of damage.`
    
                let healthBar;
                let rotation;
                recipient.stats.hp -= trueDamage;
    
                if (this.isEnemy) {
                    healthBar = '#playerHealthBar'
                    rotation = 4
                } else {
                    healthBar = '#enemyHealthBar'
                    rotation = 1
                }

            switch(attack.name) {
                //Switch statement for animations
                case 'Fireball':
                audio.initFireball.play()
                const fireballImage = new Image();
                fireballImage.src="/pokemon-game/img/fireball.png"
    
                    const fireball = new Sprite({
                        position: {
                            x: this.position.x,
                            y: this.position.y
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
                        x: recipient.position.x,
                        y: recipient.position.y,
                        onComplete: () => {
                            //Enemy actually gets hit
                            audio.fireballHit.play()
                            renderedSprites.splice(1, 1)
                            gsap.to(healthBar, {
                                width: recipient.stats.hp + '%'
                            })
                            gsap.to(recipient.position, {
                                x: recipient.position.x + 10,
                                yoyo: true,
                                repeat: 5,
                                duration: 0.08,
                            })
                            gsap.to(recipient, {
                                opacity: 0,
                                repeat: 5,
                                yoyo: true,
                                duration: 0.08
                            })
                            if(recipient == playerMonster){
                                let healthText = `${playerMonster.stats.hp}/${playerMonster.stats.maxHP}`;
                                document.querySelector("#hpText").innerHTML = healthText
                            }
                            
                        }
                    })
    
                break
                case 'Tackle':
    
                    const tl = gsap.timeline()
    
                    
            let movementDistance = 20
            if (this.isEnemy) movementDistance = -20
                    tl.to(this.position, {
                        x: this.position.x - movementDistance
                    })
                        .to(this.position, {
                        x: this.position.x + movementDistance * 2,
                        duration: 0.1,
                        onComplete: () => {
                            //Enemy actually gets hit
                            audio.tackleHit.play()
                            gsap.to(healthBar, {
                                width: recipient.stats.hp + '%'
                            })
                            gsap.to(recipient.position, {
                                x: recipient.position.x + 10,
                                yoyo: true,
                                repeat: 5,
                                duration: 0.08,
                            })
                            gsap.to(recipient, {
                                opacity: 0,
                                repeat: 5,
                                yoyo: true,
                                duration: 0.08
                            })
                        }
                    })
                        .to(this.position, {
                        x: this.position.x
                    })
                break
            }
        } else if (hit && !player.monsterAttack) {
            document.querySelector('#dialogueBox').style.display = 'block'
            document.querySelector('#dialogueBox').innerHTML = 
                `${user.name} used ${attack.name}! ${recipient.name} took ${attack.damage} points of damage.`
    
                let healthBar;
                let rotation;
    
                if (this.isEnemy) {
                    healthBar = '#playerHealthBar'
                    rotation = 4
                } else {
                    healthBar = '#enemyHealthBar'
                    rotation = 1
                }
    
            
            recipient.stats.hp -= attack.damage;
            
            //////////////////////////////
            //Fix animation
            //////////////////////////////
            gsap.to(healthBar, {
                width: recipient.stats.hp + '%'
            })
        }
        
        
    }
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
};