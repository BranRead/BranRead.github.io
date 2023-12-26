class Boundary {
    static width = 64
    static height = 64

    constructor({gamePosition}) {
        this.gamePosition = gamePosition
        this.dimensions = {
            width: Boundary.width,
            height: Boundary.height
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        ctx.fillRect(this.gamePosition.x, this.gamePosition.y, this.dimensions.width, this.dimensions.height)
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