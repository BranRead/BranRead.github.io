class Person extends Sprite{
    constructor({
            name,
            team,
            inventory,
            position, 
            image, 
            frames = { max: 1, hold: 10 }, 
            sprites, 
            animate, 
            rotation = 0
        }) {
            super({
                position, 
                image, 
                frames, 
                sprites, 
                animate, 
                rotation,
            })
        this.name = name;
        this.team = team;
        this.inventory = inventory;
    }
    
    save(){
        player.team.roster.forEach(monster => {
            let statsObject = {
                name: monster.name,
                isEnemy: monster.isEnemy,
                stats: monster.stats,
                attacks: monster.attacks
            }

            statsSave.push(statsObject);
        })
        const saveState = {
            canvasPosition: canvasMove,
            playerPosition: player.position,
            team: {
                stats: statsSave,
                size: player.team.maxSize
            },
            inventory: player.inventory
        }

        localStorage.setItem("monsterGame", JSON.stringify(saveState));
        console.log("Saved");
    }
}