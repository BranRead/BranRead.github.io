const canvasSetup = {
    canvas: document.querySelector('#gameCamera'),
    init: () => {
        canvasSetup.canvas.width = 1024;
        canvasSetup.canvas.height = 576;
    }
}
canvasSetup.init();