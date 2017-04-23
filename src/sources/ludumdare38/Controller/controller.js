controllerKeys = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    ACTION: 'action',
    JUMP: 'jump'
}

function keyPressed(controller, key) {
    key = controller.keys[key];
    if (key === true) return true;
    if (key === false) return false;
    for (i in key)
        if (game.input.keyboard.isDown(key[i]))
            return true;
    return false;
}

function Controller() {
    return {
        'keys': {
            [controllerKeys.UP]: [
                Phaser.Keyboard.W,
                Phaser.Keyboard.UP
            ],
            [controllerKeys.DOWN]: [
                Phaser.Keyboard.S,
                Phaser.Keyboard.DOWN
            ],
            [controllerKeys.LEFT]: [
                Phaser.Keyboard.A,
                Phaser.Keyboard.LEFT
            ],
            [controllerKeys.RIGHT]: [
                Phaser.Keyboard.D,
                Phaser.Keyboard.RIGHT
            ],
            [controllerKeys.ACTION]: [
                Phaser.Keyboard.X
            ],
            [controllerKeys.JUMP]: [
                Phaser.Keyboard.SPACEBAR,
                Phaser.Keyboard.Z
            ]
        }
    };
};