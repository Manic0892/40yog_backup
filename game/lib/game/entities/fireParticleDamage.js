ig.module('game.entities.fireParticleDamage').requires('game.entities.particle', 'game.entities.ashParticle').defines(function() {
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
			other.receiveDamage( 2, this );
			this.kill();
		}
	});
});


//
//
//});
//
///*
//Base entity class for particle entities. Subclass your own particles from
//this class. See the EntityDebrisParticle in debris.js for an example.
//
//Particle entities will kill themselfs after #lifetime# seconds. #fadetime#
//seconds before the #lifetime# ends, they will start to fade out.
//
//The velocity of a particle is randomly determined by its initial .vel 
//properties. Its Animation will start at a random frame.
//*/
//
//ig.module(
//	'game.entities.ashParticle'
//)
//.requires(
//	'game.entities.particle'
//)
//.defines(function(){
//
//	EntityAshParticle = EntityParticle.extend({
//		alpha: 1,
//		
//		lifetime: 1,
//		fadetime: .4,
//		bounciness: 0.1,
//		friction: {x:100, y: 100},
//		zIndex: 0,
//		maxVel: {x:500,y:500},
//		gravityFactor: .5,
//		
//		
//		init: function( x, y, settings ) {
//			this.pos.x = x+Math.floor(Math.random()*settings.width);
//			this.pos.y = y+Math.floor(Math.random()*settings.height);
//			this.color = Math.floor(Math.random()*255);
//			
//			this.particleSize = Math.random()*5;
//			
//			this.idleTimer = new ig.Timer();
//		},
//		
//		
//		update: function() {
//			if( this.idleTimer.delta() > this.lifetime ) {
//				this.kill();
//				return;
//			}
//			this.alpha = this.idleTimer.delta().map(
//				this.lifetime - this.fadetime, this.lifetime,
//				1, 0
//			);
//			this.parent();
//		},
//		draw: function() {
//			this.parent();
//			var x = this.pos.x - ig.game.screen.x;
//			var y = this.pos.y - ig.game.screen.y;
//			ig.system.context.beginPath();
//			ig.system.context.arc(x, y, this.particleSize, 0, Math.PI*2, true);
//			ig.system.context.fillStyle = 'rgba(' + this.color + ',' + this.color + ',' + this.color + ',' + this.alpha + ')';
//			ig.system.context.fill();
//		}
//	});
//
//
//});