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

	player.controller = new Controller(player, controllerKeymap);
	player.cooldown = false;
	player.invulnerable = false;
	player.health = 2500;

	//weapon
	// player.weapon = WaveFactory(player, player.waveSprite);
	player.update = function () {
		// Input
		// if (this.alive) {
		// 	if (this.controller == undefined) return;
		// 	if (this.controller.keyPressed(controllerKeys.ACTION)) {
		// 		callback = function () {
		// 			this.cooldown = false;
		// 		};
		// 		if (!this.cooldown) {
		// 			this.weapon.fire();
		// 			game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity);
		// 			game.time.events.add(this.weapon.fireRate, callback, this)
		// 			this.cooldown = true;
		// 		}
		// 	}
		// }	
	}
	
	return player;
}
