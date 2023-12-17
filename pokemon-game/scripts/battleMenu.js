const battleMenu = {
    battleOptions: () => {
        if(battleSetup.combatBox.style.display === "none"){
            battleSetup.combatBox.style.display = "flex"
        }
        
        const attackBtn = document.querySelectorAll('.attackOptions');
        const commandBtn = document.querySelectorAll('.battleCommands');
        attackBtn.forEach(button => {
            button.remove();
        })
        commandBtn.forEach(button => {
            button.remove();
        })
        const topRow = document.getElementById("topRow");
        const bottomRow = document.getElementById("bottomRow");

        battleSetup.playerBattleActions.forEach((option, index) => {
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
                        menu.open();
                        game.player.inventory.openInventory();
                        battleSetup.combatBox.style.display = "none";
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
            if(index < 2) {
                topRow.append(button);
            } else {
                bottomRow.append(button);
            }
            
        })
    },

    clearBattleOptions: () => {
        const attackBtns = document.querySelectorAll('.battleCommands');
        attackBtns.forEach(button => {
            button.remove();
        })
    },
    
    fight: () => {
        battleMenu.clearBattleOptions();
        game.player.otherAction = false;
        document.querySelector("#goBack").style.display = "block";
        //Adds attack buttons in
        battleSetup.playerMonster.attacks.forEach(attack => {
            const button = document.createElement('button');
            button.innerHTML = attack.name;
            button.className = 'attackOptions';
            battleSetup.userChoice.append(button);
        });
        //Our event listeners for buttons
        document.querySelectorAll('.attackOptions').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            battleSetup.playerMonster.attacking = true; 
            game.player.otherAction = false;
            battleFunctions.startTurn(selectedAttack);
        })
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            battleSetup.attackType.innerHTML = selectedAttack.type;
            battleSetup.attackType.style.color = selectedAttack.color;
        })
        });
        battleSetup.attackType.style.display = "flex";
    },
    
    befriend: ()=> {
        dialog.displayDialog(`${battleSetup.enemyMonster.name} started to trust you a bit more!`);
        battleSetup.enemyMonster.stats.tempFriend += game.player.monsterFriend;
        if((battleSetup.enemyMonster.stats.tempFriend) < 50) {
            battleSetup.queue.push(() => {
                game.player.otherAction = true;
                battleFunctions.startTurn();
            })
        } else {
            battleSetup.queue.push(() => {
                game.player.team.roster.push(battleSetup.enemyMonster);
                game.player.team.roster[game.player.team.roster.length - 1].isEnemy = false;
                game.player.team.roster[game.player.team.roster.length - 1].position =  {
                    x: 280,
                    y: 325
                };
                game.player.team.roster[game.player.team.roster.length - 1].backImage = true;
                game.player.team.roster[game.player.team.roster.length - 1].frontImage = false;
                game.player.team.roster[game.player.team.roster.length - 1].stats.friend =
                battleSetup.enemyMonster.stats.tempFriend;
                battleFunctions.endBattle(`${battleSetup.enemyMonster.name} has decided to join your party!`);
            })
        }
    },
    
    flee: () => {
        let fleeCheck = Math.floor(Math.random() * (100) + 1);
        fleeCheck -= (battleSetup.enemyMonster.stats.spd) / 4;
        fleeCheck += (battleSetup.playerMonster.stats.spd) / 4;
        if(fleeCheck > game.fleeChance) {
            battleFunctions.endBattle(`${battleSetup.playerMonster.name} fled`);
        } else {
            game.player.otherAction = true;
            battleSetup.queue.push(() => {
                battleFunctions.startTurn();
            });
            dialog.displayDialog(`${battleSetup.playerMonster.name} couldn't get away...`);
        };
    },
}
