function displayItems(type){
    player.inventory.items.forEach((item, index) => {
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

            inventoryItem.dataset.value = index;
            inventoryNameText.innerHTML = item.name
            inventoryQuantityText.innerHTML = `x${item.quantity}`;

            inventoryItem.append(inventoryImg);
            inventoryItem.append(inventoryName);
            inventoryItem.append(inventoryQuantity);
            
            inventoryItem.addEventListener("click", () => {
                document.querySelector("#itemTitleText").innerHTML = item.name;
                document.querySelector("#itemDescriptionText").innerHTML = item.description;
            })

            document.querySelector('#inventoryBody').append(inventoryItem)

        }
    })
}