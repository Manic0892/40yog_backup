ig.module('game.entities.staticImage').requires('impact.entity').defines(function() {
	EntityStaticImage = ig.Entity.extend({
		size:{x:64, y:64},
		
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.TYPE.NEVER,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255,224,122,0.4)',
		
		image: 'media/null.png',
				
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.animSheet = new ig.AnimationSheet(this.image,64,64);
			this.addAnim('idle', 1, [0]);
		}
	});
});