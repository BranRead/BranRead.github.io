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
}