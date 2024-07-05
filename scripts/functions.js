const email = document.getElementById("email");
const triangleCursor = document.getElementById("triangleCursor");
const readMore = document.getElementById("advanceText");
let animationID;
let previousTime = 0;
let currentTime = 0;

const dialogOptions = ["#info1", "#info2", "#info3", "#info4", "#info5"]

function copyEmail() {
    let copiedEmail = "branrtread@gmail.com";
    navigator.clipboard.writeText(copiedEmail);
    alert("Email copied to clipboard!");
}

function dialog() {
    let visibleIndex;

    dialogOptions.forEach((para, index) => {
        if (document.querySelector(para).style.display == 'block'){
            visibleIndex = index
        }
    });

    document.querySelector(dialogOptions[visibleIndex]).style.display = "none";
    let nextIndex = visibleIndex + 1;
    if(nextIndex >= dialogOptions.length){
        document.querySelector(dialogOptions[0]).style.display = "block"
    } else {
        document.querySelector(dialogOptions[nextIndex]).style.display = "block";
    }
}

if(window.location.href == "https://branread.github.io/" || 
    window.location.href == "https://branread.github.io/index.html" || 
    window.location.href == "http://127.0.0.1:5501/" ||
    window.location.href == "http://127.0.0.1:5501/index.html"
    ) {

    email.addEventListener('click', copyEmail);
    readMore.addEventListener('click', dialog);
    setInterval(() => {
        
        if(triangleCursor.innerHTML == "▼"){
            triangleCursor.innerHTML = "▽";
        } else {
            triangleCursor.innerHTML = "▼";
        }
    }, 300)
}


let portfolioItems = document.querySelectorAll(".inside-card");

portfolioItems.forEach(card => {
    card.addEventListener('mouseover', function () {
        this.querySelector(".playable").style.display = "block";
    })

    card.addEventListener('mouseout', function () {
        this.querySelector(".playable").style.display = "none";
    })
});

if(window.location.href == "https://branread.github.io/" || window.location.href == "https://branread.github.io/index.html" || window.location.href == 'http://127.0.0.1:5501/index.html') {
    const canvas = document.getElementById("crowScreen");
    const context = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 50;

    if(screen.width < 577){
        canvas.width = 280;
    }
    const crowImageRight = new Image();
    crowImageRight.src = "/images/crowWalkRight.png";

    const crowImageLeft = new Image();
    crowImageLeft.src = "/images/crowWalkLeft.png";

    const crow = new Sprite({
        spritesheetPosition: {
            x: 0,
            y: 0
        },
        canvasPosition: {
            x: 0,
            y: 0 - 14
        },
        dimensions: {
            width: 80,
            height: 80
        },
        image: crowImageRight,
        animate: true,
        sprite: {
            right: crowImageRight,
            left: crowImageLeft
        },
        frames: {
            max: 16,
            hold: 10
        }
    })

    crow.isGoingRight = true;

    function animation(){
        animationID = window.requestAnimationFrame(animation);

        previousTime = currentTime;
        currentTime = performance.now();
        let deltaTime = currentTime - previousTime; 
        deltaTime /= 10;
        // console.log("Delta Time: " + deltaTime)
        if(crow.isGoingRight) {
            crow.canvasPosition.x += 1 * deltaTime;
        } else {
            crow.canvasPosition.x -= 1 * deltaTime;
        }

        if(crow.canvasPosition.x > canvas.width){
            crow.isGoingRight = false;
            crow.image = crow.sprite.left;
        } else if (crow.canvasPosition.x < 0 - crow.dimensions.width) {
            crow.isGoingRight = true;
            crow.image = crow.sprite.right;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        crow.draw(context, deltaTime);
    }

    animation();
}