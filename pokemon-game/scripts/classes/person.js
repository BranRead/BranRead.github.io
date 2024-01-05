class Person extends Sprite{
    constructor({
            name,
            team,
            inventory,
            spritePosition,
            gamePosition, 
            dimensions,
            image, 
            frames = { max: 1, hold: 10 }, 
            sprites, 
            animate, 
            rotation = 0,
            monsterFriend,
        }) {
            super({
                spritePosition,
                gamePosition, 
                dimensions, 
                image, 
                frames, 
                sprites, 
                animate, 
                rotation,
            })
        this.name = name;
        this.team = team;
        this.inventory = inventory;
        this.monsterFriend = monsterFriend;
    }

    draw(context, gamePosition) {
        // console.log(this.image.src)
        context.save()
        context.translate(
            gamePosition.x + this.dimensions.width / 2, 
            gamePosition.y + this.dimensions.height / 2
        )
        context.rotate(this.rotation)
        context.translate(
            -gamePosition.x - this.dimensions.width / 2, 
            -gamePosition.y - this.dimensions.height / 2
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
            gamePosition.x,
            
            // dy
            gamePosition.y,
            
            // dwidth
            this.dimensions.width,
            
            // dheight
            this.dimensions.height
        );
        context.restore()
        
        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed++
        }

        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0  
            }
    }
}