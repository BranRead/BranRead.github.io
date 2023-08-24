const battleMenu = {
    battleOptions: () => {
        const attackBtn = document.querySelectorAll('.attackOptions');
        const commandBtn = document.querySelectorAll('.battleCommands');
        attackBtn.forEach(button => {
            button.remove();
        })
        commandBtn.forEach(button => {
            button.remove();
        })
        battleSetup.playerBattleActions.forEach(option => {
            const button = document.createElement("button");
            button.className = "battleCommands";
            button.innerHTML = option;
            button.addEventListener('click', (e) => {
                const selection = e.currentTarget.innerHTML;
                switch (selection){
                    case "Fight":
                        battleMenu.fight();
                        break;
                    case "Use Item":
                        openMenu();
                        break;
                    case "Befriend":
                        battleMenu.befriend();
                        break;
                    case "Flee":
                        battleMenu.flee();
                        break;
                    default: 
                        console.log("Something went wrong!");
                }
            })
            document.querySelector('#attacksBox').append(button);
        })
    },
    
    fight: () => {
        dialogue.clearDialog();
        player.otherAction = false;
        document.querySelector("#goBack").style.display = "block";
        //Adds attack buttons in
        battleSetup.playerMonster.attacks.forEach(attack => {
            const button = document.createElement('button');
            button.innerHTML = attack.name;
            button.className = 'attackOptions';
            document.querySelector('#attacksBox').append(button);
        });
        //Our event listeners for buttons
        document.querySelectorAll('.attackOptions').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            playerMonster.attacking = true; 
            player.otherAction = false;
            battleFunctions.startTurn(selectedAttack);
        })
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            document.querySelector('#attackType').innerHTML = selectedAttack.type;
            document.querySelector('#attackType').style.color = selectedAttack.color;
        })
        });
    },
    
    befriend: ()=> {
        dialogue.displayDialogue(`${battleSetup.enemyMonster.name} started to trust you a bit more!`);
        battleSetup.enemyMonster.stats.tempFriend += player.monsterFriend;
        if((battleSetup.enemyMonster.stats.tempFriend) < 50) {
            queue.push(() => {
                player.otherAction = true;
                battleFunctions.startTurn();
            })
        } else {
            queue.push(() => {
                player.team.roster.push(enemyMonster);
                player.team.roster[player.team.roster.length - 1].isEnemy = false;
                player.team.roster[player.team.roster.length - 1].position =  {
                    x: 280,
                    y: 325
                };
                player.team.roster[player.team.roster.length - 1].backImage = true;
                player.team.roster[player.team.roster.length - 1].frontImage = false;
                player.team.roster[player.team.roster.length - 1].stats.friend =
                 enemyMonster.stats.tempFriend;
                battleFunctions.endBattle(`${enemyMonster.name} has decided to join your party!`);
            })
        }
    },
    
    flee: () => {
        let fleeCheck = Math.floor(Math.random() * (100) + 1);
        fleeCheck -= (battleSetup.enemyMonster.stats.spd) / 4;
        fleeCheck += (battleSetup.playerMonster.stats.spd) / 4;
        if(fleeCheck > fleeChance) {
            battleFunctions.endBattle(`${playerMonster.name} fled`);
        } else {
            player.otherAction = true;
            queue.push(() => {
                battleFunctions.startTurn();
            });
            dialogue.displayDialogue(`${playerMonster.name} couldn't get away...`);
        };
    },
}
