const battleSetup = {
    battleBackgroundImage: new Image(),
    battleBackgroundImageSrc: "/pokemon-game/img/gameWorld/battleBackground.png",
    dialogBackground: document.querySelector("#dialogBackground"),
    playerEXP: document.querySelector(".playerEXPBar"),
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
        const battleBackground = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            image: battleSetup.battleBackgroundImage,
            opacity: 1
        })
        battleSetup.dialogBackground.style.display = "flex";
        player.inBattle = true;
        c.translate(-canvasMove.x, -canvasMove.y);
        document.querySelector('#userInterface').style.display = 'block';
        document.querySelector('#dialogueBox').style.display = 'none';
        document.querySelector('#enemyHealthBar').style.width = '100%';
        
        let health = player.team.roster[0].stats.hp / player.team.roster[0].stats.maxHP;
        let healthText = `${player.team.roster[0].stats.hp}/${player.team.roster[0].stats.maxHP}`;
        health *= 100;
        roundedHealth = Math.ceil(health);
        healthPercentage = roundedHealth + "%";
    
        let exp = player.team.roster[0].stats.currentEXP / player.team.roster[0].stats.toNextLevelEXP;
        exp *= 100;
        expPercentage = exp + "%"
        battleSetup.playerEXP.style.width = expPercentage;
        document.querySelector('.playerHealthBar').style.width = healthPercentage;
        document.querySelector('#hpText').innerHTML = healthText;
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
        battleSetup.renderedMonsters = [enemyMonster, playerMonster];
        
        battleSetup.tempFriendship = battleSetup.enemyMonster.stats.friend;
    
        battleOptions();
    }
    
}

