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
	player.jumpTimer = 0
	player.yAxis = p2.vec2.fromValues(0, 1);

	//weapon
	// player.weapon = WaveFactory(player, player.waveSprite);
	player.update = function () {
		/// Input

		if (keyPressed(this.controls, controllerKeys.LEFT)) {
			this.body.moveLeft(200);

			// if (facing != 'left') {
			// 	this.animations.play('left');
			// 	facing = 'left';
			// }
		}
		else if (keyPressed(this.controls, controllerKeys.RIGHT)) {
			player.body.moveRight(200);

			// if (facing != 'right') {
			// 	player.animations.play('right');
			// 	facing = 'right';
			// }
		}
		else {
			player.body.velocity.x = 0;

			// if (facing != 'idle') {
			// 	player.animations.stop();

			// 	if (facing == 'left') {
			// 		player.frame = 0;
			// 	}
			// 	else {
			// 		player.frame = 5;
			// 	}

			// 	facing = 'idle';
			// }
		}

		if (keyPressed(this.controls,controllerKeys.JUMP) && game.time.now > this.jumpTimer && checkIfCanJump()) {
			player.body.moveUp(300);
			jumpTimer = game.time.now + 750;
		}

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
//utils
function checkIfCanJump() {

	var result = false;

	for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
		var c = game.physics.p2.world.narrowphase.contactEquations[i];

		if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
			var d = p2.vec2.dot(c.normalA, player.yAxis);

			if (c.bodyA === player.body.data) {
				d *= -1;
			}

			if (d > 0.5) {
				result = true;
			}
		}
	}

	return result;

}