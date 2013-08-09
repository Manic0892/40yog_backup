ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.ashParticle',
	'game.entities.bloodParticle',
	'game.entities.character',
	'game.entities.player',
	'game.entities.enemySpider',
	'game.entities.enemySpiderBoss',
	'game.entities.healthPowerup',
	'game.entities.level1Logic',
	'game.entities.levelLogic',
	'game.entities.mainMenu',
	'game.entities.particle',
	'game.entities.particleSpawner',
	'game.entities.player',
	'game.entities.playerL1',
	'game.entities.powerup',
	'game.entities.sunPowerup',
	
		
	'game.levels.main',
	'game.levels.mainMenu',
	
	'impact.debug.debug',
	
	'plugins.perpixel',
	'plugins.gui',
	'plugins.pause'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity:500,
	
	clearColor: '#ffffff',
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	scale: 1,
	
	
	init: function() {
		ig.soundManager.volume = .1;
		this.loadLevel(LevelMain);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	}
});

ig.setNocache(true);

ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});