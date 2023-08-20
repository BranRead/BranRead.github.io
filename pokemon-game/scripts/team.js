class Team{
    constructor({
        roster = [],
        maxSize = 4,
    }){
        this.roster = roster;
        this.maxSize = maxSize;
    }

    removeMonster(e){
        console.log("Releasing " + player.team.roster[e.target.parentNode.parentNode.value])
        player.team.roster.splice(e.target.parentNode.parentNode.value, 1);
        e.target.parentNode.parentNode.remove();

        let listHTML = document.querySelectorAll(".toRemove");
        for(let i = 0; i < player.team.roster.length; i++){
            for(let j = 0; j < listHTML.length; j++){
                if(listHTML[j].childNodes[1].innerHTML == player.team.roster[i].name){
                    listHTML[j].style.order = i;
                    listHTML[j].value = i;
                }
            }
        }
    }

    switchMonster(e){

        if(team.priorClick){
            let firstMonster = player.team.roster[team.toSwitch.parentNode.parentNode.value];
            let secondMonster = player.team.roster[e.target.parentNode.parentNode.value];
            player.team.roster[e.target.parentNode.parentNode.value] = firstMonster;
            player.team.roster[team.toSwitch.parentNode.parentNode.value] = secondMonster;
            
            let listHTML = document.querySelectorAll(".toRemove");

            team.toSwitch.parentNode.parentNode.style.order = e.target.parentNode.parentNode.value;
            e.target.parentNode.parentNode.style.order = team.toSwitch.parentNode.parentNode.value;
            team.toSwitch = null;
            team.priorClick = false;
            
            for(let i = 0; i < player.team.roster.length; i++){
                for(let j = 0; j < listHTML.length; j++){
                    if(listHTML[j].childNodes[1].innerHTML == player.team.roster[i].name){
                        listHTML[j].style.order = i;
                        listHTML[j].value = i;
                    }
                }
            }
        } else {
            team.priorClick = true;
            team.toSwitch = e.target;
            console.log("Current Target " + player.team.roster[e.target.value].name);
            console.log("toSwitch " + player.team.roster[team.toSwitch.value].name);
        }
        
    }
    
    viewTeam(){
        if(!player.teamWindow){
            document.querySelectorAll(".menu-item").forEach(item => {
                item.style.display = "none";
            })
            backBtn.style.display = "block";
            
            document.querySelector("#menu-title").innerHTML = "Team";
            
            player.teamWindow = true;
            
            this.roster.forEach((monster, index) => {
                const monsterBlock = document.createElement('div');
                monsterBlock.className = "monsterInfo toRemove";
                monsterBlock.value = index;
                monsterBlock.style.order = index;

                const monsterImgContainer = document.createElement('div');
                monsterImgContainer.className = "imgContainer";

                const monsterImg = document.createElement('img');
                monsterImg.src = monster.icon;
                monsterImg.className = "monsterImg"

                const monsterNameDiv = document.createElement('div');
                monsterNameDiv.className = "monsterNameDiv";

                const monsterName = document.createElement('h3');
                monsterName.className = "monsterName";
                monsterName.innerHTML = monster.name;

                const statDisplay = document.createElement('div');
                statDisplay.className = "statDisplay"

                const lvlDiv = document.createElement('div');
                const hpDiv = document.createElement('div');

                const expBarDiv = document.createElement('div');
                expBarDiv.classList.add("expBackground", "expBackgroundTeam"); 
                const hpBarDiv = document.createElement('div');
                hpBarDiv.classList.add("healthBackground", "healthBackgroundTeam");
                
                const expBarBackground = document.createElement('div');
                expBarBackground.className = "exp"
                const hpBarBackground = document.createElement('div');
                hpBarBackground.className = "health"
              
                const expBar = document.createElement('div');
                expBar.className = "playerEXPBar";
                let exp = monster.stats.currentEXP / monster.stats.toNextLevelEXP;
                exp *= 100;
                expBar.style.width = `${exp}%`;
                const hpBar = document.createElement('div');
                hpBar.className = "playerHealthBar";
                let hp = monster.stats.hp / monster.stats.maxHP;
                hp *= 100;
                hpBar.style.width = `${hp}%`;

                const monsterLevel = document.createElement('p');
                monsterLevel.className = "monsterLvlText"
                monsterLevel.innerHTML = `Lvl: ${monster.stats.level}`;

                const monsterHP = document.createElement('p');
                monsterHP.className = "monsterHpText"
                monsterHP.innerHTML = `HP: ${monster.stats.hp}/${monster.stats.maxHP}`;

                monsterImgContainer.append(monsterImg);
                monsterBlock.append(monsterImgContainer);
                monsterNameDiv.append(monsterName);
                monsterBlock.append(monsterNameDiv);

                lvlDiv.append(monsterLevel);
                expBarDiv.append(expBarBackground);
                expBarDiv.append(expBar);
                lvlDiv.append(expBarDiv);

                hpDiv.append(monsterHP);
                hpBarDiv.append(hpBarBackground);
                hpBarDiv.append(hpBar);
                hpDiv.append(hpBarDiv);

                statDisplay.append(lvlDiv);
                statDisplay.append(hpDiv);
                monsterBlock.append(statDisplay);
                document.querySelector('#menu-options').append(monsterBlock);
                monsterBlock.addEventListener('click', () => {
                    
                })
            })
        }
    }

    //In depth menu
    teamMenu(){
        // const monsterSwitch = document.createElement('button');
        // const monsterDelete = document.createElement('button');

        // monsterSwitch.innerHTML = "Switch";
        // monsterDelete.innerHTML = "Release";

        // monsterSwitch.className = "newBtn";
        // monsterDelete.className = "releaseBtn";

        // document.querySelectorAll(".newBtn").forEach(button => {
        //     button.addEventListener('click', (e) => {
        //         this.switchMonster(e);
        //     })
        // })

        // document.querySelectorAll(".releaseBtn").forEach(button => {
        //     button.addEventListener('click', (e) => {
        //         this.removeMonster(e);
        //     })
        // })
    }
    
}
