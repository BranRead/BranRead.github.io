const debug = {
    noClip: false,

    killEnemy: () => {
        battleSetup.enemyMonster.stats.hp = 10;
    },
    
    killPlayer: () => {
        battleSetup.playerMonster.stats.hp = 10;
    },
    
    healPlayer: () => {
        gameLogic.player.team.roster.forEach((monster) => {
            monster.stats.hp = monster.stats.maxHP;
        })
    },

    startBattle: () => {
        //deactivate existing animation loop
        window.cancelAnimationFrame(gameLogic.animationID);
        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()
        gameLogic.battle.initiated = true
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
                        gameLogic.gameMap.battleBackgroundSprite.opacity = 1
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                })       
            }
        })
    },

    travel: () => {
        debug.noClip = !debug.noClip;
        if(debug.noClip){
            console.log("No clip is turned on.")
        } else {
            console.log("No clip is turned off.")

        }
    },

    addPotion: (num) => {
        const healthPotionTest = new Item (itemsGhasblr.HealthPotion);
        healthPotionTest.quantity = num;
       
        gameLogic.player.inventory.pickUp(healthPotionTest);
        
        console.log(num + " healing potion(s) added to inventory")
    }

}

document.addEventListener("click", (e) => {
    console.log(e.clientX);
    console.log(e.clientY);
})
