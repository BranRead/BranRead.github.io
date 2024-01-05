const inventoryMenu = {

    isDescriptionOpen: false,

    display: (type) => {
        gameLogic.inventoryWindow = true;
        gameLogic.player.inventory.items.forEach((item, index) => {
            if(item.useCategory == type){
                gameLogic.inventoryWindow = true;
                const inventoryItem = document.createElement('div');
                inventoryItem.className = "inventoryItem"

                const inventoryItemContainer = document.createElement("div");
                inventoryItemContainer.className = "inventoryItemContainer";
    
                const inventoryImg = document.createElement('div');
                inventoryImg.className = "inventoryImg";

                const inventoryImgCvs = document.createElement('canvas');
                inventoryImgCvs.width = "32";
                inventoryImgCvs.height = "32";
                const ctx = inventoryImgCvs.getContext("2d");
               
                ctx.drawImage(item.image, item.spritePosition.x, item.spritePosition.y, 32, 32, 0, 0, 32, 32);
    
                inventoryImg.append(inventoryImgCvs);
                const inventoryName = document.createElement('div');
                inventoryName.className = "inventoryName"
                const inventoryNameText = document.createElement('p');
                inventoryNameText.className = "inventoryNameText"
                inventoryName.append(inventoryNameText);
    
                const inventoryQuantity = document.createElement('div');
                inventoryQuantity.className = "inventoryQuantity"
                const inventoryQuantityText = document.createElement('p');
                inventoryQuantityText.className = "inventoryQuantityText"
                inventoryQuantity.append(inventoryQuantityText);

                const inventoryBtns = document.createElement('div');
                inventoryBtns.className = "inventoryBtns";

                const infoBtn = document.createElement('button');
                infoBtn.textContent = "Info";
                infoBtn.className = "inventoryBtn";
                infoBtn.addEventListener("click", () => {
                    if(!inventoryMenu.isDescriptionOpen){
                        document.getElementById("inventoryFooter").style.display = "flex";
                        document.getElementById("itemTitleText").textContent = item.name;
                        document.getElementById("itemTitle").style.display = "block";
                        document.getElementById("itemDescriptionText").textContent = item.description;
                        document.getElementById("itemDescription").style.display = "block";
                    } else {
                        document.getElementById("inventoryFooter").style.display = "none";
                    }
                    inventoryMenu.isDescriptionOpen = !inventoryMenu.isDescriptionOpen;
                })
                
                const useBtn = document.createElement('button');
                useBtn.textContent = "Use";
                useBtn.className = "inventoryBtn";
                useBtn.addEventListener('click', (e) => {
                    gameLogic.player.inventory.selection(e.currentTarget)
                });

                const trashBtn = document.createElement('button');
                trashBtn.textContent = "Drop";
                trashBtn.className = "inventoryBtn";
                trashBtn.addEventListener('click', (e) => {
                    gameLogic.player.inventory.trash(e.currentTarget)
                });
                
                inventoryBtns.append(infoBtn);
                inventoryBtns.append(useBtn);
                inventoryBtns.append(trashBtn);
    
                inventoryItem.dataset.value = index;
                inventoryNameText.textContent = item.name
                inventoryQuantityText.textContent = `x${item.quantity}`;
    
                inventoryItemContainer.append(inventoryImg);
                inventoryItemContainer.append(inventoryName);
                inventoryItemContainer.append(inventoryQuantity);
                inventoryItem.append(inventoryItemContainer);
                inventoryItem.append(inventoryBtns);
                
                document.querySelector('#inventoryBody').append(inventoryItem)
            }
        })
    }
}