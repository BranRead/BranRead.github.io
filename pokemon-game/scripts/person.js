class Person extends Sprite{
    constructor({
            name,
            team,
            inventory,
            position, 
            image, 
            frames = { max: 1, hold: 10 }, 
            sprites, 
            animate, 
            rotation = 0,
            monsterFriend,
        }) {
            super({
                position, 
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