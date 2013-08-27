ig.module('game.entities.couch').requires('impact.entity').defines(function() {
	EntityCouch = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/couch.png', 128, 64),
		
		size: {x:128,y: 64},
		
		offset:{x:0,y:0},
		
		type: ig.Entity.TYPE.NEITHER,
		collides: ig.Entity.COLLIDES.FIXED,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.addAnim('init', 1, [0]);
			this.addAnim('damaged', 1, [1]);
			this.addAnim('dead', 1, [2]);
			
			this.currentAnim = this.anims.init;
		}
	});
});