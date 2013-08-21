ig.module(
	'game.entities.realSun'
).requires(
	'impact.entity'
).defines(function() {
	EntityRealSun = ig.Entity.extend({
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		
		collides: ig.Entity.COLLIDES.NEVER,
		
		maxVel: {x: 400, y: 400},
		friction: {x: 500, y: 0},
		size:{x:128,y:128},
		offset:{x:0,y:0},
		gravityFactor: 0,
		
		animSheet: new ig.AnimationSheet( 'media/sun.png', 128, 128 ),
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('idle', 1, [0]);
			this.currentAnim = this.anims.idle;
		},
		
		update: function() {
			this.parent();
			this.pos.x = ig.game.screen.x + ig.game.screen.x/40;
			this.pos.y = ig.game.screen.y + ig.game.screen.y/40;
		}
	});
});