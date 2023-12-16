// Original draw image function.
// This will help refactor code back to what it was. 
// this.image, 
//             // sx
//             this.frames.val * this.width,
//             // sy
//             0,
//             // swidth
//             this.image.width / this.frames.max, 
//             // sheight
//             this.image.height,
//             // dx
//             this.position.x,
//             // dy
//             this.position.y,
//             // dwidth
//             this.image.width / this.frames.max,
//             // dheight
//             this.image.height

// class Sprite {
//     constructor({
//         // Key value of x and y (startPosX, startPosY)
//         // On spritesheet
//         spritePosition,
//         // Position on gamemap
//         // (gamePosX, gamePosY)
//         gamePosition, 
//         // key value pair of width and height (startWidth, startHeight)
//         dimensions,
//         image, 
//         sprites,
//         // boolean to control animation
//         animate, 
//         frames = { max: 1, hold: 10 },
//         rotation = 0,
        
//     }) {
//         this.spritePosition = spritePosition
//         this.gamePosition = gamePosition
//         this.dimensions = dimensions
//         this.image = new Image()
//         this.frames = {...frames, val: 0, elapsed: 0}
//         this.image.src = image.src
//         this.animate = animate
//         this.sprites = sprites
//         this.opacity = 1
        
//         this.rotation = rotation
//     }

//     draw() {
//         game.ctx.save()
//         game.ctx.translate(
//             this.position.x + this.width / 2, 
//             this.position.y + this.height / 2
//         )
//         game.ctx.rotate(this.rotation)
//         game.ctx.translate(
//             -this.position.x - this.width / 2, 
//             -this.position.y - this.height / 2
//         )
//         game.ctx.globalAlpha = this.opacity
//         // Takes image, starting x position and starting y position to start drawing from, starting width and height for size from spritesheet
//         // then takes destination position and dimensions
//         // (image, sx, sy, swidth, sheigth, dx, dy, dwidth, dheight)
//         game.ctx.drawImage(
//             this.image, 
//             // sx
//             this.frames.val * this.width,
//             // sy
//             0,
//             // swidth
//             this.image.width / this.frames.max, 
//             // sheight
//             this.image.height,
//             // dx
//             this.position.x,
//             // dy
//             this.position.y,
//             // dwidth
//             this.image.width / this.frames.max,
//             // dheight
//             this.image.height
//         );
//         game.ctx.restore()
        
//         if(!this.animate) return

//         if(this.frames.max > 1) {
//             this.frames.elapsed++
//         }

//         if(this.frames.elapsed % this.frames.hold === 0) {
//             if(this.frames.val < this.frames.max - 1) this.frames.val++
//             else this.frames.val = 0  
//             }
//     }
// };

class Sprite {
    constructor({
        // Key value of x and y (startPosX, startPosY)
        // On spritesheet
        spritePosition,
        // Position on gamemap
        // (gamePosX, gamePosY)
        gamePosition, 
        // key value pair of width and height (width, height)
        dimensions,
        image, 
        sprites,
        // boolean to control animation
        animate, 
        frames = { max: 1, hold: 10 },
        rotation = 0,
        
    }) {
        this.spritePosition = spritePosition
        this.gamePosition = gamePosition
        this.dimensions = dimensions
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.src = image.src
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        
        this.rotation = rotation
    }

    draw() {
        game.ctx.save()
        game.ctx.translate(
            this.position.gamePositionX + this.dimensions.width / 2, 
            this.position.gamePositionY + this.dimensions.height / 2
        )
        game.ctx.rotate(this.rotation)
        game.ctx.translate(
            -this.position.gamePositionX - this.dimensions.width / 2, 
            -this.position.gamePositionY - this.dimensions.height / 2
        )
        game.ctx.globalAlpha = this.opacity
        // Takes image, starting x position and starting y position to start drawing from, starting width and height for size from spritesheet
        // then takes destination position and dimensions
        // (image, sx, sy, swidth, sheigth, dx, dy, dwidth, dheight)
        game.ctx.drawImage(
            this.image, 
            // sx
            this.spritePosition.x,
            // sy
            this.spritePosition.x,
            // swidth
            this.dimensions.width, 
            // sheight
            this.dimensions.height,
            // dx
            this.position.gamePositionX,
            // dy
            this.position.gamePositionY,
            // dwidth
            this.dimensions.width,
            // dheight
            this.dimensions.height
        );
        game.ctx.restore()
        
        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0  
            }
    }
};