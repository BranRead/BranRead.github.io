const inventoryMenu = {
    display: (type) => {
        game.player.inventory.items.forEach((item, index) => {
            if(item.useCategory == type){
                const inventoryItem = document.createElement('div');
                inventoryItem.className = "inventoryItem"
    
                const inventoryImg = document.createElement('img');
                inventoryImg.className = "inventoryImg"
    
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
                
                const useBtn = document.createElement('button');
                useBtn.innerHTML = "Use";
                useBtn.className = "useBtn";
                useBtn.addEventListener('click', (e) => {
                    game.player.inventory.selection(e.currentTarget)
                });

                const trashBtn = document.createElement('button');
                trashBtn.innerHTML = "Drop";
                trashBtn.className = "trashBtn";
                trashBtn.addEventListener('click', (e) => {
                    game.player.inventory.trash(e.currentTarget)
                });
                
                inventoryBtns.append(useBtn);
                inventoryBtns.append(trashBtn);
    
                inventoryItem.dataset.value = index;
                inventoryNameText.innerHTML = item.name
                inventoryQuantityText.innerHTML = `x${item.quantity}`;
    
                inventoryItem.append(inventoryImg);
                inventoryItem.append(inventoryName);
                inventoryItem.append(inventoryQuantity);
                inventoryItem.append(inventoryBtns);
                
                inventoryItem.addEventListener("click", () => {
                    game.player.inventoryWindow = true;
                    document.querySelector("#itemTitle").style.display = "block";
            document.querySelector("#itemDescription").style.display = "block";
                    document.querySelector("#itemTitleText").innerHTML = item.name;
                    document.querySelector("#itemDescriptionText").innerHTML = item.description;
                })
    
                document.querySelector('#inventoryBody').append(inventoryItem)
    
            }
        })
    }
}