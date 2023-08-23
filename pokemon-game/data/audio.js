const audio = {
    Map: new Howl({
        src: '/pokemon-game/audio/map.wav',
        html5: true,
        volume: 0.1
    }),

    initBattle: new Howl({
        src: '/pokemon-game/audio/initBattle.wav',
        html5: true,
        volume: 0.05
    }),

    battle: new Howl({
        src: '/pokemon-game/audio/battle.mp3',
        html5: true,
        volume: 0.1
    }),

    tackleHit: new Howl({
        src: '/pokemon-game/audio/tackleHit.wav',
        html5: true,
        volume: 0.1
    }),

    initFireball: new Howl({
        src: '/pokemon-game/audio/initFireball.wav',
        html5: true,
        volume: 0.1
    }),

    fireballHit: new Howl({
        src: '/pokemon-game/audio/fireballHit.wav',
        html5: true,
        volume: 0.1
    }),

    victory: new Howl({
        src: '/pokemon-game/audio/victory.wav',
        html5: true,
        volume: 0.5
    }),
}
