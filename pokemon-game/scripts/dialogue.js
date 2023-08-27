//Always need to show textbox with text to start animation
//innerHTML replaces butttons or anything else within the dialog box
const dialogue = {
    //Set to whatever the dialogue container is
    dialogueBox: document.querySelector("#dialogueBox"),

    displayDialogue: (message) => {
        dialogBackground.style.display = "flex";
        dialogue.dialogueBox.style.display = "block";
        dialogue.dialogueBox.innerHTML = message
    },

    hide: () => {
        dialogBackground.style.display = "none";
        dialogue.dialogueBox.style.display = "none";

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
            dialogue.dialogueBox.style.display = 'none';
        }
    },
    
    queueChecker: () => {
    game.queue.forEach(item => {
        console.log(item)
    })
    }
}
