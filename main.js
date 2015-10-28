var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here-------------------------\\

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
// Maps and layer Variables
var LAYER_COUNT = 6;
var MAP = {tw:60, th:15};
var TILE = 50;
var TILESET_TILE = TILE;
var TILESET_PADDING = 0;
var TILESET_SPACING = 0;
var TILESET_COUNT_X = 24;
var TILESET_COUNT_Y = 24;
var LAYER_HERO = 0;
var LAYER_OBJECT_ENEMY = 1;
var LAYER_ROCK = 2;
var LAYER_BUILDINGS = 3;
var LAYER_ROAD = 4;
var LAYER_BACKGROUND = 5;
var worldOffsetX = 0;

var tileset = document.createElement("img");
tileset.src = "Bombatron - Tileset.png";

// Object variables
var player = new Player();
var keyboard = new Keyboard();
var Vector2 = new Vector2();
var Enemy = new Enemy();
var Keyboard = new Keyboard();

// Cell
var cells = [];

// Force variables
var TILE = 50;
var METER = TILE;
var MAXDX = METER * 5;
var MAXDY = METER * 5;
var XACCEL = MAXDX * 2;
var YACCEL = MAXDX * 2;
var FRICTIONX = MAXDX * 6;
var FRICTIONY = MAXDY * 6;

//Game state Variables
//var STATE_SPLASH = 0;
//var STATE_GAME = 1;
//var STATE_GAMEOVER = 2;
//var STATE_GAMEWIN = 3;
//var splashTimer = 300;
//var gameState = STATE_SPLASH;

function cellAtPixelCoord(layer, x,y)
{
	
};

function cellAtTileCoord(layer, tx, ty)
{
	
};

function tileToPixel(tile)
{
	return tile * TILE;
};

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};

function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
}

function drawMap()
{
	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for( var y = 0; y < level1.layers[layerIdx].height; y++ )
		{
			for( var x = 0; x < level1.layers[layerIdx].width; x++ )
			{
			if( level1.layers[layerIdx].data[idx] != 0 )
			{
				// the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
				// correct tile
				var tileIndex = level1.layers[layerIdx].data[idx] - 1;
				var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
				var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
				context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
			}
			idx++;
			}
		}
	}
}

function initialize() {
 	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { //----------------------------------------------------------- initialize the collision map
 		cells[layerIdx] = [];
 		var idx = 0;
 		for(var y = 0; y < level1.layers[layerIdx].height; y++) {
 			cells[layerIdx][y] = [];
 			for(var x = 0; x < level1.layers[layerIdx].width; x++) {
 				if(level1.layers[layerIdx].data[idx] != 0) {
 						//----------------------------------------------------------- for each tile we find in the layer data, we need to create 4 collisions *Bily: Not anymore
 						//----------------------------------------------------------- (because our collision squares are 35x35 but the tile in the
						//----------------------------------------------------------- level are 70x70)
 					cells[layerIdx][y][x] = 1;
 				}
 				else if(cells[layerIdx][y][x] != 1) {
					//----------------------------------------------------------- if we haven't set this cell's value, then set it to 0 now
 					cells[layerIdx][y][x] = 0;
				}
 				idx++;
 			}
	 	}
 	}
}

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	player.update(deltaTime); // update the player before drawing the map
	drawMap();
	player.draw();
}

//function runSplash()
//{
	//if(splashTimer > 0)
	//{
		//splashTimer --
	//}
	//if(splashTimer <=300)
	//{
		//context.drawImage(splash.image, 1, 1)
	//}
	
	//if(splashTimer <=0)
	//{
		//gameState = STATE_GAME;
		//return;
	//}
//}

//function runGameOver()
{
//	
//}

//function runGameWin()
//{
	
//}

//function run()
//{
	//switch(gameState)
	//{
		//case STATE_SPLASH:
		//runSplash();
		//break;
		//case STATE_GAME:
		//runGame();
		//break;
		//case STATE_GAMEOVER:
		//runGameOver();
		//break;
		//case STATE_GAMEWIN:
		//runGameWin();
		//break;
	//}
//}

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
