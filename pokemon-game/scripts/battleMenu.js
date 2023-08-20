//Always need to show textbox with text to start animation
let befriendMag = 15;

function battleOptions(){
    const attackBtn = document.querySelectorAll('.attackOptions');
    const commandBtn = document.querySelectorAll('.battleCommands');
    attackBtn.forEach(button => {
        button.remove();
    })
    commandBtn.forEach(button => {
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

function fight(){
    
    clearDialog();
    playerRightImage.otherAction = false;
    document.querySelector("#goBack").style.display = "block";
    //Adds attack buttons in
    playerMonster.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        button.className = 'attackOptions'
        document.querySelector('#attacksBox').append(button)
    });

    //Our event listeners for buttons
    document.querySelectorAll('.attackOptions').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
        playerMonster.attacking = true; 
        player.otherAction = false;
        startTurn(selectedAttack);
    })
    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[(e.currentTarget.innerHTML).replace(/\s/g, '')];
        document.querySelector('#attackType').innerHTML = selectedAttack.type;
        document.querySelector('#attackType').style.color = selectedAttack.color;
    })
    });
}

function openMenu(){
    if(!player.menuDisplayed) {
        if (document.querySelector(".menu-item").style.display == "none"){
            document.querySelectorAll(".menu-item").forEach(item => {
                item.style.display = "block";
            })
            document.querySelector("#menu-title").innerHTML = "Menu";
        }
        if(backBtn.style.display == "block"){
            backBtn.style.display = "none";
        }
        player.menuDisplayed = true;
        document.getElementById("overlappingDiv").style.display = "block";
        document.getElementById("overlappingDiv").style.opacity = ".8";
        document.getElementById("menu").style.display = "flex";
        document.getElementById("menu-options").style.display = "flex";
    } 
}

function closeMenu(){
    document.getElementById("overlappingDiv").style.display = "none";
    document.getElementById("overlappingDiv").style.opacity = "0";
    document.getElementById("menu").style.display = "none";
    document.getElementById("menu-options").style.display = "none";
    
    //Removes buttons so inventory doesn't populate multiple instances
    const toRemove = document.querySelectorAll('.toRemove');
    toRemove.forEach(item => {
    item.remove();
    })
    player.menuDisplayed = false;
    player.teamWindow = false;
    player.inventoryWindow = false;
}

function befriend(){
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = `${enemyMonster.name} started to trust you a bit more!`;
    enemyMonster.stats.tempFriend += befriendMag;

    if((enemyMonster.stats.friend + enemyMonster.stats.tempFriend) < 50) {
        queue.push(() => {
            player.otherAction = true;
            startTurn();
        })
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

function flee() {
    let fleeChance = Math.floor(Math.random() * (100) + 1);
    fleeChance -= (enemyMonster.stats.spd) / 4;
    fleeChance += (playerMonster.stats.spd) / 4;
    
    if(fleeChance > 50) {
        endBattle(`${playerMonster.name} fled`);
    } else {
        player.otherAction = true;
        queue.push(() => {
            startTurn()
        });
        document.querySelector('#dialogueBox').style.display = 'block';
        document.querySelector('#dialogueBox').innerHTML = `${playerMonster.name} couldn't get away...`;
    }
    
}