const peopleDataImages = {
    playerDownImage: new Image(),
    playerUpImage: new Image(),
    playerLeftImage: new Image(),
    playerRightImage: new Image(),
}

const positions = {
    GhasblrFromPlayerHouse: {
        x: -1952,
        y: -710
    },

    PlayerHouseFromGhasblr: {
        x: 288,
        y: -890
    },

    PlayerHouseFromPlayerRoom: {
        x: -620,
        y: -190
    },

    PlayerRoomFromPlayerHouse: {
        x: -610,
        y: -190  
    },

    PlayerBed: {
        x: -224,
        y: -190  
    },

    playerPosition: {
        x: (canvasSetup.canvas.width / 2) - (192 / 8),
        y: (canvasSetup.canvas.height / 2) - (68 / 2)
    },

    HealerPosition: {
        x: 265,
        y: 620
    }
}


peopleDataImages.playerUpImage.src = '/pokemon-game/img/people/playerUp.png';
peopleDataImages.playerRightImage.src = '/pokemon-game/img/people/playerRight.png';
peopleDataImages.playerDownImage.src = '/pokemon-game/img/people/playerDown.png';
peopleDataImages.playerLeftImage.src = '/pokemon-game/img/people/playerLeft.png';

const peopleData = {
    Healer: {
        image: peopleDataImages.playerDownImage,
        spritePosition: {
            x: 0,
            y: 0
        },
        gamePosition: {
            x: positions.PlayerHouseFromGhasblr.x + positions.HealerPosition.x,
            y: positions.PlayerHouseFromGhasblr.y + positions.HealerPosition.y
        },
        dimensions: {
            width: 48,
            height: 68
        },
        frames: {
            max: 4,
            hold: 10
        },
        sprites: {
            up: peopleDataImages.playerUpImage,
            left: peopleDataImages.playerLeftImage,
            right: peopleDataImages.playerRightImage,
            down: peopleDataImages.playerDownImage,
        }
    }    
}