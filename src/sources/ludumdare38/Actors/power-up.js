// Array of dictionaries
// index = a powerup 
// info in each array element corresponds to a  variable
powerUp = [
    {
        time: 5,
        scale: 0.3,
        sprite:'box'
    },
]
powerUpFactory = function (group) {
    config = powerUp[game.rnd.integerRange(1,powerUp.length)]
    pUp = group.create(Math.random() * 700, Math.random() * 500, config.sprite);
    game.physics.arcade.enable([pUp]);
    pUp.config = config;
    return pUp;
}
