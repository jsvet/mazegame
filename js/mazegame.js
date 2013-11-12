//edit existing object literal
var Game = {
    stage : new createjs.Stage($("#stage")),
    tileSrcs : [
    	"img/floor.png",
    	"img/wall.png",
    	"img/lock.png",
    	"img/key.png"
    	],
    imgSrcs : [
    	"img/floor.png",
    	"img/wall.png",
    	"img/lock.png",
    	"img/key.png",
    	"img/pac.png"
    	],
    tiles : [],
    offsetX : 22,
    offsetY : 10,
    winTileType: 0,
    currentLevel : 0,
    clicks : 0
};

//new function expression
Game.showNextLevelBtn = function () {
    'use strict';
    var txt = new createjs.Text("next level>>", "18px Arial", "#FFF"),
        hitarea = new createjs.Shape(),
        hitW = txt.getMeasuredWidth(),
        hitH = txt.getMeasuredHeight(),
        hitX,
        button = new createjs.Container(),
        hitY;

    txt.x = 100;
    txt.y = 180;
    hitX = txt.x;
    hitY = txt.y;

    hitarea.graphics.beginFill("#069").drawRect(hitX, hitY, hitW, hitH);
    button.addChild(hitarea);
    button.addChild(txt);
    Game.stage.addChild(button);
    Game.stage.update();

    return button;
};

//edit existing
Game.showLevelOver = function () {
    'use strict';
    Game.stage.removeAllChildren();
    var nextBtn = Game.showNextLevelBtn(),
        perfect = Game.levels[Game.currentLevel].perfect,
        good = Game.levels[Game.currentLevel].good,
        ok = Game.levels[Game.currentLevel].ok;
    //this will visualize player skill with stars
    Game.showLevelStars(perfect, good, ok);

    //forget about the tiles used for current level
    Game.tiles = [];

    Game.currentLevel += 1;

    //hit.addEventListener("mousedown", this.mouseDown);
    nextBtn.addEventListener("mousedown", function () {
        Game.stage.removeAllChildren();
        Game.initModel();
    });
};



//create new function expression in the Game namespace
Game.isGameOver = function () {
    'use strict';
    var isWon = true, row, col, howManyFloors = 0;
    for (row = 0; row < Game.tiles.length; row += 1) {
        for (col = 0; col < Game.tiles[row].length; col += 1) {
            //if this tile is of the right type
            /*if (Game.tiles[row][col].type === 0) {
            	howManyFloors += 1;	
            	if (howManyFloors > 1) {
            		isWon = false;
            		 //leave loop entirely
                		break;
            		}
            }
            */
            if (Game.tiles[row][col].type !== Game.winTileType) {
                //if this tile is not the right type
                //level is certainly not won
                isWon = false;
                //no need to check more tiles
                //leave loop entirely
                break;
            }
        }
    }
    return isWon;
};

Game.init = function(){
	createjs.Ticker.addEventListener("tick", Game.stage);
	Game.initModel();
};

//edit existing function expression
Game.initModel = function () {
    'use strict';
    var type, col, row, tileRow, tile, heroX, heroY;
    //reset clicks to 0 at the beginning of each level
    Game.clicks = 0;

    Game.level = Game.levels[Game.currentLevel].grid;
    for (row = 0; row < Game.level.length; row += 1) {
        tileRow = [];
        for (col = 0; col < Game.level[row].length; col += 1) {
            type = Game.level[row][col];
            if (type === 9) {
            	//hero
            	type = 2; //hero is on a floor
            }
            tile = new Game.Tile(col, row, type);
            if(type === 4){
            	Game.door = tile;
            }
            
            tileRow.push(tile);
            Game.stage.addChild(tile);
        }
        Game.tiles.push(tileRow);
    }

    Game.hero = new Game.Hero(1,1);
    Game.stage.addChild(Game.hero);
    Game.setupInput();
    
    Game.stage.update();   
};

//update existing function
Game.update = function () {
    'use strict';
    var row, col, tile;
    for (row = 0; row < Game.tiles.length; row += 1) {
        for (col = 0; col < Game.tiles[row].length; col += 1) {
            tile = Game.tiles[row][col];
            tile.update();
        }
    }
    if (Game.isGameOver()) {
        //show level over scene
        Game.showLevelOver();
    }
    Game.stage.update();
};

/*Game.getTilesToToggle = function (ty, tx) {
    'use strict';
    var tileRight, tileLeft, tileBelow, tileAbove,
        toggleThese = [],
        currentTile = Game.tiles[ty][tx],
        maxRight = Game.level.length,
        maxDown = Game.level.length;

    toggleThese.push(currentTile);

    if (tx + 1 < maxRight) {
        tileRight = Game.tiles[ty][tx + 1];
        toggleThese.push(tileRight);
    }
    if (tx - 1 >= 0) {
        tileLeft = Game.tiles[ty][tx - 1];
        toggleThese.push(tileLeft);
    }

    if (ty + 1 < maxDown) {
        tileBelow = Game.tiles[ty + 1][tx];
        toggleThese.push(tileBelow);
    }

    if (ty - 1 >= 0) {
        tileAbove = Game.tiles[ty - 1][tx];
        toggleThese.push(tileAbove);
    }
    return toggleThese;
};*/



Game.Star = function (sx, sy) {
    'use strict';
    var my = new createjs.Bitmap("img/grey-star.png");
    my.x = sx;
    my.y = sy;
    Game.stage.addChild(my);
    Game.stage.update();
    my.gold = function () {
        my.image.src = "img/yellow-star.png";
        Game.stage.update();
    };
    return my;
};


Game.showLevelStars = function (perfect, good, ok) {
    'use strict';
    //show three grey stars by default
    var starLeft = new Game.Star(60, 110),
        starMiddle = new Game.Star(125, 100),
        starRight = new Game.Star(190, 110);

    //compare player performance with level parameters
    //make the left star golden if player performance was better than just ok  
    if (Game.clicks <= ok) {
        starLeft.gold();
    } else {
        console.log("You can do it better, can't you?");
    }

    //make the middle star golden if player performance was better than just good  
    if (Game.clicks <= good) {
        starLeft.gold();
        starMiddle.gold();
    }

    //make the last star golden if player performance was perfect
    if (Game.clicks <= perfect) {
        starLeft.gold();
        starMiddle.gold();
        starRight.gold();
    }
};

//you'll need to download preloadjs
//you'll need to link to it from index.html
//create a LoadQueue object
Game.preloader = new createjs.LoadQueue(false);
//add an event to be dispatched when loading is completed
Game.preloader.addEventListener("complete", Game.init);
//indicate an array of image files to preload
Game.preloader.loadManifest(Game.imgSrcs);


