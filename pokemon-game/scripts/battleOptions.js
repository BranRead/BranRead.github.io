//Always need to show textbox with text to start animation
let befriendMag = 15;

function battleOptions(){
    const buttonToRemove = document.querySelectorAll('.attackOptions');
    buttonToRemove.forEach(button => {
        button.remove();
    })
    playerActions.forEach(option => {
        const button = document.createElement("button");
        button.className = "battleCommands";
        button.innerHTML = option;
        button.addEventListener('click', (e) => {
            const selection = e.currentTarget.innerHTML;
            switch (selection){
                case "Fight":
                    player.monsterAttack = true;
                    fight();
                    break;
                case "Use Item":
                    openMenu();
                    break;
                case "Befriend":
                    befriend();
                    break;
                case "Flee":
                    flee();
                    break;
                default: 
                    console.log("Something went wrong!");
            }
        })
        document.querySelector('#attacksBox').append(button);
    })
}

function flee() {
    let fleeChance = Math.floor(Math.random() * (100) + 1);
    fleeChance -= (enemyMonster.stats.spd) / 4;
    fleeChance += (playerMonster.stats.spd) / 4;
    
    if(fleeChance > 40) {
        endBattle(`${playerMonster.name} fled`);
    } else {
        document.querySelector('#dialogueBox').style.display = 'block';
        document.querySelector('#dialogueBox').innerHTML = `${playerMonster.name} couldn't get away...`;
        enemyAttack();
    }
    
}

function befriend(){
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = `${enemyMonster.name} started to trust you a bit more!`;
    enemyMonster.stats.tempFriend += befriendMag;

    if((enemyMonster.stats.friend + enemyMonster.stats.tempFriend) < 50) {
        enemyAttack();
    } else {
        queue.push(() => {
            player.team.roster.push(enemyMonster);
            player.team.roster[player.team.roster.length - 1].isEnemy = false;
            player.team.roster[player.team.roster.length - 1].position =  {
                x: 280,
                y: 325
            }
            player.team.roster[player.team.roster.length - 1].image =
                player.team.roster[player.team.roster.length - 1].sprites.backImage;
            enemyMonster.stats.friend += enemyMonster.stats.tempFriend
            endBattle(`${enemyMonster.name} has decided to join your party!`);
            
        })
    }
}

function endBattle(message){
    player.inBattle = false;
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = message;
    audio.battle.stop();
    gsap.to(playerMonster, {
        opacity: 0
    })
    renderedSprites = []
    battleBackground.opacity = 0;
    c.translate(canvasMove.x, canvasMove.y);

    playerMonster.stats.tempAtk = 0;
    playerMonster.stats.tempDef = 0;

    enemyMonster.stats.tempAtk = 0;
    enemyMonster.stats.tempDef = 0;
    enemyMonster.stats.tempFriend = 0;

    queue.push(() => {
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                window.cancelAnimationFrame(battleAnimationID);
                animate();
                document.querySelector('#userInterface').style.display = 'none'
    
                gsap.to('#overlappingDiv', {
                    opacity: 0,
                })   
                battle.initiated = false;
                audio.Map.play();
            }
        })
    })
}