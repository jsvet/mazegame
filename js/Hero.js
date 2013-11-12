Game.Hero = function (myX, myY) {
    'use strict';
    var my = new createjs.Bitmap("img/pac.png");
    
    my.moveTo = function(newX, newY, tween){
    	var newXpx, newYpx;
    	my.posX = newX;
    	my.posY = newY;

    	if (tween) {
    		// find out where we want to go, then start tweening
			newXpx = my.posX * my.image.width + Game.offsetX;
			newYpx = my.posY * my.image.height + Game.offsetY;
    		createjs.Tween.get(my).to({x:newXpx, y:newYpx}, 200);
    	} else {
    		// just jump to the correct position
    	    my.x = my.posX * my.image.width + Game.offsetX;
    		my.y = my.posY * my.image.height + Game.offsetY;
    	}
    	
    	Game.stage.update();
    };
    my.moveBy = function(dirX, dirY){
    	var testX = my.posX + dirX,
    		testY = my.posY + dirY,
    		tileToTest,
    		ttype;
    	
    	// find out if we are 'inside' the world  		
    	if (testX < 0 || testY < 0 || testX > 4 || testY > 4) { // if its a door and you dont have the key
    		return;
    	}
    	
    	//get the tile we want to test
    	tileToTest = Game.tiles[testY][testX];
    	ttype = tileToTest.type; //and its type
    	
    	//find out if we arent able to walk (wall/locked door)
    	if (ttype === 1 || ttype ===2 ) {
    		return;
    	} else if (ttype === 5) { //this is a key
    		tileToTest.changeTo(0); // key becomes floor
    		Game.door.changeTo(0); // change to an open door **
    	}
    	
    	// ok now we can move
    	my.moveTo(testX, testY, true);
    };
    my.moveTo(myX, myY);
    return my;
};