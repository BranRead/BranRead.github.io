const email = document.getElementById("email");
const triangleCursor = document.getElementById("triangleCursor");
const readMore = document.getElementById("advanceText");

const dialogOptions = new Map([
    ["intro", "Having loved computers and technology my entire life, I switched careers and went back to school for programming. At my core I truly care for others, place a high value on my work and always strive to do better. I bring my passion and dedication to everything I do."],
    ["languages", "I have worked with Java, JavaScript, Node.JS, C, SQL, HTML, CSS and Bootstrap."],
    ["currently", "I'm also currently learning C# along with Unity and PHP. While my main goal is to "
    + "get into game development, I'm also open to creating websites for people or buisnesses that want one made."],
    ["conclusion", "Please check out my projects! I'm available for both game development as well as creating and building websites."]
])

function copyEmail() {
    let copiedEmail = "branrtread@gmail.com";
    navigator.clipboard.writeText(copiedEmail);
    alert("Copied!");
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

if(window.location.href == "http://127.0.0.1:5500/index.html") {

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
