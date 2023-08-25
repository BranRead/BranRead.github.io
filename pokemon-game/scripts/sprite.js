class Sprite {
    constructor({ 
        position, 
        image, 
        frames = { max: 1, hold: 10 }, 
        sprites, 
        animate, 
        rotation = 0,
        
    }) {
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.image.src = image.src
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        
        this.rotation = rotation
    }

    draw() {
        game.ctx.save()
        game.ctx.translate(
            this.position.x + this.width / 2, 
            this.position.y + this.height / 2
        )
        game.ctx.rotate(this.rotation)
        game.ctx.translate(
            -this.position.x - this.width / 2, 
            -this.position.y - this.height / 2
        )
        game.ctx.globalAlpha = this.opacity
        game.ctx.drawImage(
            this.image, 
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max, 
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
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