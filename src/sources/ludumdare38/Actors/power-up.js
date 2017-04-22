// Array of dictionaries
// index = a powerup 
// info in each array element corresponds to a  variable
powerUp = [
    {
        time: 5,
        add: {
            'body.maxVelocity': 600,
            'powerUpSpeed': 2400,
        },
        tint: 0xffff00,
        sprite:'PUspeed'
    },
    {
        time: 5,
        add: {
            'acceleration':-600,
            'body.drag.x': 5000000000000,
            'body.drag.y': 5000000000000,
        },
        tint: 0x0000ff,
        sprite:'PUslow'
    },
    {
        time: 5,
        add: {
            'weapon.fireRate': -750,
        },
        tint: 0xff0000,
        sprite:'PUangeFry'
    },
    {
        time: 5,
        scale: 5,
        sprite:'PUbig'
    },
    {
        time: 5,
        scale: 0.3,
        sprite:'PUsmall'
    },
]
powerUpFactory = function (group) {
    config = powerUp[game.rnd.integerRange(1,powerUp.length)]
    pUp = group.create(Math.random() * 700, Math.random() * 500, config.sprite);
    game.physics.arcade.enable([pUp]);
    pUp.config = config;
    return pUp;
}
