function fight(){
    clearDialog();

    //Adds attack buttons in
    playerMonster.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        button.className = 'attackOptions'
        document.querySelector('#attacksBox').append(button)
    });

    //Our event listeners for buttons
    document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
        playerMonster.attack({ 
            attack: selectedAttack,
            user: player.team.roster[0], 
            recipient: enemyMonster,
            renderedSprites
        })

        if (enemyMonster.stats.hp <= 0) {
            queue.push(() => {
                enemyMonster.faint()
            })
            queue.push(() => {
               endBattle(`${enemyMonster.name} died.`);
            })


        } else {
            enemyAttack();
        }
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
        document.querySelector('#attackType').innerHTML = selectedAttack.type;
        document.querySelector('#attackType').style.color = selectedAttack.color;
    })
    });
}
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw();
    
    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none' 
})