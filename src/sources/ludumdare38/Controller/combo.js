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
        else {
            progress = 0;
        }
    }

    const reset = function() {
        progress = 0;
    }
}

/**
 * 
 * @param {Player} player Player assigned to this controller.
 */
var ComboChecker = function(player) {
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
        for (var i = 0; i < combos.length; i++)
            combos[i].reset();
    }
    // Loop resetting timers
    var keyTimer = game.time.events.loop(keyResetTimer, resetCombos, this).start();

    const receiveKey = function(key) {
        // Reset the reset timer
        keyTimer.delay = keyResetTimer;
        // Register keys
        for (var i = 0; i < Combos.length; i++)
            combos[i].receiveKey(key);
    }

    const function1 = function() {
        console.log('Combo 1 activated');
    }

    const function2 = function() {
        console.log('Combo 2 activated');
    }

    const function3 = function() {
        console.log('Combo 3 activated');
    }
}