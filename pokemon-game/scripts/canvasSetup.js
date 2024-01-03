const canvasSetup = {
    canvas: document.querySelector('#gameCamera'),
    cvsTeam: document.querySelector('#spriteWindow'),
    
    init: () => {
        canvasSetup.canvas.width = 1024;
        canvasSetup.canvas.height = 576;
    },

    clearScreen: (context) => {
        // context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, 1024, 576);
    }
}
canvasSetup.init();