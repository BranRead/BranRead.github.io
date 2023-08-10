const attacks = {
    Tackle: {
        name: 'Tackle',
        physicalAffect: true,
        statAffect: false,
        damage: 10,
        type: 'Normal',
        color: 'black'
    },
    Fireball:  {
        name: 'Fireball',
        physicalAffect: true,
        statAffect: false,
        damage: 25,
        type: 'Fire',
        color: 'red'
    },
    DisarmingLook: {
        name: 'Disarming Look',
        physicalAffect: false,
        statAffect: true,
        stat: 'def',
        damage: 0,
        type: 'Normal',
        color: 'black'
    },
    SleepCharm: {
        name: "Sleep Charm",
        physicalAffect: false,
        statAffect: true,
        stat: 'slp',
        damage: 0,
        type: 'Psychic',
        color: 'purple'
    },
    WaterStaff: {
        name: 'Water Staff',
        physicalAffect: true,
        statAffect: false,
        damage: 30,
        type: 'water',
        color: 'blue'
    }
}