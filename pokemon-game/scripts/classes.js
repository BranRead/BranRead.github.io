class Rectangle {
    constructor({
        width, 
        height, 
        position
    }){
        this.width = width;
        this.height = height;
        this.position = position
    }

    drawRect(fillStyle = 'white'){
        c.fillStyle = fillStyle;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

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
        frontImage,
        backImage, 
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
        this.frontImage = frontImage
        this.backImage = backImage
    }

    drawMonster() {
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
        if(this.frontImage){
            c.drawImage(
                this.image, 
                0,
                this.frames.val * 86,
                this.image.width / this.frames.max, 
                this.image.height / this.frames.max,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height / this.frames.max
            );
        } else if(this.backImage){
            c.drawImage(
                this.image, 
                86,
                this.frames.val * 86,
                this.image.width / this.frames.max, 
                this.image.height / this.frames.max,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height / this.frames.max
            );
        }
       
        c.restore()
        
        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed ++
        }

        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0  
            }
    }

    faint() {
        let message; 
        
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        if(this == playerMonster){
            message =  `${this.name} can't fight any longer!`
            gsap.to(enemyMonster, {
                opacity: 0
            })
        } else if (this == enemyMonster){
            audio.victory.play();
            message = `${this.name} was defeated!`;
            gsap.to(playerMonster, {
                opacity: 0
            })
        }
        audio.battle.stop();
        endQueue.push(endBattle(message))
    }

    attack({attack, renderedSprites}) {
        clearDialog();
        let hit = true;
        if(hit && this == playerMonster){
            let ranNum = (Math.random() * (1 - 0.75 + 1) + 0.75);
            let trueDamage = Math.floor((((playerMonster.stats.atk + playerMonster.stats.tempAtk) / (enemyMonster.stats.def + enemyMonster.stats.tempDef)) * attack.damage) * ranNum)
            
    
                let healthBar;
                let rotation;
                enemyMonster.stats.hp -= trueDamage;
                enemyMonster.damage = trueDamage;
                healthBar = '#enemyHealthBar'
                rotation = 1

                animateAttack(attack, playerMonster, enemyMonster, renderedSprites, healthBar, rotation);
                
                document.querySelector('#dialogueBox').style.display = 'block'
                document.querySelector('#dialogueBox').innerHTML = 
                `${playerMonster.name} used ${attack.name}!`
           
        } else if (hit && this == enemyMonster) {
            let ranNum = (Math.random() * (1 - 0.75 + 1) + 0.75);
            let trueDamage = Math.floor((((playerMonster.stats.atk + playerMonster.stats.tempAtk) / (enemyMonster.stats.def + enemyMonster.stats.tempDef)) * attack.damage) * ranNum)
            
    
            let healthBar;
            let rotation;
            playerMonster.stats.hp -= trueDamage;
            playerMonster.damage = trueDamage;
            healthBar = '#playerHealthBar'
            rotation = 4

            animateAttack(attack, enemyMonster, playerMonster, renderedSprites, healthBar, rotation);
            
            document.querySelector('#dialogueBox').style.display = 'block'
            document.querySelector('#dialogueBox').innerHTML = 
            `${enemyMonster.name} used ${attack.name}!`  
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