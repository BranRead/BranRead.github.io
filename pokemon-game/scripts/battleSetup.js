const battleSetup = {
    
    dialogBackground: document.querySelector("#dialogBackground"),
    enemyMonster: "",
    playerMonster: "",
    tempFriendship: 0,
    renderedMonsters: [],
    renderedAttacks: [],
    queue: [],
    endQueue: [],
    playerBattleActions: ["Fight", "Use Item", "Befriend", "Flee"],
    battleAnimationID: 0,
    
    initBattle: () => {
        battleSetup.dialogBackground.style.display = "flex";
        player.inBattle = true;
        c.translate(-canvasMove.x, -canvasMove.y);
        document.querySelector('#userInterface').style.display = 'block';
        document.querySelector('#dialogueBox').style.display = 'none';
        document.querySelector('#enemyHealthBar').style.width = '100%';
        
        let health = player.team.roster[0].stats.hp / player.team.roster[0].stats.maxHP;
        let healthText = `${player.team.roster[0].stats.hp}/${player.team.roster[0].stats.maxHP}`;
        health *= 100;
        let roundedHealth = Math.ceil(health);
        let healthPercentage = roundedHealth + "%";
        document.querySelector('.playerHealthBar').style.width = healthPercentage;
        document.querySelector('#hpText').innerHTML = healthText;
    
        let exp = player.team.roster[0].stats.currentEXP / player.team.roster[0].stats.toNextLevelEXP;
        exp *= 100;
        let expPercentage = exp + "%"
        document.querySelector("#playerEXPBarBattle").style.width = expPercentage;
        
        document.querySelector('#playerName').innerHTML = player.team.roster[0].name;
        document.querySelector('#attacksBox').replaceChildren();
    
        const encounters = [monsters.Draggle, monsters.Axy, monsters.Bambo, monsters.Boscis, monsters.UnoUne, monsters.Cranio, monsters.Spookli];
    
        let ranIndex = Math.floor(Math.random() * (encounters.length));
    
        battleSetup.enemyMonster = new Monster(encounters[ranIndex])
        
        battleSetup.enemyMonster.position =  {
            x: 800,
            y: 100
        }
    
        battleSetup.enemyMonster.isEnemy = true;
        document.querySelector('#enemyName').innerHTML = battleSetup.enemyMonster.name;
        battleSetup.playerMonster = player.team.roster[0];
        battleSetup.playerMonster.position = {
            x: 280,
            y: 325
        }
        battleSetup.playerMonster.opacity = 1;
        battleSetup.renderedMonsters = [battleSetup.enemyMonster, battleSetup.playerMonster];
        
        battleSetup.tempFriendship = battleSetup.enemyMonster.stats.friend;
    
        battleMenu.battleOptions();
    }
    
}

