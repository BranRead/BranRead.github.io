const inventoryMenu = {

    isDescriptionOpen: false,

    display: (type) => {
        game.player.inventory.items.forEach((item, index) => {
            if(item.useCategory == type){
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
                infoBtn.className = "infoBtn";
                infoBtn.addEventListener("click", () => {
                    game.player.inventoryWindow = true;
                    if(!inventoryMenu.isDescriptionOpen){
                        inventoryMenu.isDescriptionOpen = true;
                        document.getElementById("inventoryFooter").style.display = "flex";
                        document.querySelector("#itemTitleText").textContent = item.name;
                        document.querySelector("#itemDescriptionText").textContent = item.description;
                    } else {
                        inventoryMenu.isDescriptionOpen = false;
                        document.getElementById("inventoryFooter").style.display = "none";
                    }
                })
                
                const useBtn = document.createElement('button');
                useBtn.textContent = "Use";
                useBtn.className = "useBtn";
                useBtn.addEventListener('click', (e) => {
                    game.player.inventory.selection(e.currentTarget)
                });

                const trashBtn = document.createElement('button');
                trashBtn.textContent = "Drop";
                trashBtn.className = "trashBtn";
                trashBtn.addEventListener('click', (e) => {
                    game.player.inventory.trash(e.currentTarget)
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