const email = document.getElementById("email");
const triangleCursor = document.getElementById("triangleCursor");
const readMore = document.getElementById("advanceText");
let animationID;

const dialogOptions = new Map([
    ["intro", "Having loved computers and technology my entire life, I switched careers and went back to school for programming. At my core I truly care for others, place a high value on my work and always strive to do better. I bring my passion and dedication to everything I do."],
    ["languages", "I have worked with Java, JavaScript, PHP, Node.JS, C, C++, SQL, HTML, CSS and Bootstrap."],
    ["currently", "In my own time I'm working on learning Godot and Android Studio. While my main goal is to "
    + "get into game development, I'm open to creating websites for people or buisnesses that want one made."],
    ["conclusion", "Please check out my projects! I'm available for both game development as well as creating and building websites."]
])

function copyEmail() {
    let copiedEmail = "branrtread@gmail.com";
    navigator.clipboard.writeText(copiedEmail);
    alert("Email copied to clipboard!");
}

function dialog() {
    const dialogBox = document.getElementById("info");
    switch (dialogBox.innerHTML) {
        case dialogOptions.get("intro"):
            dialogBox.innerHTML = dialogOptions.get("languages");
            break;
        case dialogOptions.get("languages"):
            dialogBox.innerHTML = dialogOptions.get("currently");
            break;
        case dialogOptions.get("currently"):
            dialogBox.innerHTML = dialogOptions.get("conclusion");
            break;
        case dialogOptions.get("conclusion"):
            dialogBox.innerHTML = dialogOptions.get("intro");
            break;   
        default:
            dialogBox.innerHTML = dialogOptions.get("intro");
            break;
    }
}

if(window.location.href == "https://branread.github.io/" || window.location.href == "https://branread.github.io/index.html") {

    setInterval(() => {
        
        if(triangleCursor.innerHTML == "▼"){
            triangleCursor.innerHTML = "▽";
        } else {
            triangleCursor.innerHTML = "▼";
        }
    }, 300)
}

email.addEventListener('click', copyEmail);
readMore.addEventListener('click', dialog);


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
        if(crow.isGoingRight) {
            crow.canvasPosition.x += 1;
        } else {
            crow.canvasPosition.x -= 1;
        }

        if(crow.canvasPosition.x > canvas.width){
            crow.isGoingRight = false;
            crow.image = crow.sprite.left;
        } else if (crow.canvasPosition.x < 0 - crow.dimensions.width) {
            crow.isGoingRight = true;
            crow.image = crow.sprite.right;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        crow.draw(context);
    }

    animation();
}