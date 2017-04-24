/**
 * Creates a player.
 * 
 * @param {any} group Target group.
 * @param {any} x X position.
 * @param {any} y Y position.
 * @param {any} sprite Target sprite for player. Anchor is automatically set to 
 * the middle.
 * @param {Object} controllerKeymap Object containing the appropriate controllersKey:[phaser keys]  configuration 
 * pairs.
 * @returns Player instance.
 */
PlayerFactory = function (group, x, y, sprite, controllerKeymap) {
	player = group.create(x, y, sprite);
	player.anchor.set(0.5);

	randomColor = function (min, max) {
		return Math.random() * (max - min) + min
	};
	game.physics.enable(player)
	player.body.linearDamping = 1;
	player.body.collideWorldBounds = true;
	player.controller = new Controller(player, controllerKeymap);
	player.jumping = false
	player.cooldown = false;

	player.invulnerable = false;
	player.facing = 'idle'

	// animations
	idle = player.animations.add('idle')
	player.animations.add('idle', [0, 3, 5, 6, 7], 2, true)

	left = player.animations.add('left');
	player.animations.add('left', [1], 1, true)

	right = player.animations.add('right');
	player.animations.add('right', [2], 1, true)

	action = player.animations.add('action');
	player.animations.add('action', [3, 4, 0], 2, false)

	player.jumpTimer = 0

	player.jumpFactor = 1
	player.jumpBase = -260

	player.speedFactor = 1
	player.speedBase = 300


	player.update = function () {
		// collision
		player = this
		game.physics.arcade.collide(this, layer)
		game.physics.arcade.collide(this, enemies, function (player) {
			// the "death animation factory" should go here.
			player.kill();
		})


		/// Input
		if (this.controller.keyPressed(controllerKeys.LEFT)) {
			this.body.velocity.x = this.speedBase * this.speedFactor * -1;

			if (this.facing != 'left') {
				this.animations.play('left');
				this.facing = 'left';
			}
		}
		else if (this.controller.keyPressed(controllerKeys.RIGHT)) {
			this.body.velocity.x = this.speedBase * this.speedFactor;

			if (this.facing != 'right') {
				player.animations.play('right');
				this.facing = 'right';
			}
		}
		else {
			this.body.velocity.x = 0;

			if (this.facing != 'idle') {
				player.animations.stop();

				if (this.facing == 'left') {
					player.frame = 0;
				}
				else {
					player.frame = 5;
				}

				this.facing = 'idle';
				player.animations.play('idle')
			}
		}

		if (this.controller.keyPressed(controllerKeys.ACTION)) {
			player.animations.play('action');
		}

		if (this.controller.keyPressed(controllerKeys.JUMP) && this.body.onFloor()) {
			this.body.velocity.y = this.jumpBase * this.jumpFactor;
			this.jumpTimer = game.time.time + 220;
		}
		// Player is no longer on the ground, but is still holding the jump key
		else if (this.controller.keyPressed(controllerKeys.JUMP) && this.jumptimer != 0) {
			// Player has been holding jump for over the time limit, it's time to stop him
			if (this.jumpTimer < game.time.time) {
				this.jumpTimer = 0;
			}
			// Player is allowed to jump higher, not yet in the time limit
			else {
				this.body.velocity.y = this.jumpBase * this.jumpFactor;
			};
		}
		// Reset jump timer since the player is no longer holding the jump key
		else if (this.jumpTimer != 0) {
			this.jumpTimer = 0;
		};
		// if (this.alive) {
		//     if (this.controller == undefined) return;
		//     if (keyPressed(this.controller, controllerKeys.SHOOT)) {
		//         callback = function() {
		//             this.cooldown = false;
		//         };
		//         if (!this.cooldown) {
		//             this.weapon.fire();
		//             game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity);
		//             game.time.events.add(this.weapon.fireRate, callback, this)
		//             this.cooldown = true;
		//         }
		//     }
		// }
	}

	return player;
}

// Utils
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