class Inventory {
    constructor({
        items = [],
        capacity
    }){
        this.items = items;
        this.capacity = capacity;
    }

    openInventory(){
        let playerTeamIndex = 0;
        if(!player.inventoryWindow) {
            document.querySelectorAll(".menu-item").forEach(item => {
                item.style.display = "none";
            })
            backBtn.style.display = "block";

            document.querySelector("#menu-title").innerHTML = "Inventory";
            player.inventoryWindow = true;

        
            player.inventory.items.forEach((item, index) => {
                const inventoryBtnWrapper = document.createElement('div');
                const inventoryBtn = document.createElement('button');
                const inventoryQuantity = document.createElement('p');
                inventoryBtn.className = "newBtn"
                inventoryBtn.value = index;
                inventoryBtn.innerHTML = item.name
                inventoryQuantity.innerHTML = `x${item.quantity}`;
                inventoryQuantity.style.marginTop = "auto";
                inventoryQuantity.style.marginBottom = "auto";
                inventoryBtnWrapper.append(inventoryBtn);
                inventoryBtnWrapper.append(inventoryQuantity);
                inventoryBtnWrapper.className = "toRemove";
                inventoryBtnWrapper.style.display = 'flex';
                inventoryBtnWrapper.style.flexDirection = 'row';
                inventoryBtnWrapper.style.fontSize = '10px';

                document.querySelector('#menu-options').append(inventoryBtnWrapper)
            })

            document.querySelectorAll(".newBtn").forEach(button => {
                button.addEventListener('click', () => {
                    let playerInventoryIndex = button.value;
                    if(isNaN(playerInventoryIndex)){
                        console.log("Not a number");
                    }
                    
                    closeMenu();
                    player.inventory.use(playerTeamIndex, playerInventoryIndex);
                })
            })
        }
    }

    use(monsterIndex, itemIndex){
        
        switch(player.inventory.items[itemIndex].useCategory){
            case 'healing':
                let healedFor;
                if(player.inventory.items[itemIndex].strength > (100 - player.team.roster[monsterIndex].stats.hp)){
                    healedFor = 100 - player.team.roster[monsterIndex].stats.hp;
                    player.team.roster[monsterIndex].stats.hp += healedFor;
                } else {
                    healedFor = player.inventory.items[itemIndex].strength;
                    player.team.roster[monsterIndex].stats.hp += healedFor;
                }

                let healthText = `${player.team.roster[monsterIndex].stats.hp}/${player.team.roster[monsterIndex].stats.maxHP}`
                document.querySelector("#hpText").innerHTML = healthText;
                player.menuDisplayed = false;
                closeMenu();
                document.querySelector('#dialogueBox').style.display = 'block'
                document.querySelector('#dialogueBox').innerHTML = 
                `${player.team.roster[monsterIndex].name} healed ${healedFor} points of damage!`
                
                if(player.inBattle) {
                    let healthBar = '#playerHealthBar';
                    gsap.to(healthBar, {
                        width: player.team.roster[monsterIndex].stats.hp + '%'
                    })
                    player.otherAction = true;
                    startBattle();
                }
                break;
                case "flee":
                    if(player.inBattle) {
                        endBattle();
                    } else {
                        //Will add dialog to say "Can't use this here!"
                    }
                    break;
                    //Modifying attack items, or removing
                // case "attack":
                //     if(initBattle) {
                //         let playerMonster = player.team.roster[0];
                //         player.useItem = true;
                //         let nameOfStaff = player.inventory.items[itemIndex];
                //         playerMonster.attack({
                //             attack: attacks[nameOfStaff],
                //             user: player,
                //             recipient: enemyMonster,
                //             renderedSprites
                //         })
                //     } else {
                //         //Will add dialog to say "Can't use this here!"
                //     }
                //     break;
                case "stat boost":
                    if(initBattle) {
                        switch(player.inventory.items[itemIndex].boost.stat){
                            case "atk":
                                playerMonster.stats.tempAtk += player.inventory.items[itemIndex].boost.amount;
                                document.querySelector('#dialogueBox').style.display = 'block'
                                document.querySelector('#dialogueBox').innerHTML = 
                                `${playerMonster.name}'s attack rose!`
                                break;
                            case "def": 
                                playerMonster.stats.tempDef += player.inventory.items[itemIndex].boost.amount;
                                document.querySelector('#dialogueBox').style.display = 'block'
                                document.querySelector('#dialogueBox').innerHTML = 
                                `${playerMonster.name}'s defense rose!`
                                break;
                        }
                        player.otherAction = true;
                        startBattle();
                    }
                    break;
        }
        player.inventory.items[itemIndex].quantity--;
        console.log(player.inventory.items[itemIndex].quantity)

        if((player.inventory.items[itemIndex].quantity) < 1){
            player.inventory.items.splice(itemIndex, 1);
        }
    }
    

}