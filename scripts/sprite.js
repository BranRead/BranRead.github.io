class Sprite {
    constructor({
                    // Position on spritesheet
                    spritesheetPosition = {
                        x: 0,
                        y: 0
                    },

                    // Position on gamemap
                    canvasPosition = {
                        x: 0,
                        y: 0
                    },

                    // key value pair of width and height (width, height)
                    dimensions,

                    image,


                    // boolean to control animation
                    animate,
                    sprite,
                    frames = { max: 1, hold: 10 },
                }) {

        this.spritesheetPosition = spritesheetPosition
        this.canvasPosition = canvasPosition
        this.dimensions = dimensions
        this.image = image
        this.image.onload = () => {

        }
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.src = image.src
        this.sprite = sprite
        this.animate = animate
        this.opacity = 1
    }

    draw(context, deltaTime) {
        // console.log(this.image.src)
        context.save()
        context.translate(
            this.canvasPosition.x + this.dimensions.width / 2,
            this.canvasPosition.y + this.dimensions.height / 2
        )

        context.translate(
            -this.canvasPosition.x - this.dimensions.width / 2,
            -this.canvasPosition.y - this.dimensions.height / 2
        )
        // Takes image, starting x position and starting y position to start drawing from, starting width and height for size from spritesheet
        // then takes destination position and dimensions
        // (image, sx, sy, swidth, sheigth, dx, dy, dwidth, dheight)
        context.drawImage(
            this.image,

            // sx
            this.spritesheetPosition.x + this.dimensions.width * this.frames.val,

            // sy
            this.spritesheetPosition.y,

            // swidth
            this.dimensions.width,

            // sheight
            this.dimensions.height,

            // dx
            this.canvasPosition.x,

            // dy
            this.canvasPosition.y,

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
}