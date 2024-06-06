class Sprite {
    constructor({
        
        // On spritesheet
        spritePosition = {
            x: 0,
            y: 0
        },
        
        // Position on gamemap
        gamePosition = {
            x: 0,
            y: 0
        }, 
        
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
        this.image.onload = () => {
            
        }
        this.frames = {...frames, val: 0, elapsed: 0}
            this.image.src = image.src
            this.animate = animate
            this.sprites = sprites
            this.opacity = 1
            
            this.rotation = rotation
        
    }

    draw(context, deltaTime) {
        // console.log(this.image.src)
        context.save()
        context.translate(
            this.gamePosition.x + this.dimensions.width / 2, 
            this.gamePosition.y + this.dimensions.height / 2
        )
        context.rotate(this.rotation)
        context.translate(
            -this.gamePosition.x - this.dimensions.width / 2, 
            -this.gamePosition.y - this.dimensions.height / 2
        )
        context.globalAlpha = this.opacity
        // Takes image, starting x position and starting y position to start drawing from, starting width and height for size from spritesheet
        // then takes destination position and dimensions
        // (image, sx, sy, swidth, sheigth, dx, dy, dwidth, dheight)
        context.drawImage(
            this.image, 
            
            // sx
            this.spritePosition.x + this.dimensions.width * this.frames.val,
            
            // sy
            this.spritePosition.y,
            
            // swidth
            this.dimensions.width, 
            
            // sheight
            this.dimensions.height,
            
            // dx
            this.gamePosition.x,
            
            // dy
            this.gamePosition.y,
            
            // dwidth
            this.dimensions.width,
            
            // dheight
            this.dimensions.height
        );
        context.restore()
        
        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed += 1 * deltaTime;
        }

        if(this.frames.elapsed > this.frames.hold) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val++;
                this.frames.elapsed = 0;
            }
            else this.frames.val = 0
        }
    }
};