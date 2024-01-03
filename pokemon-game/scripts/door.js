class Door extends Boundary {
    constructor({
    gamePosition,
}) {
    super({
        gamePosition,
    })

    this.enterFunction = "";

   }
   draw(context) {
    context.fillStyle = 'rgba(0, 0, 255, 0.0)'
    context.fillRect(this.gamePosition.x, this.gamePosition.y, Boundary.width, Boundary.height)
}
}