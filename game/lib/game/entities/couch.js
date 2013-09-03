ig.module('game.entities.couch').requires('impact.entity').defines(function() {
	EntityCouch = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/couch.png', 128, 64),
		
		size: {x:128,y: 64},
		
		offset:{x:0,y:0},
		
		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		
		health: 100,
		
		zIndex: -1,
		
		bulletDamage: false,
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('init', 1, [0]);
			this.addAnim('damaged', 1, [1]);
			this.addAnim('dead', 1, [2]);
			
			this.currentAnim = this.anims.init;
		},
		
		update: function() {
			this.parent();
			
			if (this.health >50) {
				this.currentAnim = this.anims.init;
			} else if (this.health > 0) {
				this.currentAnim = this.anims.damaged;
			} else if (this.health < 0) {
				this.currentAnim = this.anims.dead;
			}
		},
		
		kill: function() {
			//just keeps you from losing the couch when it's dead
		},
		
		receiveSunDamage: function(damage, other) {
			damage *= 4;
			this.receiveDamage(damage, other);
			if (this.health > 0) {
				for (i = 0; i < 1; i++) {
					ig.game.spawnEntity(EntityAshParticle, this.pos.x, this.pos.y, {width: this.size.x, height: this.size.y});
				}
			}
		}
	});
});