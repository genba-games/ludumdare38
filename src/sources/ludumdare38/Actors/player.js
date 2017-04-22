/*
 * Creates an player.
 * :param group: Target group.
 * :param x: X position.
 * :param y: Y position.
 * :param sprite: Target sprite for player. Anchor is automatically set to the middle.
 */
PlayerFactory = function (group, x, y, sprite, waveSprite, controls, bullets) {
	player = group.create(x, y, sprite);
	player.anchor.set(0.5);
	player.waveSprite = waveSprite;

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
	// s.body.setCircle(25);
	player.body.bounce.set(0.8);
	player.body.maxVelocity = 300;
	player.body.drag.x = 1000;
	player.body.drag.y = 1000;
	
	player.acceleration = 1200;

	player.powerUpSpeed = 1;

	//weapon
	player.weapon = WaveFactory(player, player.waveSprite);
	player.update = function () {
		this.rotation = game.physics.arcade.angleToPointer(this, this.controls.pointer)

		/// Boundaries
		// Width
		if (this.position.x > game.width + this.width / 2)
			this.position.x = -this.width / 2 + 1;
		else if (this.position.x < -this.width / 2)
			this.position.x = game.width + this.width / 2 - 1;
		// Height
		if (this.position.y > game.height + this.height / 2)
			this.position.y = -this.height / 2 + 1;
		else if (this.position.y < -this.height / 2)
			this.position.y = game.height + this.height / 2 - 1;

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
		
		// Acceleration
		if (keyPressed(this.controls, controllerKeys.UP))
			this.body.acceleration.y = -this.acceleration;
		else if (keyPressed(this.controls, controllerKeys.DOWN))
			this.body.acceleration.y = this.acceleration;
		else
			this.body.acceleration.y = 0;
		if (keyPressed(this.controls, controllerKeys.LEFT))
			this.body.acceleration.x = -this.acceleration;
		else if (keyPressed(this.controls, controllerKeys.RIGHT))
			this.body.acceleration.x = this.acceleration;
		else
			this.body.acceleration.x = 0;			
	}
	
	return player;
}
