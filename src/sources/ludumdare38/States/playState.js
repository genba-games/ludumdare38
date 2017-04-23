// The play state contains the game
var playState = function() {};

playState.prototype = {
    // Setup functions
    preload: function() {
        // Function called first to load all the assets
        game.load.image('player', 'src/graphics/player.png');
        game.load.image('tile', 'src/graphics/tile.png')
    },
    create: function() {
        // game.add.tileSprite(0, 0, 800, 480, 'background')
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.physics.p2.gravity.y = 350;
        game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        game.physics.p2.world.setGlobalStiffness(1e5);

        //  Music
        music = game.add.audio('main_audio');
        music.loop = true;
        music.play();
        // Music controls
        mute_key = game.input.keyboard.addKey(Phaser.Keyboard.M);
        mute_key.onDown.add(mute, this);

        // Group definitions
        players = game.add.group();
        powerup = game.add.group();

        playerSprite = game.add.sprite(32, 32, 'player');
        player = PlayerFactory(players, 50, 50, playerSprite, Controller());

        game.physics.p2.enable(player);

        player.body.fixedRotation = true;
        player.body.damping = 0.5;

        var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);
        var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        var boxMaterial = game.physics.p2.createMaterial('worldMaterial');

        game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

        for (var i = 1; i < 4; i++) {
            var box = game.add.sprite(300, 645 - (95 * i), 'box');
            game.physics.p2.enable(box);
            box.body.mass = 6;
            // box.body.static = true;
            box.body.setMaterial(boxMaterial);
        }

        var groundPlayerCM = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });
        var groundBoxesCM = game.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 });
    },
    bulletCollitionCallback: function(player, bullet) {
        callback = function() {
            player.invulnerable = false
            player.alpha = 1
        };
        if (!player.invulnerable) {
            player.alpha = 0.5
            player.health -= Math.abs(bullet.body.velocity.x) + Math.abs(bullet.body.velocity.y)
            if (0 > player.health) {
                player.kill()
            };
            player.invulnerable = true
            game.time.events.add(Phaser.Timer.SECOND * 2, callback, this)
        };
    },
    update: function() {
        // Collision
        game.physics.arcade.collide(players, players);
        // Checks for collision of players with the powerups
        game.physics.arcade.overlap(players, powerup, this.powerUpCallback);
    },
};

function mute() {
    if (music.isPlaying) {
        music.pause()
    }
    else {
        music.resume();
    }
}