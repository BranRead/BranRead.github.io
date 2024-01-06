const save = {
    /*Save this for after everything else is done*/
    save: () => {
        gameLogic.player.team.roster.forEach(monster => {
            let teamStatsObject = {
                name: monster.name,
                isEnemy: monster.isEnemy,
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
            canvasPosition: gameLogic.canvasMove,
            // playerPosition: game.player.gamePosition,
            team: {
                stats: gameLogic.teamStatsSave,
                size: gameLogic.player.team.maxSize
            },
            inventory: gameLogic.inventoryStatsSave,
            gameMaps: gameLogic.mapStatsSave,
            activeMap: gameLogic.gameMap.name
        }
        localStorage.setItem("monsterGame", JSON.stringify(saveState));
        console.log("Saved");
    }
}