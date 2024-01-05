const menu = {
    open: () => {
        if(!gameLogic.menuDisplayed) {
            if (document.querySelector(".menu-item").style.display == "none"){
                document.querySelectorAll(".menu-item").forEach(item => {
                    item.style.display = "block";
                })
                document.querySelector("#menu-title").firstChild.textContent = "Menu";
            }
            gameLogic.menuDisplayed = true;
            document.getElementById("overlappingDiv").style.display = "block";
            document.getElementById("overlappingDiv").style.opacity = ".8";
            document.getElementById("menu").style.display = "flex";
        } 
    },

    close: () => {
        document.getElementById("overlappingDiv").style.display = "none";
        document.getElementById("overlappingDiv").style.opacity = "0";
        document.getElementById("menu").style.display = "none";
        document.getElementById("inventoryFooter").style.display = "none";
        inventoryMenu.isDescriptionOpen = false;
        
        //Removes buttons so inventory doesn't populate multiple instances
        const toRemove = document.querySelectorAll('.toRemove');
        toRemove.forEach(item => {
        item.remove();
        })
        gameLogic.player.team.roster[0].position = {
            x: 280,
            y: 325
        }
        gameLogic.player.team.roster[0].frontImage = false;
        gameLogic.player.team.roster[0].backImage = true;
        document.getElementById('fullMonsterView').style.display = "none";
        document.getElementById("fullInventoryView").style.display = "none";
        if(gameLogic.isInventoryWindowOpen){
            const toRemove = document.querySelectorAll('.inventoryItem');
            toRemove.forEach(item => {
                item.remove();
            })
            document.getElementById("itemTitle").style.display = "none";
            document.getElementById("itemDescription").style.display = "none";
            dialog.dialogBox.style.display = "none";
        }
        
        gameLogic.usingItem = false;
        gameLogic.isTeamSpriteVisible = false;
        gameLogic.menuDisplayed = false;
        gameLogic.teamWindow = false;
        gameLogic.inventoryWindow = false;
    },
}