
var menuState = function () { };
menuState.prototype =
    {
        preload: function () {
            // Load assets
            game.load.image('title_background', 'src/graphics/title_screen.png');
            game.load.image('whole_screen', 'src/graphics/whole_screen.png');
        },
        create: function () {
            // game.add.plugin(PhaserInput.Plugin);
            titleBackground = game.add.sprite(0, 0, 'title_background');
            backgroundTween = game.add.tween(titleBackground).to({x:-450,y:-280}, 10000,'Linear',false,0);
            backgroundTween.to({x:0,y:0}, 10000,'Linear',false,0);
            backgroundTween.loop(true);
            backgroundTween.start();

            wholeScreen = game.add.sprite(0, 0, 'whole_screen');
            wholeScreen.inputEnabled = true;
            wholeScreen.events.onInputDown.add(this.start_game, this);

            
        },
        start_game: function () {
            game.state.start('play');
        }
    };
