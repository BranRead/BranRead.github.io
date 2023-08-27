class Team{
    constructor({
        roster = [],
        maxSize = 4,
    }){
        this.roster = roster;
        this.maxSize = maxSize;
    }
    removeMonster(e){
        console.log("Releasing " + game.player.team.roster[e.target.parentNode.parentNode.value])
        game.player.team.roster.splice(e.target.parentNode.parentNode.value, 1);
        e.target.parentNode.parentNode.remove();

        let listHTML = document.querySelectorAll(".toRemove");
        for(let i = 0; i < game.player.team.roster.length; i++){
            for(let j = 0; j < listHTML.length; j++){
                if(listHTML[j].childNodes[1].innerHTML == game.player.team.roster[i].name){
                    listHTML[j].style.order = i;
                    listHTML[j].value = i;
                }
            }
        }
    }

    switchMonster(e){
        if(game.team.priorClick){
            let firstMonster = game.player.team.roster[game.team.toSwitch.parentNode.parentNode.value];
            let secondMonster = game.player.team.roster[e.target.parentNode.parentNode.value];
            player.team.roster[e.target.parentNode.parentNode.value] = firstMonster;
            player.team.roster[game.team.toSwitch.parentNode.parentNode.value] = secondMonster;
            
            let listHTML = document.querySelectorAll(".toRemove");

            game.team.toSwitch.parentNode.parentNode.style.order = e.target.parentNode.parentNode.value;
            e.target.parentNode.parentNode.style.order = game.team.toSwitch.parentNode.parentNode.value;
            game.team.toSwitch = null;
            game.team.priorClick = false;
            
            for(let i = 0; i < player.team.roster.length; i++){
                for(let j = 0; j < listHTML.length; j++){
                    if(listHTML[j].childNodes[1].innerHTML == game.player.team.roster[i].name){
                        listHTML[j].style.order = i;
                        listHTML[j].value = i;
                    }
                }
            }
        } else {
            game.team.priorClick = true;
            game.team.toSwitch = e.target;
            console.log("Current Target " + game.player.team.roster[e.target.value].name);
            console.log("toSwitch " + game.player.team.roster[game.team.toSwitch.value].name);
        }
    }
    
    viewTeam(item, itemIndex){
        if(!game.player.teamWindow){
            document.querySelectorAll(".menu-item").forEach(item => {
                item.style.display = "none";
            })
            game.backBtn.style.display = "block";
            
            document.querySelector("#menu-title").innerHTML = "Team";
            
            game.player.teamWindow = true;
            
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

                statDisplay.append(hpDiv);
                statDisplay.append(lvlDiv);
                monsterBlock.append(statDisplay);
                document.querySelector('#menu-options').append(monsterBlock);
                monsterBlock.addEventListener('click', (e) => {
                    if(!game.usingItem){
                        this.teamMenu(game.player.team.roster[[e.currentTarget.value]]);
                    } else {
                        dialogue.dialogueBox.addEventListener("click", dialogue.progressTurn);
                        game.player.inventory.use(item, itemIndex, e.currentTarget.value);
                    }
                })
            })
        }
    }

    //In depth menu
    teamMenu(monster){
        game.animateSprite = true;
        let hpPercent;
        let expPercent;

        let hp = monster.stats.hp / monster.stats.maxHP;
        hp *= 100;
        let exp = monster.stats.currentEXP / monster.stats.toNextLevelEXP;
        exp *= 100;

        hpPercent = hp + "%";
        expPercent = exp + "%";

        document.querySelector('#fullMonsterView').style.display = "block";
        document.querySelector('#nameTeamView').innerHTML = monster.name;
        document.querySelector('#typeTeamView').innerHTML = monster.type;
        document.querySelector('#flavourTextTeamView').innerHTML = monster.about;
        document.querySelector('#hpTeamView').innerHTML = `${monster.stats.hp}/${monster.stats.maxHP}`;
        document.querySelector('#hpBarTeamView').style.width = hpPercent;
        document.querySelector('#expTeamView').innerHTML = `${monster.stats.currentEXP}/${monster.stats.toNextLevelEXP}`;
        document.querySelector('#expBarTeamView').style.width = expPercent;
        document.querySelector('#hpStatsTeamView').innerHTML = `HP: ${monster.stats.hp}`;
        document.querySelector('#atkStatsTeamView').innerHTML = `Attack: ${monster.stats.atk}`;
        document.querySelector('#defStatsTeamView').innerHTML = `Defense: ${monster.stats.def}`;
        document.querySelector('#magAtkStatsTeamView').innerHTML = `Magical Attack: ${monster.stats.magAtk}`;
        document.querySelector('#magDefStatsTeamView').innerHTML = `Magical Defense: ${monster.stats.magDef}`;
        document.querySelector('#spdStatsTeamView').innerHTML = `Speed: ${monster.stats.spd}`;

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
            game.ctxTeam.clearRect(0, 0, 100, 100);
            monster.drawMonster(game.ctxTeam);
            if(!game.animateSprite){
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