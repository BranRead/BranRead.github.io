const save = {
    /*Save this for after everything else is done*/
    save: () => {
        gameLogic.player.team.roster.forEach(monster => {
            let teamStatsObject = {
                name: monster.name,
                stats: monster.stats,
                attacks: monster.attacks
            }
            gameLogic.teamStatsSave.push(teamStatsObject);
        })

        gameLogic.player.inventory.items.forEach(item => {
            let itemStatsObject = {
                name: item.name,
                quantity: item.quantity
            }
            gameLogic.inventoryStatsSave.push(itemStatsObject);
        })

        gameLogic.maps.forEach(map => {
            let mapStatsObject = {
                items: map.itemsInWorld,
                hiddenItems: map.hiddenItemsInWorld 
            }
            gameLogic.mapStatsSave.push(mapStatsObject)
        })

        const saveState = {
            canvasPosition: gameLogic.canvasMove, // Done
            team: {
                stats: gameLogic.teamStatsSave, // Done
                // Not needed right now but I had the idea of upgrades to enlarge team size.
                size: gameLogic.player.team.maxSize
            },
            inventory: gameLogic.inventoryStatsSave, // Done
            gameMaps: gameLogic.mapStatsSave, // Done
            activeMap: gameLogic.gameMap.name // Done
        }
        localStorage.setItem("monsterGame", JSON.stringify(saveState));
        console.log("Saved");
    }
}