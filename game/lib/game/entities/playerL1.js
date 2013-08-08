ig.module('game.entities.playerL1').requires('game.entities.player').defines(function() {
	EntityPlayerL1 = EntityPlayer.extend({
		sun: 100,
		maxSun: 100,
		
		sunSound: new ig.Sound('media/sound/sun.*'),
		sunSoundTrack: new ig.Music(),
		sunSoundPlaying: false,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			if (!ig.global.wm) {
				this.sunProp = ig.game.spawnEntity(EntitySun, this.pos.x, this.pos.y, {attachee: this});
				
				this.sunSoundTrack.add(this.sunSound);
				this.sunSoundTrack.volume = 1;
			}
		},
		
		update: function() {
			this.parent();
			
			if (ig.input.state('sun') && this.sun > 0) {
				var distanceFromPlayer = 700;
				var enemies = ig.game.getEntitiesByType(EntityEnemySpider);
				for (var i = 0; i < enemies.length; i++) {
					if (enemies[i].pos.x < this.pos.x+distanceFromPlayer && enemies[i].pos.x > this.pos.x - distanceFromPlayer && enemies[i].pos.y < this.pos.y+distanceFromPlayer && enemies[i].pos.y > this.pos.y - distanceFromPlayer) {
						enemies[i].receiveSunDamage(.5, this);
					}
				}
				this.sun--;
				this.sunProp.active = true;
				if (!this.sunSoundPlaying) {
					this.sunSoundTrack.play();
					this.sunSoundPlaying = true;
				}
			} else {
				this.sunProp.active = false;
				if (this.sunSoundPlaying) {
					this.sunSoundTrack.stop();
					this.sunSoundPlaying = false;
				}
			}
			
			this.sunProp.attacheeUpdate(this.pos.x, this.pos.y, this.size.x, this.size.y);
		},
		
		sunPowerup: function(amount) {
			this.sun += amount;
		}
	});
	
	EntitySun = ig.Entity.extend({
		size: {x:64, y:16},
		type: ig.Entity.TYPE.NONE,
		//checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		gravityFactor: 0,
		
		zIndex: 99999,
		
		active: false,
		
		init: function(x,y,settings) {
			this.parent(x,y,settings);
			
			this.pos.x = x;
			this.pos.y = y;

			this.attachedTo = settings.attachee;
		},
		
		attacheeUpdate: function(x,y,width,height) {
			this.pos = {x:x+(width/2), y:y+(height/2)};
		},
		
		draw: function() {
			this.parent();
			
			if (this.active) {				
				var x = this.attachedTo.pos.x - ig.game.screen.x+this.attachedTo.size.x/2;
				var y = this.attachedTo.pos.y - ig.game.screen.y+this.attachedTo.size.y/2;
				
				ig.system.context.rect(0,0,ig.system.width,ig.system.height);
				var grd = ig.system.context.createRadialGradient(x,y, 40, x, y, 1000);
				grd.addColorStop(0, 'rgba(255,255,0,1)');
				grd.addColorStop(.1, 'rgba(255,255,0,.3)');
				grd.addColorStop(1, 'rgba(255,255,0,0)');
				ig.system.context.fillStyle = grd;
				ig.system.context.fill();
			}
		}
	});
});