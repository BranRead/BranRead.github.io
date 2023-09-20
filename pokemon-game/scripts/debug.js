const debug = {
    killEnemy: () => {
        battleSetup.enemyMonster.stats.hp = 10;
    },
    
    killPlayer: () => {
        battleSetup.playerMonster.stats.hp = 10;
    },
    
    healPlayer: () => {
        game.player.team.roster.forEach((monster) => {
            monster.stats.hp = monster.stats.maxHP;
        })
    },

    startBattle: () => {
        //deactivate existing animation loop
        window.cancelAnimationFrame(game.animationID);
        audio.Map.stop()
        audio.initBattle.play()
        audio.battle.play()
        game.battle.initiated = true
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
                        game.battleBackground.opacity = 1
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                })       
            }
        })
    },

}
