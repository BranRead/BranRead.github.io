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
        type,
        name, 
        attacks,
        about,
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
        this.type = type;
        this.icon = icon;
        this.stats = stats
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
        this.about = about
        this.frontImage = frontImage
        this.backImage = backImage
    }

    drawMonster(context) {
        context.save()
        context.translate(
            this.position.x + this.width / 2, 
            this.position.y + this.height / 2
        )
        context.rotate(this.rotation)
        context.translate(
            -this.position.x - this.width / 2, 
            -this.position.y - this.height / 2
        )
        context.globalAlpha = this.opacity
        if(this.frontImage){
            context.drawImage(
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
            context.drawImage(
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
       
        context.restore()
        
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
        if(this == battleSetup.playerMonster){
            message =  `${this.name} can't fight any longer!`
            gsap.to(battleSetup.enemyMonster, {
                opacity: 0
            })
        } else if (this == battleSetup.enemyMonster){
            audio.victory.play();
            message = `${this.name} was defeated!`;
            gsap.to(battleSetup.playerMonster, {
                opacity: 0
            })
        }
        audio.battle.stop();
        battleSetup.endQueue.push(battleFunctions.endBattle(message))
    }

    attack({attack}) {
        dialogue.clearDialog();
        let hit = true;
        if(hit && this == battleSetup.playerMonster){
            let ranNum = (Math.random() * (1 - 0.75 + 1) + 0.75);
            let trueDamage = Math.floor((((battleSetup.playerMonster.stats.atk +
                 battleSetup.playerMonster.stats.tempAtk) / 
                 (battleSetup.enemyMonster.stats.def + battleSetup.enemyMonster.stats.tempDef)) *
                attack.damage) * ranNum)
            
            let healthBar;
            let rotation;
            battleSetup.enemyMonster.stats.hp -= trueDamage;
            battleSetup.enemyMonster.damage = trueDamage;
            healthBar = '#enemyHealthBar'
            rotation = 1

            battleFunctions.animateAttack(attack, battleSetup.playerMonster, battleSetup.enemyMonster, battleSetup.renderedAttacks, healthBar, rotation);
            dialogue.displayDialogue(`${battleSetup.playerMonster.name} used ${attack.name}!`); 
        } else if (hit && this == battleSetup.enemyMonster) {
            let ranNum = (Math.random() * (1 - 0.75 + 1) + 0.75);
            let trueDamage = Math.floor((((battleSetup.playerMonster.stats.atk +
                 battleSetup.playerMonster.stats.tempAtk) / 
                 (battleSetup.enemyMonster.stats.def + battleSetup.enemyMonster.stats.tempDef)) * 
                 attack.damage) * ranNum)
            
            let healthBar;
            let rotation;
            if (trueDamage > battleSetup.playerMonster.stats.hp) {
                battleSetup.playerMonster.stats.hp = 0;
            } else {
                battleSetup.playerMonster.stats.hp -= trueDamage;
            }
            
            //Gotta look into this, not sure why it's here
            battleSetup.playerMonster.damage = trueDamage;
            healthBar = '.playerHealthBarBattle'
            rotation = 4

            battleFunctions.animateAttack(attack, battleSetup.enemyMonster, battleSetup.playerMonster, battleSetup.renderedAttacks, healthBar, rotation);
            dialogue.displayDialogue(`${battleSetup.enemyMonster.name} used ${attack.name}!`  ); 
        } 
    }  
}