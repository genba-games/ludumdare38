
var menuState = function () { };
menuState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('title_background', 'src/graphics/title_screen.png');
            game.load.image('whole_screen', 'src/graphics/whole_screen.png');
            game.load.image('logo', 'src/graphics/red_car.png');
        },

        create: function () {
            // game.add.plugin(PhaserInput.Plugin);
            titleBackground = game.add.sprite(0, 0, 'title_background');
            backgroundTween = game.add.tween(titleBackground);
            backgroundTween.to({x:-600,y:-380}, 10000,'Linear',true,0);

            logoTop = game.add.image(30, 300, 'logo');
            wholeScreen = game.add.sprite(0, 0, 'whole_screen');
            wholeScreen.inputEnabled = true;
            wholeScreen.events.onInputDown.add(this.start_game, this);
        },
        update: function () {

        },
        start_game: function () {
            game.state.start('play');
        }
    };
