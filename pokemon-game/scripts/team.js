class Team{
    constructor({
        roster = [],
        maxSize = 4,
    }){
        this.roster = roster;
        this.maxSize = maxSize;
    }
    removeMonster(e){
        console.log("Releasing " + gameLogic.player.team.roster[e.target.parentNode.parentNode.value])
        gameLogic.player.team.roster.splice(e.target.parentNode.parentNode.value, 1);
        e.target.parentNode.parentNode.remove();

        let listHTML = document.querySelectorAll(".toRemove");
        for(let i = 0; i < gameLogic.player.team.roster.length; i++){
            for(let j = 0; j < listHTML.length; j++){
                if(listHTML[j].childNodes[1].innerHTML == gameLogic.player.team.roster[i].name){
                    listHTML[j].style.order = i;
                    listHTML[j].value = i;
                }
            }
        }
    }

    switchMonster(e){
        if(gameLogic.team.priorClick){
            let firstMonster = gameLogic.player.team.roster[gameLogic.team.toSwitch.parentNode.parentNode.value];
            let secondMonster = gameLogic.player.team.roster[e.target.parentNode.parentNode.value];
            player.team.roster[e.target.parentNode.parentNode.value] = firstMonster;
            player.team.roster[gameLogic.team.toSwitch.parentNode.parentNode.value] = secondMonster;
            
            let listHTML = document.querySelectorAll(".toRemove");

            gameLogic.team.toSwitch.parentNode.parentNode.style.order = e.target.parentNode.parentNode.value;
            e.target.parentNode.parentNode.style.order = gameLogic.team.toSwitch.parentNode.parentNode.value;
            gameLogic.team.toSwitch = null;
            gameLogic.team.priorClick = false;
            
            for(let i = 0; i < player.team.roster.length; i++){
                for(let j = 0; j < listHTML.length; j++){
                    if(listHTML[j].childNodes[1].innerHTML == gameLogic.player.team.roster[i].name){
                        listHTML[j].style.order = i;
                        listHTML[j].value = i;
                    }
                }
            }
        } else {
            gameLogic.team.priorClick = true;
            gameLogic.team.toSwitch = e.target;
            console.log("Current Target " + gameLogic.player.team.roster[e.target.value].name);
            console.log("toSwitch " + gameLogic.player.team.roster[gameLogic.team.toSwitch.value].name);
        }
    }
    
    viewTeam(item, itemIndex){ 
        if(gameLogic.teamWindow){
            const teamDisplay = document.querySelectorAll(".toRemove");
            if(teamDisplay != null){
                teamDisplay.forEach(monster => {
                    monster.remove()
                })
            }
        }

        document.querySelectorAll(".menu-item").forEach(item => {
            item.style.display = "none";
        })
        
        
        document.querySelector("#menu-title").firstChild.textContent = "Team";
        
        gameLogic.player.teamWindow = true;
        
        this.roster.forEach((monster, index) => {
            const monsterBlock = document.createElement('div');
            monsterBlock.className = "monsterInfo toRemove";
            monsterBlock.value = index;
            monsterBlock.style.order = index;
            const monsterImgNameContainer = document.createElement('div');
            monsterImgNameContainer.className = "imgNameContainer";
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
            monsterLevel.textContent = `Lvl: \n ${monster.stats.level}`;
            const monsterHP = document.createElement('p');
            monsterHP.className = "monsterHpText"
            monsterHP.textContent = `HP: ${monster.stats.hp}/${monster.stats.maxHP}`;
            monsterImgContainer.append(monsterImg);
           
            monsterNameDiv.append(monsterName);
            monsterImgNameContainer.append(monsterNameDiv);
            monsterImgNameContainer.append(monsterImgContainer);
            monsterBlock.append(monsterImgNameContainer);
            lvlDiv.append(monsterLevel);
            expBarDiv.append(expBarBackground);
            expBarDiv.append(expBar);
            lvlDiv.append(expBarDiv);
            hpDiv.append(monsterHP);
            hpBarDiv.append(hpBarBackground);
            hpBarDiv.append(hpBar);
            hpDiv.append(hpBarDiv);
            statDisplay.append(hpDiv);
            statDisplay.append(lvlDiv);
            monsterBlock.append(statDisplay);
            document.querySelector('#menu').append(monsterBlock);
            monsterBlock.addEventListener('click', (e) => {
                if(!gameLogic.usingItem){
                    if(gameLogic.inventoryWindow) {
                        document.getElementById("fullInventoryView").style.display = "none";
                    }
                    this.teamMenu(gameLogic.player.team.roster[[e.currentTarget.value]]);
                } else {
                    document.querySelector(".cancelBtn").remove();
                    gameLogic.player.inventory.use(item, itemIndex, e.currentTarget.value);
                }
            })
        })

        const backBtn = document.createElement('div');
        const backBtnText = document.createElement('h3');
        backBtnText.textContent = "Back";
        backBtn.classList.add("backBtn", "toRemove");
        backBtn.style.order = 4;
        backBtn.addEventListener("click", () => {
            menu.close();
            menu.open();
        })
        document.querySelector('#menu').append(backBtn);

        backBtn.append(backBtnText)


        
    }

    //In depth menu
    teamMenu(monster){
        const contextTeam = canvasSetup.cvsTeam.getContext("2d");

        gameLogic.isTeamSpriteVisible = true;
        let hpPercent;
        let expPercent;

        let hp = monster.stats.hp / monster.stats.maxHP;
        hp *= 100;
        let exp = monster.stats.currentEXP / monster.stats.toNextLevelEXP;
        exp *= 100;

        hpPercent = hp + "%";
        expPercent = exp + "%";

        document.querySelector('#fullMonsterView').style.display = "block";
        document.querySelector('#nameTeamView').textContent = monster.name;
        document.querySelector('#typeTeamView').textContent = monster.type;
        document.querySelector('#flavourTextTeamView').textContent = monster.about;
        document.querySelector('#hpTeamView').textContent = `${monster.stats.hp}/${monster.stats.maxHP}`;
        document.querySelector('#hpBarTeamView').style.width = hpPercent;
        document.querySelector('#expTeamView').textContent = `${monster.stats.currentEXP}/${monster.stats.toNextLevelEXP}`;
        document.querySelector('#expBarTeamView').style.width = expPercent;
        document.querySelector('#hpStatsTeamView').textContent = `HP: ${monster.stats.hp}`;
        document.querySelector('#atkStatsTeamView').textContent = `Attack: ${monster.stats.atk}`;
        document.querySelector('#defStatsTeamView').textContent = `Defense: ${monster.stats.def}`;
        document.querySelector('#magAtkStatsTeamView').textContent = `Magical Attack: ${monster.stats.magAtk}`;
        document.querySelector('#magDefStatsTeamView').textContent = `Magical Defense: ${monster.stats.magDef}`;
        document.querySelector('#spdStatsTeamView').textContent = `Speed: ${monster.stats.spd}`;

        monster.position = {
            x: 7,
            y: 10
        }

        monster.frontImage = true;
        monster.backImage = false;

        document.querySelector("#release").addEventListener('click', (e) => {
                this.removeMonster(e);
            })

        function animateMenu(){
            const menuAnimate = window.requestAnimationFrame(animateMenu);
            contextTeam .clearRect(0, 0, 100, 100);
            monster.drawMonster(contextTeam);
            if(!gameLogic.isTeamSpriteVisible){
                window.cancelAnimationFrame(menuAnimate)
            }
        }

        animateMenu();
        
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
    }
}