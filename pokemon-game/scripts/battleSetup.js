const battleBackgroundImage = new Image();
battleBackgroundImage.src = "/pokemon-game/img/gameWorld/battleBackground.png";
let dialogBackground = document.querySelector("#dialogBackground")
const playerEXP = document.querySelector("#playerEXPBar");


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
let renderedMonsters = [];
let renderedAttacks = [];
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

    let exp = player.team.roster[0].stats.currentEXP / player.team.roster[0].stats.toNextLevelEXP;
    exp *= 100;
    expPercentage = exp + "%"
    playerEXP.style.width = expPercentage;
    document.querySelector('#playerHealthBar').style.width = healthPercentage;
    document.querySelector('#hpText').innerHTML = healthText;
    document.querySelector('#playerName').innerHTML = player.team.roster[0].name;
    document.querySelector('#attacksBox').replaceChildren();

    const encounters = [monsters.Draggle, monsters.Axy, monsters.Bambo, monsters.Boscis, monsters.UnoUne, monsters.Cranio, monsters.Spookli];

    let ranIndex = Math.floor(Math.random() * (encounters.length));

    enemyMonster = new Monster(encounters[ranIndex])
    
    enemyMonster.position =  {
        x: 800,
        y: 100
    }
    enemyMonster.isEnemy = true;
    document.querySelector('#enemyName').innerHTML = enemyMonster.name;
    playerMonster = player.team.roster[0];
    renderedMonsters = [enemyMonster, playerMonster];
    playerActions = ["Fight", "Use Item", "Befriend", "Flee"];
    queue = [];
    endQueue = [];
    tempFriendship = enemyMonster.stats.friend;

    battleOptions();
}

document.querySelector("#goBack").addEventListener("click", () => {
    document.querySelector("#goBack").style.display = "none";
    battleOptions();
})