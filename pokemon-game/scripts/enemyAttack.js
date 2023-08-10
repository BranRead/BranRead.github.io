// Enemy attacks right here
function enemyAttack(){
    player.monsterAttack = true;
    clearDialog();
    const ranAtk = 
    enemyMonster.attacks[Math.floor(Math.random() * enemyMonster.attacks.length)]
    
    queue.push(() => {
    enemyMonster.attack({
        attack: ranAtk,
        user: enemyMonster,
        recipient: playerMonster,
        renderedSprites
    })
    
    if (playerMonster.stats.hp <= 0) {
        queue.push(() => {
            playerMonster.faint()
        })

        queue.push(() => {
            endBattle(`${player.team.roster[0].name} died...`);
        })
    }
    battleOptions();
    })
}
