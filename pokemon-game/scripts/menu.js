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
    player.menuDisplayed = false;
    player.teamWindow = false;
    player.inventoryWindow = false;
}