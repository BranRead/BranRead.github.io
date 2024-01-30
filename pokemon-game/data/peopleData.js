const peopleDataImages = {
    playerDownImage: new Image(),
    playerUpImage: new Image(),
    playerLeftImage: new Image(),
    playerRightImage: new Image(),
}

peopleDataImages.playerUpImage.src = './img/people/playerUp.png';
peopleDataImages.playerRightImage.src = './img/people/playerRight.png';
peopleDataImages.playerDownImage.src = './img/people/playerDown.png';
peopleDataImages.playerLeftImage.src = './img/people/playerLeft.png';

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