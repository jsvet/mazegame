Game.Tile = function (myX, myY, myType) {
    'use strict';
    var my = new createjs.Bitmap(Game.tileSrcs[myType]);
    my.type = myType;
    my.posX = myX;
    my.posY = myY;
    my.x = my.posX * my.image.width + Game.offsetX;
    my.y = my.posY * my.image.height + Game.offsetY;

    my.update = function () {
        my.image.src = Game.tileSrcs[my.type];
    };

   /* //edit Game.Tile.onPress  Allows the tiles to toggle back and forth
    my.addEventListener("mousedown", function () {
        var i, tempTile, tilesToToggle;

        //register a used click
        Game.clicks += 1;

        tilesToToggle = Game.getTilesToToggle(my.posY, my.posX);
        for (i = 0; i < tilesToToggle.length; i += 1) {
            tempTile = tilesToToggle[i];
            tempTile.toggle();
        }
    }); */


    my.toggle = function () {
        if (my.type === 1) {
            my.type = 0;
        } else {
            my.type = 1;
        }
        Game.update();
    };
    return my;
};