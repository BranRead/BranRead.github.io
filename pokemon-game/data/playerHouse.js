const playerHouse = {
    offset: {
        x: 288,
        y: -1020
    },
    backgroundImage: new Image(),
    foregroundImage: new Image(),
    background: "",
    foreground: "",
    animationID: 0,
    healer: "",
    init: () => {
        playerHouse.backgroundImage.src = "/pokemon-game/img/gameWorld/playerHouse.png";
        
        playerHouse.background = new Sprite({
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: playerHouse.offset.x, 
                y: playerHouse.offset.y
            },
            dimensions: {
                width: 1280,
                height: 1280
            },
            image: playerHouse.backgroundImage
        });

        playerHouse.foregroundImage.src = "/pokemon-game/img/gameWorld/playerHouse.png";

        playerHouse.foreground = new Sprite({
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: playerHouse.offset.x, 
                y: playerHouse.offset.y
            },
            dimensions: {
                width: 1280,
                height: 1280
            },
            image: playerHouse.foregroundImage
        });
        
    },

    animate: () => {
        playerHouse.animationID = window.requestAnimationFrame(playerHouse.animate);
        playerHouse.background.draw();
        playerHouse.foreground.draw();
        game.player.draw()
    }

}
   