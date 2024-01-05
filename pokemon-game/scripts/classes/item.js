class Item extends Sprite {
    constructor({
        spritePosition,
        gamePosition,
        dimensions = {
            width: 32,
            height: 32
        },
        image,
        sprites,
        animate = false,
        frames = { max: 1, hold: 10 },
        rotation = 0,

        name,
        quantity = 1,
        useCategory,
        description,
        strength = null,
        boost = null
    }) {
        super({
            spritePosition,
            gamePosition,
            dimensions,
            image,
            sprites,
            animate,
            frames,
            rotation
        })
        this.name = name;
        this.quantity = quantity;
        this.useCategory = useCategory;
        this.description = description;
        this.strength = strength;
        this.boost = boost
    }
}