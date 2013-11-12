Game.setupInput = function(){
	// first, the four directions, abstracted away from any particular input device
	Game.moveLeft = function(){
		Game.hero.moveBy(-1,0);
	};
	Game.moveUp = function(){
		Game.hero.moveBy(0,-1);
	};
	Game.moveRight = function(){
		Game.hero.moveBy(1,0);
	};
	Game.moveDown = function(){
		Game.hero.moveBy(0,1);
	};
	//
	// set up key event listener
    if (!Game.kdown) {
    	Game.kdown = function(e){
			var kc = e.keyCode;
			if (kc === 37) {
				Game.moveLeft();
			} else if (kc === 38) {
				Game.moveUp();
			} else if (kc === 39) {
				Game.moveRight();
			} else if (kc === 40) {
				Game.moveDown();
			}
		};    
    	document.addEventListener("keydown", Game.kdown);
    }
	// set up touch event listeners
    if (!Game.tstart) {
    	Game.tstart = function(e){
			var touch = e.touches[0]; // finger #1
			Game.tstartX = touch.pageX;
			Game.tstartY = touch.pageY;
		};
    	Game.tmove = function(e){
			var touch = e.touches[0]; // finger #1
			Game.lastTouchX = touch.pageX;
			Game.lastTouchY = touch.pageY;
			console.log("(" + touch.pageX + ", " + touch.pageY + ")");
			e.preventDefault(); // stop scroll and bounce on iOS
		};
		Game.tend = function(){
			var dx = Game.lastTouchX - Game.tstartX,
				dy = Game.lastTouchY - Game.tstartY;	
			if (Math.abs(dx) > Math.abs(dy)) {
				// horizontal swipe
				if(dx < 0) {
					Game.moveLeft();
				} else {
					Game.moveRight();
				}
			} else {
				// vertical swipe
				if(dy < 0) {
					Game.moveUp();
				} else  {
					dirY = 1;
					Game.moveDown();
				}
			}
		};
		document.addEventListener("touchstart", Game.tstart, true);
		document.addEventListener("touchmove", Game.tmove, true);
		document.addEventListener("touchend", Game.tend, true);
    }
};