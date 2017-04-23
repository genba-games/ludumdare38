var Combo = function(keys, callback) {
    this.keys = keys;
    this.numComboKeys = keys.length;
    this.callback = callback;
    this.progress = 0;

    this.reset = function() {
        this.progress = 0;
    };

    this.receiveKey = function(key) {
        if (key == this.keys[this.progress]) {
            this.progress += 1;
            if (this.progress == this.numComboKeys) {
                //  Code acknowledged! Do the magic!
                this.callback();
                // Reset the combo
                this.reset();
            }
        }
        else this.reset();
    };
}

/**
 * Looks out for combos
 * @param {Object} controller Player controller.
 */
function ComboChecker(controller) {
    // Controller reference
    this.controller = controller;
    // Player reference
    this.player = this.controller.player;
    // Time limit (in ms) between keypresses before resetting combos
    this.keyResetTimer = 300;

    // Combo callbacks
    this.function1 = function() {
        console.log('Combo 1 activated');
        this.player.tint = 0x0000FF;
    }.bind(this);

    this.function2 = function() {
        console.log('Combo 2 activated');
        this.player.tint = 0x00FF00;
    }.bind(this);

    this.function3 = function() {
        console.log('Combo 3 activated');
        this.player.tint = 0xFF0000;
    }.bind(this);

    //  Setup the combos
    this.combos = [];
    var ck = controllerKeys;
    combos.push(
        new Combo([ck.LEFT, ck.LEFT, ck.RIGHT, ck.RIGHT, ck.ACTION], function1),
        new Combo([ck.LEFT, ck.RIGHT, ck.LEFT, ck.RIGHT, ck.ACTION], function2),
        new Combo([ck.LEFT, ck.UP, ck.RIGHT, ck.ACTION], function3)
    );

    // Setup combo reset timer
    this.resetCombos = function() {
        for (var i = 0; i < combos.length; i++)
            combos[i].reset();
    };
    this.keyTimer = game.time.events.loop(keyResetTimer, resetCombos, this);

    // Bind to the provided controller
    this.receiveKey = function(key, controllerKey) {
        console.log('COMBO\tKey recieved:', controllerKey)
        // Reset the reset timer
        game.time.events.remove(this.keyTimer);
        this.keyTimer = game.time.events.loop(keyResetTimer, resetCombos, this);
        // Register keys
        for (var i = 0; i < this.combos.length; i++)
            this.combos[i].receiveKey(controllerKey);
    }
    for (var controllerKey in controller.keymap) {
        keyCodes = controller.keymap[controllerKey];
        for (var keyCode in keyCodes) {
            keyCode = keyCodes[keyCode];
            var key = game.input.keyboard.addKey(keyCode);
            key.onDown.add(this.receiveKey, this, 0, controllerKey)
        } 
    }
}
