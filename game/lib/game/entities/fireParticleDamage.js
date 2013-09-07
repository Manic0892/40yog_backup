ig.module('game.entities.fireParticleDamage').requires('game.entities.particle', 'game.entities.ashParticleRising').defines(function() {
	EntityFireParticleDamage = EntityParticle.extend({
		checkAgainst: ig.Entity.TYPE.B,
		lifetime: .5,
		fadetime: .4,
		bounciness: 0,
		friction: {x:0,y:0},
		gravityFactor: 0,
		
		maxVel: {x:9999,y:9999},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			this.r = 255;
			this.g = 255;
			this.b = 0;
			this.color = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
			
			this.idleTimer = new ig.Timer();
			this.particleSize = 1;
			
			this.vel.x = ig.game.screen.x+settings.d.x - this.pos.x; 
			this.vel.y = settings.d.y+ ig.game.screen.y- this.pos.y;
			var vectorLength = Math.sqrt(this.vel.x*this.vel.x + this.vel.y*this.vel.y);
			this.vel.x /= vectorLength;
			this.vel.y /= vectorLength;
			this.vel.x*=500; //default 500
			this.vel.y*=500;
		},
		
		update: function() {
			this.particleSize += 1;
			
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1,0.1);
			this.g -= 10;
			this.parent();
		},
		
		draw: function() {
			this.parent();
			var x = this.pos.x - ig.game.screen.x;
			var y = this.pos.y - ig.game.screen.y;
			ig.system.context.beginPath();
			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
			ig.system.context.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
			ig.system.context.fill();
		},
		
		check: function(other) {
			if (!other.dead) {
				ig.game.spawnEntity(EntityAshParticleRising,this.pos.x,this.pos.y);
				other.receiveDamage( 2, this );
				this.kill();
			}
		}
	});
});