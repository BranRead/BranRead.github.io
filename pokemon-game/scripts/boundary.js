class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        game.ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
        game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
};

//Just in case this is needed later.
//Could combine the two to make a more flexible boundary class?
// class Rectangle {
//     constructor({
//         width, 
//         height, 
//         position
//     }){
//         this.width = width;
//         this.height = height;
//         this.position = position
//     }

//     drawRect(fillStyle = 'white'){
//         game.ctx.fillStyle = fillStyle;
//         game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//     }
// }