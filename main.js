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
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;
var LAYER_HERO = 0;
var LAYER_OBJECT_ENEMY = 1;
var LAYER_ROCK = 2;
var LAYER_BUILDINGS = 3;
var LAYER_ROAD = 4;
var LAYER_BACKGROUND = 5;
var worldOffsetX = 0;

var tileset = document.createElement("img");
tileset.src = "tileset.png";

// Object variables
var player = new Player();
var keyboard = new Keyboard();
// var enemies = [];

// Force variables
var TILE = 50;
var METER = TILE;
var GRAVITY = METER * 9.8 *6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var XACCEL = MAXDX * 2;
var YACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;

// var musicBackground;
// var sfxFire;

function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH || y<0)
		return 1;
	if (y.SCREEN_HEIGHT)
		return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw || ty<0)
		return 1;
	if(ty>=MAP.th)
		return 0;
	return cells[layer][ty][tx];
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

// musicBackground = new Howl (
// {
	// urls: ["background.ogg"],
	// loop: true, 
	// buffer: true, 
	// volume: 0.5
// });
// musicBackground.play();

// sfxFire = new Howl(
// {
	// urls: ["explosion.wav"],
	// buffer: true,
	// volume: 0.5,
	// onend: function()
	// {
	// isSfxPlaying = false;
	// }
// })

// Add enemies
// idx = 0;
// for(var y = 0; y < level.layers[LAYER_OBJECT_ENEMY].height; y++)
// {
	// for(var x = 0; x < level1.layers[LAYER_OBJECT_ENEMY].width; x++)]
	// {
		//if(level1.layers[LAYER_OBJECT_ENEMY].data[idx] !0)
		//{
		//var px = tileToPixel(x);
		//var py = tileToPixel(y);
		//var e = new Enemy(px, py);
		//enemies.push(e);
		//}
		//idx++;
	//}
//}

// function runGame()
//{ 
	//Enemies
	//for(var i=0; i<enemies.length; i++)
	//{
		//enemies[i].update(deltaTime);
	//}
	//for(var i=0; i<enemies.length; i++)
	//{
		//enemies[i].draw(deltaTime);
	//}
	
		// Player vs Enemy collision
	// for(var i=0; i<enemies.length; i++)
	//{
		//if(interects(
				//player.position.x, player.position.y,
				//TILE, TILE,
				//enemies[i].position.x, enemies[i].position.y,
				//TILE, TILE) == true)
		//{
			//lives --;
			//player.position.y = 7* TILE;
			//player.position.x = 11 * TILE;
			//break;
		//}
	//}
//}
	

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	player.update(deltaTime); // update the player before drawing the map
	drawMap();
	player.draw();
}

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
