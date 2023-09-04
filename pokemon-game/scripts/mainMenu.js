const menu = {
    open: () => {
        if(!game.player.menuDisplayed) {
            if (document.querySelector(".menu-item").style.display == "none"){
                document.querySelectorAll(".menu-item").forEach(item => {
                    item.style.display = "block";
                })
                document.querySelector("#menu-title").innerHTML = "Menu";
            }
            if(game.backBtn.style.display == "block"){
                game.backBtn.style.display = "none";
            }
            game.player.menuDisplayed = true;
            document.getElementById("overlappingDiv").style.display = "block";
            document.getElementById("overlappingDiv").style.opacity = ".8";
            document.getElementById("menu").style.display = "flex";
            document.getElementById("menu-options").style.display = "flex";
        } 
    },

    close: () => {
        document.getElementById("overlappingDiv").style.display = "none";
        document.getElementById("overlappingDiv").style.opacity = "0";
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-options").style.display = "none";
        
        //Removes buttons so inventory doesn't populate multiple instances
        const toRemove = document.querySelectorAll('.toRemove');
        toRemove.forEach(item => {
        item.remove();
        })
        game.player.team.roster[0].position = {
            x: 280,
            y: 325
        }
        game.player.team.roster[0].frontImage = false;
        game.player.team.roster[0].backImage = true;
        document.querySelector('#fullMonsterView').style.display = "none";
        document.querySelector("#fullInventoryView").style.display = "none";
        if(game.player.inventoryWindow){
            const toRemove = document.querySelectorAll('.inventoryItem');
            toRemove.forEach(item => {
                item.remove();
            })
            dialogue.hide();
        }
        
        game.usingItem = false;
        game.animateSprite = false;
        game.player.menuDisplayed = false;
        game.player.teamWindow = false;
        game.player.inventoryWindow = false;
    },
}