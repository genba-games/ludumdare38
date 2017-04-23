/*
 * Creates an player.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for player. Anchor is automatically set to the middle.
 */
PlayerFactory = function (group, x, y, sprite, controls) {
	player = group.create(x, y, sprite);
	player.anchor.set(0.5);

	randomColor = function (min, max) {
		return Math.random() * (max - min) + min
	};
	// player.tint = randomColor(0xAAAAAA << 0, 0xFFFFFF << 0);

	player.controls = controls;
	player.cooldown = false;
	player.invulnerable = false;
	player.health = 2500;

	// Physics
	game.physics.arcade.enable([player]);
	player.body.bounce.set(0.8);
	player.body.maxVelocity = 300;
	player.body.drag.x = 1000;
	player.body.drag.y = 1000;
	
	player.acceleration = 1200;

	player.powerUpSpeed = 1;

	//weapon
	// player.weapon = WaveFactory(player, player.waveSprite);
	player.update = function () {
		/// Input
		if (this.alive) {
			if (this.controls == undefined) return;
			if (keyPressed(this.controls, controllerKeys.SHOOT)) {
				callback = function () {
					this.cooldown = false;
				};
				if (!this.cooldown) {
					this.weapon.fire();
					game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity);
					game.time.events.add(this.weapon.fireRate, callback, this)
					this.cooldown = true;
				}
			}
		}
				
	}
	
	return player;
}
