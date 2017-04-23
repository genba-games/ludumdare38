var Combo = function(keys, callback) {
    const keys = keys;
    const numComboKeys = keys.length;
    const callback = callback;
    var progress = 0;

    const receiveKey = function(key) {
        if (key == keys[progress]) {
            progress += 1;
            if (progress == numComboKeys) {
                //  Code acknowledged! Do the magic!
                callback();
            }
        }
        else progress = 0;
    }

    const reset = function() {
        progress = 0;
    }
}

/**
 * Looks out for combos
 * @param {Player} player Player assigned to this controller.
 * @param {Object} controller Player controller.
 */
var ComboChecker = function(player, controller) {
    // Player reference
    const player = player;

    //  Define the combos
    const combos = [];
    combos.push(Combo([LEFT, LEFT, RIGHT, RIGHT, SHOOT], RainbowBarf));
    combos.push(Combo([LEFT, RIGHT, LEFT, RIGHT, SHOOT], function2));
    combos.push(Combo([LEFT, SHOOT, RIGHT, SHOOT, SHOOT], function3));

    // Time limit (in ms) between keypresses before resetting combos
    const keyResetTimer = 300;
    const resetCombos = function() {
        console.log('Resetting combos.');
        for (var i = 0; i < combos.length; i++)
            combos[i].reset();
    }
    // Loop resetting timers
    var keyTimer = game.time.events.loop(keyResetTimer, resetCombos, this).start();

    // Bind this ComboChecker to the provided controller
    const receiveKey = function(key) {
        // Reset the reset timer
        keyTimer.delay = keyResetTimer;
        // Register keys
        for (var i = 0; i < Combos.length; i++)
            combos[i].receiveKey(key);
    }
    for (key in controller.keys){
        keyCode = controller.keys[key];
        const key = game.input.keyboard.addKey(Phaser.keyboard.keyCode);
        key.onDown.add(receiveKey, this, 0, key)
    }
    

    const function1 = function() {
        console.log('Combo 1 activated');
        player.tint = 0xFF0000;
    }

    const function2 = function() {
        console.log('Combo 2 activated');
        player.tint = 0x00FF00;
    }

    const function3 = function() {
        console.log('Combo 3 activated');
        player.tint = 0x0000FF;
    }
}