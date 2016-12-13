SkyEngineShowcase.MAIN = METHOD({

	run : function(params) {
		'use strict';
		
		var node1 = SkyEngine.Node({
			accelY : 9.8 * 10,
			alpha : 0.5
		}).appendTo(SkyEngine.Screen); // 0
		
		SkyEngine.Image({
			src : 'R/sample.png'
		}).appendTo(node1); // 0
		
		/*REPEAT(1000, function() {
			
			SkyEngine.Sprite({
				src : 'R/sprite.png',
				spriteWidth : 128,
				spriteHeight : 128,
				fps : 10
			}).appendTo(node1); // 1
		});*/
		
		SkyEngine.Sprite({
			src : 'R/sprite.png',
			spriteWidth : 128,
			spriteHeight : 128,
			fps : 10,
			z : 4
		}).appendTo(node1);
		
		SkyEngine.Sprite({
			srcs : ['R/Sprite2/frame1.png', 'R/Sprite2/frame2.png', 'R/Sprite2/frame3.png', 'R/Sprite2/frame4.png'],
			fps : 1,
			scale : 0.2,
			alpha : 0.2
		}).appendTo(node1); // 2
		
		SkyEngine.Dom({
			style : {
				color : '#000'
			},
			c : 'Test'
		}).appendTo(node1);
		
		node1.moveUp(50);
		node1.moveLeft(50);
		
		DELAY(3, function() {
			node1.stopUp();
			node1.stopLeft();
		});
	}
});
