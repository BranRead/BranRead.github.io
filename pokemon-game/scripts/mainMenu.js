//Gonna be for a class of menu
const menu = document.querySelectorAll(".menu-item");

function openMenu(){
    if(!player.menuDisplayed) {
        if (document.querySelector(".menu-item").style.display == "none"){
            document.querySelectorAll(".menu-item").forEach(item => {
                item.style.display = "block";
            })
            document.querySelector("#menu-title").innerHTML = "Menu";
        }
        if(backBtn.style.display == "block"){
            backBtn.style.display = "none";
        }
        player.menuDisplayed = true;
        document.getElementById("overlappingDiv").style.display = "block";
        document.getElementById("overlappingDiv").style.opacity = ".8";
        document.getElementById("menu").style.display = "flex";
        document.getElementById("menu-options").style.display = "flex";
    } 
}

function closeMenu(){
    document.getElementById("overlappingDiv").style.display = "none";
    document.getElementById("overlappingDiv").style.opacity = "0";
    document.getElementById("menu").style.display = "none";
    document.getElementById("menu-options").style.display = "none";
    
    //Removes buttons so inventory doesn't populate multiple instances
    const toRemove = document.querySelectorAll('.toRemove');
    toRemove.forEach(item => {
    item.remove();
    })
    document.querySelector('#fullMonsterView').style.display = "none";
    document.querySelector("#fullInventoryView").style.display = "none";
    player.menuDisplayed = false;
    player.teamWindow = false;
    player.inventoryWindow = false;
}

document.querySelector("#goBack").addEventListener("click", () => {
    document.querySelector("#goBack").style.display = "none";
    battleOptions();
})

menu.forEach(item => {
    item.addEventListener('click', () => {
        let selection = item.innerHTML
        switch (selection) {
            case "Team":
                player.team.viewTeam();
                break;
            case "Inventory":
                player.inventory.openInventory();
                break;
            case "Settings":
                settings.openSettings();
                break;
            case "Save":
                player.save();
                break;
            case "Quit":
                player.quit();
                break;
            default:
                console.log("Error clicking menu");
                break;
        }
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if(endQueue.length > 0){
        endQueue[0]()
        endQueue.shift()
    } else if (queue.length > 0){
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})