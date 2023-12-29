class Inventory {
    constructor({
        items = [],
        capacity
    }){
        this.items = items;
        this.capacity = capacity;
    }

    openInventory(){
        const image = new Image();
        image.src = "/pokemon-game/img/inventory/itemSpritesheet.png";

        const cvsRestore = document.getElementById("restore");
        const ctxRestore = cvsRestore.getContext("2d");
        ctxRestore.drawImage(image, 32, 256, 32, 32, 0, 0, 32, 32);

        const cvsStatBoost = document.getElementById("statBoost");
        const ctxStatBoost = cvsStatBoost.getContext("2d");
        ctxStatBoost.drawImage(image, 352, 32, 32, 32, 0, 0, 32, 32);


        const cvsFood = document.getElementById("food");
        const ctxFood = cvsFood.getContext("2d");
        ctxFood.drawImage(image, 320, 384, 32, 32, 0, 0, 32, 32);


        const cvsValuables = document.getElementById("valuables");
        const ctxValuables = cvsValuables.getContext("2d");
        ctxValuables.drawImage(image, 96, 352, 32, 32, 0, 0, 32, 32);


        const cvsKeyItems = document.getElementById("keyItems");
        const ctxKeyItems = cvsKeyItems.getContext("2d");
        ctxKeyItems.drawImage(image, 448, 64, 32, 32, 0, 0, 32, 32);

        
        if(dialog.dialogBox.style.display != "none"){
            dialog.dialogBox.style.display = "none";
        }

        document.querySelector("#fullInventoryView").style.display = "block";
    }

    selection(btn){
        const itemIndex = btn.parentElement.parentElement.dataset.value;
        game.usingItem = true;
        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancelBtn";
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", () => {
            menu.close();
            menu.open();
            game.player.inventory.openInventory();
            game.usingItem = flase;
        })
        switch(game.player.inventory.items[itemIndex].useCategory){
            case 'restore':
                dialog.displayDialog("Who would you like to use it on?");
                dialog.dialogBox.append(cancelBtn);
                game.player.team.viewTeam(game.player.inventory.items[itemIndex], itemIndex);
                break;
        }
    }

    use(item, itemIndex, monsterIndex){
        let monster = game.player.team.roster[monsterIndex];
        console.log(item)
        game.player.otherAction = true;
        switch(item.useCategory){
            case 'restore':
                let healedFor;
                if(item.strength > (monster.stats.maxHP - 
                    monster.stats.hp)){
                    healedFor = monster.stats.maxHP - monster.stats.hp;
                    monster.stats.hp += healedFor;
                } else {
                    healedFor = item.strength;
                    monster.stats.hp += healedFor;
                }

                let health = monster.stats.hp / monster.stats.maxHP;
                health *= 100;

                if(!game.battle.initiated){
                    console.log(`Healing ${monster.name}!`);
                    dialog.displayDialog(`${monster.name} healed for ${healedFor} points of damage!`);
                    gsap.to(".playerHealthBar", {
                        width: health + "%",
                        onComplete: () => {
                            let healthText = `HP: ${monster.stats.hp}/${monster.stats.maxHP}`
                            document.querySelector(".monsterHpText").innerHTML = healthText;
                            battleSetup.endQueue.push(() => {
                                menu.close();
                                menu.open();
                                game.player.inventory.openInventory();
                                inventoryMenu.display(item.useCategory);
                                game.usingItem = false;
                                game.player.team.viewTeam();
                            })
                        }
                    })
                } else if (game.battle.initiated){
                    menu.close();
                    gsap.to(".playerHealthBarBattle", {
                        width: health + "%",
                        onComplete: () => {
                            let healthText = `${monster.stats.hp}/${monster.stats.maxHP}`
                            document.querySelector("#hpText").innerHTML = healthText;
                            dialog.displayDialog(`${monster.name} healed for ${healedFor} points of damage!`);
                            battleSetup.queue.push(() => {
                                dialog.dialogBox.style.display = "block";
                                battleFunctions.startTurn();
                            })
                        }
                    })
                }
                
                // if(player.inBattle) {
                //     let healthBar = '#playerHealthBar';
                //     gsap.to(healthBar, {
                //         width: player.team.roster[monsterIndex].stats.hp + '%'
                //     })
                //     player.otherAction = true;
                //     queue.push(() => {
                //         startTurn();
                //     })
                // }
                break;
            case "flee":
                if(game.player.inBattle) {
                    battleFunctions.endBattle();
                } else {
                    //Will add dialog to say "Can't use this here!"
                }
                break;
            case "tempStatBoost":
                if(game.initBattle) {
                    switch(item.boost.stat){
                        case "atk":
                            battleSetup.playerMonster.stats.tempAtk += item.boost.amount;
                            dialog.displayDialog(`${battleSetup.playerMonster.name}'s attack rose!`); 
                            break;
                        case "def": 
                            battleSetup.playerMonster.stats.tempDef += item.boost.amount;
                            dialog.displayDialog(`${battleSetup.playerMonster.name}'s defense rose!`);
                            break;
                    }
                    player.otherAction = true;
                    battleSetup.queue.push(() => {
                        battleFunctions.startTurn();
                    })
                } else {
                    dialog.displayDialog("You can't use this outside of battle!");
                }
                break;
        }
        game.player.inventory.items[itemIndex].quantity--;

        if((game.player.inventory.items[itemIndex].quantity) < 1){
            game.player.inventory.items.splice(itemIndex, 1);
        }
    }

    trash(btn){
        // console.log("Item trashed!");
        const itemIndex = btn.parentElement.parentElement.dataset.value;
        const useCategory = game.player.inventory.items[itemIndex].useCategory;
        dialog.displayDialog(`${game.player.inventory.items[itemIndex].name} was dropped.`)
        
        battleSetup.queue.push(() => {
            game.player.inventory.items.splice(itemIndex, 1);
            menu.close();
            menu.open();
            game.player.inventory.openInventory();
            inventoryMenu.display(useCategory);
        })
    }

    pickUp(item){
        let isPresentInInventory = false;
        gameLogic.player.inventory.items.forEach(playerItem => {
            if(playerItem.name == item.name){
                playerItem.quantity += item.quantity
                isPresentInInventory = true;
            }
        })

        if(!isPresentInInventory){
            gameLogic.player.inventory.items.push(item);
        }
    }
}