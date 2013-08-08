ig.module('game.entities.mainMenu').requires('impact.entity').defines(function(){
	EntityMainMenu = ig.Entity.extend({
		name: 'mainMenu',
		
		font: new ig.Font( 'media/impact_bitmap.png' ),
	
		redFont: new ig.Font('media/impact_bitmap_red.png'),
		
		items: [
			{text:'PLAY',exec:function() {
				ig.game.loadLevel(LevelMain);
			}
			}],
		
		hitboxList: [],
		
		initOffset : 100,
		
		ySpacing: 25,
		
		currSelected: null,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.4)',
		
		collision: ig.Entity.COLLIDES.NONE,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		size: {x:50, y:50},
		offset: {x:50,y:50},
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			
			if (!ig.global.wm) {
				for (var i = 0; i < this.items.length; i++) {
					var width = this.font.widthForString(this.items[i].text);
					var height = this.font.heightForString(this.items[i].text);
					console.log(height);
					
					var pos1 = {x:ig.system.width/2 - width/2, y:this.initOffset+i*this.ySpacing};
					var pos2 = {x:ig.system.width/2 + width/2, y:this.initOffset+i*this.ySpacing+height};
					
					this.hitboxList.push(new hitbox(pos1, pos2, i));
				}
				
				ig.input.initMouse();
				ig.input.bind(ig.KEY.MOUSE1, 'shoot');
			}
		},
		
		update: function() {
			this.parent();
			
			this.currSelected = null;
			
			for (var i = 0; i < this.hitboxList.length; i++) {
				if (this.hitboxList[i].isTouching(ig.input.mouse.x, ig.input.mouse.y)) {
					this.currSelected = this.hitboxList[i].key;
				}
			}
			
			if (ig.input.state('shoot') && this.currSelected != null)
				this.items[this.currSelected].exec();
		},
		
		draw: function() {
			this.parent();
			
			if (!ig.global.wm) {
				for (var i = 0; i < this.items.length; i++) {
					if (i != this.currSelected)
						this.font.draw(this.items[i].text, ig.system.width/2, this.initOffset + i*this.ySpacing, ig.Font.ALIGN.CENTER);
					else
						this.redFont.draw(this.items[i].text, ig.system.width/2, this.initOffset + i*this.ySpacing, ig.Font.ALIGN.CENTER);
				}
			}
		},
		
		
		createHitbox: function(xy1,xy2,key) {
			this.hitboxList.push(new hitbox(xy1,xy2,key));
		}
	});
	
	
});


var hitbox = function(xy1,xy2,key) {
	this.pos1 = {};
	this.pos2 = {};
	this.pos1.x = xy1.x;
	this.pos1.y = xy1.y;
	this.pos2.x = xy2.x;
	this.pos2.y = xy2.y;
	
	this.key = key;
	
	this.isTouching = function(x,y) {
		return (x > this.pos1.x && x < this.pos2.x && y > this.pos1.y && y < this.pos2.y);
	}
}


/*
 *
 *This could all be done better with entities and using native hitbox detection--but this might work better for text, so I'm trying it out this way
 *
 */