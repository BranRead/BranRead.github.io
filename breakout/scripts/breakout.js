const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body');
const middleX = canvas.width/2;
const middleY = canvas.height/2;
const playerLives = 3;
const lives = [];
const bricks = [[], [], [], [], []];
let run = true;
const ballSpeed = 3;


const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    offsetX: (body.clientWidth / 2 - canvas.width / 2),
    offsetY: (body.clientHeight / 2 - canvas.height / 2),
}

canvas.addEventListener('click', () => {
    // if(mouse.x > (playButton.x + mouse.offsetX) &&
    // mouse.x < (playButton.x + playButton.w) + mouse.offsetX &&
    // mouse.y > (playButton.y + mouse.offsetY) &&
    // mouse.y < (playButton.y + playButton.h) + mouse.offsetY){
    //     update();
    // }
      if(ctx.isPointInPath(mouse.x, mouse.y)){
        run = true;
        update();
    }
})

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log("X = " + mouse.x + "\n" + "Y = " + mouse.y);
    // console.log((mouse.x > (playButton.x + mouse.offsetX) &&
    // mouse.x < (playButton.x + playButton.w) + mouse.offsetX &&
    // mouse.y > (playButton.y + mouse.offsetY) &&
    // mouse.y < (playButton.y + playButton.h) + mouse.offsetY));
    // if(mouse.x > (playButton.x + mouse.offsetX) &&
    // mouse.x < (playButton.x + playButton.w) + mouse.offsetX &&
    // mouse.y > (playButton.y + mouse.offsetY) &&
    // mouse.y < (playButton.y + playButton.h) + mouse.offsetY){

    //     // Want to make some animation effects here. Try ispointinpath
    //     // ctx.clearRect(playButton.x, playButton.y, playButton.w, playButton.h);
    // }
})


class Rectangle {
    constructor(w, h, x, y){
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.centerX = (x + w/2);
        this.centerY = (y + h/2);
    }

    drawRect(fillStyle = 'white'){
        ctx.fillStyle = fillStyle;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Player extends Rectangle {
    constructor(w, h, x, y, playerLives){
        super(w, h, x, y)
        this.lives = playerLives;
    }
    loseLives(){
        this.lives--
    }
    gainLives(){
        this.lives++
    }
}

ctx.font = "64px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Brick Break", middleX, middleY);


const playButton = new Rectangle(200, 50, middleX - 100, middleY + 100);
playButton.drawRect();

ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Play", playButton.centerX, playButton.centerY + 10);


if(mouse.x > (playButton.x + mouse.offsetX) &&
    mouse.x < (playButton.x + playButton.w) + mouse.offsetX &&
    mouse.y > (playButton.y + mouse.offsetY) &&
    mouse.y < (playButton.y + playButton.h) + mouse.offsetY){
        console.log("firing");
        ctx.clearRect(playButton.x, playButton.y, playButton.w, playButton.h);
    }

// Animation 1 - Circle
const circle = {
    x: canvas.width/2,
    y: canvas.height/2 + 40,
    size: 10,
    dx: ballSpeed,
    dy: ballSpeed,
}

//Animation 2 - Player
const paddleOffsetX = 50;
const paddleOffsetY = 50; 
const player = new Player(100, 25, canvas.width / 2 - paddleOffsetX, canvas.height - paddleOffsetY, playerLives);

for (let i = 0; i < playerLives; i++){
    lives[i] = new Rectangle(50, 15, (i * 60) + 115, 30);
};

for (let i = 0; i < 5; i++){
    for(let j = 0; j < 10; j++){
        bricks[i][j] = (new Rectangle(90, 25, ((j * 100) + 5), ((i * 40) + 70)));
    }
};

player.drawRect();

function drawCircle(){
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
}

drawCircle();

ctx.rect(playButton.x + mouse.offsetX, playButton.y + mouse.offsetY, playButton.w, playButton.h);

function gameOver(){
    playButton.drawRect();
    ctx.textAlign = "center";
    ctx.fillText("Game Over", middleX, middleY + 70);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Play again", playButton.centerX, playButton.centerY + 10);
    ctx.rect(playButton.x + mouse.offsetX, playButton.y + mouse.offsetY, playButton.w, playButton.h);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    player.x = mouse.x - mouse.offsetX;
    player.drawRect();
    
    ctx.textAlign = 'left';
    ctx.fillText("Lives:", 30, 46);
    lives.forEach(live => {
        live.drawRect('red');
    });
    
    drawCircle();
        // detect collision with boundary
        // the circle is literally being drawn at a new position each frame. When that position "hits" the sides it'll bounce back
    if((circle.x + circle.size) > canvas.width || (circle.x - circle.size) < 0){
        circle.dx *= -1;
    } else if((circle.y - circle.size) < 0) {
        circle.dy *= -1;
    }

    if ((circle.x + circle.size) > player.x && //circle right should be greater than the left of the player
        (circle.x - circle.size) < (player.x + player.w) && //circle left should be less than the right of the player
        (circle.y + circle.size) > player.y && //circle bottom should be greater than the player top
        (circle.y - circle.size) < (player.y + player.h)) //circle top should be less than the bottom  
        {
        circle.dy *= -1;
    } else if ((circle.y + circle.size) > canvas.height){
        player.loseLives();
        lives.splice(lives.length - 1, 1);
        lives.forEach(live => {
            live.drawRect('red');
        });
        if(player.lives < 0){
            run = false;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circle.x = canvas.width / 2;
        circle.y = canvas.height / 2;
        drawCircle();
        player.x = mouse.x - mouse.offsetX;
        player.drawRect();
    }

     // change position
     circle.x += circle.dx;
     circle.y += circle.dy;

     for (let i = 0; i < bricks.length; i++){
        for (let j = 0; j < bricks[i].length; j++){
                if ((circle.x + circle.size) > bricks[i][j].x && //circle right should be greater than the left of the player
            (circle.x - circle.size) < (bricks[i][j].x + bricks[i][j].w) && //circle left should be less than the right of the player
            (circle.y + circle.size) > bricks[i][j].y && //circle bottom should be greater than the player top
            (circle.y - circle.size) < (bricks[i][j].y + bricks[i][j].h)) //circle top should be less than the bottom  
            {
                circle.dy *= -1;
                bricks[i].splice(j, 1); 
            };
            

        }
    }

    for (let i = 0; i < bricks.length; i++){
        for (let j = 0; j < bricks[i].length; j++){
            bricks[i][j].drawRect(); 
        }
    }

    if(run) {
        requestAnimationFrame(update);
    } else {
        gameOver();
    }
    
}


