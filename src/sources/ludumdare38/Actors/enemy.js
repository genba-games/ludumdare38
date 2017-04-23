EnemyFactory = function (group, x, y, sprite) {
	enemy = group.create(x, y, sprite);
	enemy.anchor.set(0.5);
    slouch = enemy.animations.add('slouch');
    enemy.animations.play('slouch',15,true)

    game.physics.enable(enemy)
    enemy.body.bounce.y = 0.5
    enemy.speedFactor = 1 
    enemy.speed = 150

    enemy.update = function(){
        if(this.body.velocity.x > 0 ){
            this.body.velocity.x = this.speed * this.speedFactor
        
        }else if(this.body.velocity.x == 0){
            this.speed = this.speed *-1
            this.body.velocity.x = this.speed * this.speedFactor
            this.movingTime = 0
        }
        // if(this.body.isMoving && this.movingTime>game.time.now){
        //     this.body.velocity.x = this.speed * this.speedFactor
        
        // }else if(!this.body.isMoving && this.movingTime<game.time.now){
        //     this.speed = this.speed *-1
        //     this.body.velocity.x = this.speed * this.speedFactor
        //     this.movingTime = 0
        // }else{
        //     this.body.velocity.x = this.speed * this.speedFactor
        //     this.movingTime = game.time.now + 200
        // }
        

    }
}