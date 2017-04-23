// The play state contains the game
var playState = function () { };

playState.prototype =
    {
        // Setup functions
        preload: function () {
            // Function called first to load all the assets
            game.load.image('player', 'src/graphics/player.png');
        },
        create: function () {
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

            playerSprite = game.add.sprite(32,32,'player');
            player = PlayerFactory(players,50,50,playerSprite,Controller());

            game.physics.p2.enable(player);
        },
        bulletCollitionCallback: function (player, bullet) {
            callback = function () {
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
        update: function () {
            // Collision
            game.physics.arcade.collide(players, players);

            // Checks for collision of every player agains every bullet.
            for (var i in players.children) {
                game.physics.arcade.collide(players, players.children[i].weapon.bullets, this.bulletCollitionCallback);
                for (var j in players.children) {
                    game.physics.arcade.collide(players.children[i].weapon.bullets, players.children[j].weapon.bullets);

                }
            }
            // Checks for collision of players with the powerups
            game.physics.arcade.overlap(players, powerup, this.powerUpCallback);
        },

        // Helper Functions

    };
function mute() {
    if (music.isPlaying) {
        music.pause()
    }
    else {
        music.resume();
    }
}
