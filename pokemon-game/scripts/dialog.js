//Always need to show textbox with text to progress turns
//innerHTML replaces butttons or anything else within the dialog box
const dialog = {
    //Set to whatever the dialog container is
    nextBtn: document.querySelector(".nextBtn"),
    dialog: document.querySelector ("#dialog"),
    dialogOutputBox: document.querySelector("#dialogOutputBox"),
    dialogBox: document.querySelector("#dialogBox"),

    displayDialog: (message) => {
        additionalGameFunctions.textInterval();
        battleSetup.combatBox.style.display = "none";
        dialog.dialogBox.style.display = "block";
        dialog.dialog.innerHTML = message
    },

    clearDialog: () => {
        //Clears dialog box
        const buttonToRemove = document.querySelectorAll('.dialogBtn');
        buttonToRemove.forEach(button => {
        button.remove();
        })
    },

    progressTurn: () => {
        if(battleSetup.endQueue.length > 0){
            battleSetup.endQueue[0]()
            battleSetup.endQueue.shift()
        } else if (battleSetup.queue.length > 0){
            battleSetup.queue[0]()
            battleSetup.queue.shift()
        } else {
            dialog.dialogBox.style.display = 'none';
            additionalGameFunctions.textInterval();
        }
    },
    
    queueChecker: () => {
    gameLogic.queue.forEach(item => {
        console.log(item)
    })
    }
}
