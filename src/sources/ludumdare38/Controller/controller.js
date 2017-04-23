controllerKeys = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    SHOOT: 'shoot',
}

function Controller() {
    return {
        'keys': {
            'up':
            [
                Phaser.Keyboard.W,
                Phaser.Keyboard.UP
            ],
            'down':
            [
                Phaser.Keyboard.S,
                Phaser.Keyboard.DOWN
            ],
            'left':
            [
                Phaser.Keyboard.A,
                Phaser.Keyboard.LEFT
            ],
            'right':
            [
                Phaser.Keyboard.D,
                Phaser.Keyboard.RIGHT
            ],
            'action': [
                Phaser.Keyboard.X
            ],
            'jump': [
                Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.Z
            ]
        },
        'pointer': game.input.activePointer,
    };
};