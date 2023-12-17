//Always need to show textbox with text to progress turns
//innerHTML replaces butttons or anything else within the dialog box
const dialog = {
    //Set to whatever the dialog container is
    dialogBox: document.querySelector("#dialogBox"),
    dialogBackground: document.querySelector("#dialogBackground"),

    displayDialog: (message) => {
        document.getElementById("attacksBox").style.display = "none";
        dialogBackground.style.display = "flex";
        dialog.dialogBox.style.display = "block";
        dialog.dialogBox.innerHTML = message
    },

    displayDialogOverWorld: (message) => {
        document.getElementById("attackTypeBox").style.display = "none";
        dialogBackground.style.display = "flex";
        dialog.dialogBox.style.display = "block";
        dialog.dialogBox.innerHTML = message
    },

    hide: () => {
        dialogBackground.style.display = "none";
        dialog.dialogBox.style.display = "none";

    },

    clearDialog: () => {
        //Clears dialog box
        const buttonToRemove = document.querySelectorAll('.battleCommands');
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
        }
    },
    
    queueChecker: () => {
    game.queue.forEach(item => {
        console.log(item)
    })
    }
}
