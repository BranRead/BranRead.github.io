const battleMenu = {
    goBackBtn: document.querySelector("#goBack"),
    typeDisplay: document.querySelector("#attackTypeBox"),
    
    clearButtons: (cssSelector) => {
        const buttons = document.querySelectorAll(cssSelector);
        buttons.forEach(button => {
            button.remove();
        })
    },
    
    battleOptions: () => {
        if(battleSetup.combatBox.style.display === "none"){
            battleSetup.combatBox.style.display = "flex"
        }

        if(battleMenu.goBackBtn.style.display != "none"){
            battleMenu.goBackBtn.style.display = "none";
        }

        if(battleMenu.typeDisplay.style.display != "none"){
            battleMenu.typeDisplay.style.display = "none"
        }

        if(dialog.dialogBox.style.display != "none"){
            dialog.dialogBox.style.display = "none";
        }

        battleMenu.clearButtons('.attackOptions');
        battleMenu.clearButtons('.battleCommands');
    
        const userChoiceBtns = document.querySelectorAll(".combatBtn");
        const userCombatOptions = [
            () => {
                battleMenu.fight();
            }, 
            () => {
                menu.open();
                gameLogic.player.inventory.openInventory();
            }, 
            () => {
                battleMenu.befriend();
            }, 
            () => {
                battleMenu.flee();
            } 
        ]

        battleSetup.playerBattleActions.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "battleCommands";
            button.textContent = option;
            button.addEventListener('click', () => {
               userCombatOptions[index]();
            })
            
            userChoiceBtns[index].append(button);
        })
    },
    
    fight: () => {
        battleMenu.clearButtons(".battleCommands");
        gameLogic.player.otherAction = false;
        battleMenu.goBackBtn.style.display = "flex";
        battleMenu.goBackBtn.addEventListener("click", () => {
            battleMenu.battleOptions();
        })
        const attackBtns = document.querySelectorAll(".combatBtn");
        //Adds attack buttons in
        battleSetup.playerMonster.attacks.forEach((attack, index) => {
            const button = document.createElement('button');
            button.textContent = attack.name;
            button.className = 'attackOptions';
            attackBtns[index].append(button);
        });
        //Our event listeners for buttons
        document.querySelectorAll('.attackOptions').forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            battleSetup.playerMonster.attacking = true; 
            gameLogic.player.otherAction = false;
            battleFunctions.startTurn(selectedAttack);
        })
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
            battleSetup.attackTypeText.textContent = selectedAttack.type;
            battleSetup.attackTypeText.style.color = selectedAttack.color;
        })
        });
        battleSetup.attackTypeBox.style.display = "flex";
    },
    
    befriend: ()=> {
        dialog.displayDialog(`${battleSetup.enemyMonster.name} started to trust you a bit more!`);
        battleSetup.enemyMonster.stats.tempFriend += gameLogic.player.monsterFriend;
        if((battleSetup.enemyMonster.stats.tempFriend) < 50) {
            battleSetup.queue.push(() => {
                gameLogic.player.otherAction = true;
                battleFunctions.startTurn();
            })
        } else {
            battleSetup.queue.push(() => {
                gameLogic.player.team.roster.push(battleSetup.enemyMonster);
                gameLogic.player.team.roster[gameLogic.player.team.roster.length - 1].isEnemy = false;
                gameLogic.player.team.roster[gameLogic.player.team.roster.length - 1].position =  {
                    x: 280,
                    y: 325
                };
                gameLogic.player.team.roster[gameLogic.player.team.roster.length - 1].backImage = true;
                gameLogic.player.team.roster[gameLogic.player.team.roster.length - 1].frontImage = false;
                gameLogic.player.team.roster[gameLogic.player.team.roster.length - 1].stats.friend =
                battleSetup.enemyMonster.stats.tempFriend;
                battleFunctions.endBattle(`${battleSetup.enemyMonster.name} has decided to join your party!`);
            })
        }
    },
    
    flee: () => {
        let fleeCheck = Math.floor(Math.random() * (100) + 1);
        fleeCheck -= (battleSetup.enemyMonster.stats.spd) / 4;
        fleeCheck += (battleSetup.playerMonster.stats.spd) / 4;
        if(fleeCheck > gameLogic.fleeChance) {
            battleFunctions.endBattle(`${battleSetup.playerMonster.name} fled`);
        } else {
            gameLogic.player.otherAction = true;
            battleSetup.queue.push(() => {
                battleFunctions.startTurn();
            });
            dialog.displayDialog(`${battleSetup.playerMonster.name} couldn't get away...`);
        };
    },
}
