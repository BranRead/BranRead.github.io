//Always need to show textbox with text to start animation
const dialogue = {
    //Set to whatever the dialogue container is
    dialogueBox: document.querySelector("#dialogueBox"),

    displayDialogue: (message) => {
        dialogue.dialogueBox.style.display = "block";
        dialogue.dialogueBox.innerHTML = message
    },

    clearDialog: () => {
        //Clears dialog box
        const buttonToRemove = document.querySelectorAll('.battleCommands');
        buttonToRemove.forEach(button => {
        button.remove();
        })
    },
    
    queueChecker: () => {
    queue.forEach(item => {
        console.log(item)
    })
    }
}
