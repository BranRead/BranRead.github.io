class Door extends Boundary {
    constructor({
    enterFunction,
    gamePosition,
    dimensions
}) {
    super({
        gamePosition,
        dimensions
    })

    this.enterFunction = enterFunction;

   }
   draw(context) {
    context.fillStyle = 'rgba(0, 0, 255, 0.5)'
    context.fillRect(this.gamePosition.x, this.gamePosition.y, this.dimensions.width, this.dimensions.height)
}
}