class HiddenItem extends Boundary {
    constructor({
    gamePosition,
}) {
    super({
        gamePosition,
    })

    this.pickupFunction = "";

   }
   draw(context) {
    context.fillStyle = 'rgba(0, 255, 0, 0.5)'
    context.fillRect(this.gamePosition.x, this.gamePosition.y, Boundary.width, Boundary.height)
}
}