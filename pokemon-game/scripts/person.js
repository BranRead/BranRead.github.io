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

    quit(){
        //Dialogue
        closeMenu();
        dialogBackground.style.display = "flex";
        dialogueBox.style.display = "block";
        dialogueBox.innerHTML = "Are you sure you'd like to quit? Unsaved changes will be lost.";
        
        const yesBtn = document.createElement("button");
        yesBtn.className = "yesBtn";
        yesBtn.innerHTML = "Yes";
        yesBtn.addEventListener("click", () => {
           //This path may not work on github
        window.location.href = "/projects.html";
        })

        const noBtn = document.createElement("button");
        noBtn.className = "noBtn";
        noBtn.innerHTML = "No";
        noBtn.addEventListener("click", () => {
            dialogBackground.style.display = "none";
        })
        
        dialogueBox.append(yesBtn);
        dialogueBox.append(noBtn);
        
    }
}