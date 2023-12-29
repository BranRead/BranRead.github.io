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
}