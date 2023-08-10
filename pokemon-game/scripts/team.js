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
                const monsterImgContainer = document.createElement('div');
                const monsterImg = document.createElement('img');
                const monsterName = document.createElement('h3');
                const monsterOptions = document.createElement('div');
                monsterOptions.className = "teamOptions"
                const monsterLevel = document.createElement('p');
                const monsterHP = document.createElement('p');
                const monsterSwitch = document.createElement('button');
                const monsterDelete = document.createElement('button');

                monsterImgContainer.className = "imgContainer";
                monsterImg.src = monster.icon;
                monsterImg.className = "monsterImg"
                monsterLevel.innerHTML = `Lvl: ${monster.stats.level}`;
                monsterHP.innerHTML = `HP: ${monster.stats.hp}/${monster.stats.maxHP}`;
                monsterSwitch.innerHTML = "Switch";
                monsterDelete.innerHTML = "Release";
                monsterName.className = "monsterName";
                monsterBlock.className = "monsterInfo toRemove";
                monsterBlock.value = index;
                monsterSwitch.className = "newBtn";
                monsterDelete.className = "releaseBtn";
                monsterName.innerHTML = monster.name;

                monsterImgContainer.append(monsterImg);
                monsterBlock.append(monsterImgContainer);
                monsterBlock.append(monsterName);
                monsterBlock.style.order = index;

                monsterOptions.append(monsterLevel);
                monsterOptions.append(monsterHP);
                monsterOptions.append(monsterSwitch);
                monsterOptions.append(monsterDelete);

                monsterBlock.append(monsterOptions);
                
                document.querySelector('#menu-options').append(monsterBlock);
            })

            document.querySelectorAll(".newBtn").forEach(button => {
                button.addEventListener('click', (e) => {
                    this.switchMonster(e);
                })
            })

            document.querySelectorAll(".releaseBtn").forEach(button => {
                button.addEventListener('click', (e) => {
                    this.removeMonster(e);
                })
            })
        }
    }
    
}
