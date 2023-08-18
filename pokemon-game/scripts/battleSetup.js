const battleBackgroundImage = new Image();
battleBackgroundImage.src = "/pokemon-game/img/battleBackground.png";
let dialogBackground = document.querySelector("#dialogBackground")


// let tempFriendship;
// let tempAtk;
// let tempDef;

const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage,
    opacity: 1
});

let enemyMonster;
let playerMonster;
let renderedSprites;
let battleAnimationID;


function initBattle() {
    dialogBackground.style.display = "flex";
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
    document.querySelector('#playerHealthBar').style.width = healthPercentage;
    document.querySelector('#hpText').innerHTML = healthText;
    document.querySelector('#playerName').innerHTML = player.team.roster[0].name;
    document.querySelector('#attacksBox').replaceChildren();

    // const encounters = ["Wyvy", "Slime"];

    let ranChance = Math.floor(Math.random() * (100 + 1));

    if(ranChance > 30){
        enemyMonster = new Monster(monsters.Slime);
    } else {
        enemyMonster = new Monster(monsters.Wyvy);
    }
    enemyMonster.position =  {
        x: 800,
        y: 100
    }
    enemyMonster.isEnemy = true;
    // enemyMonster.image = enemyMonster.sprites.frontImage;
    document.querySelector('#enemyName').innerHTML = enemyMonster.name;
    playerMonster = player.team.roster[0];
    renderedSprites = [enemyMonster, playerMonster];
    playerActions = ["Fight", "Use Item", "Befriend", "Flee"];
    queue = [];
    endQueue = [];
    tempFriendship = enemyMonster.stats.friend;

    battleOptions();
}