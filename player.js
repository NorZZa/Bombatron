var Player = function()
{
	//**TODO** - Sprite Animation
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 51;
	this.height = 50;
	
	//this.position = new Vector2();
	//this.position.set( 9*TILE, 0*TILE );
	
	this.velocity = new Vector2();
	
	this.image.src = "idle(1).png"
}

Player.prototype.update = function(deltaTime)
{
	var keyboard = new Keyboard();
	var left = false;
	var right = false;
	var up = false;
	var down = false;
	var drop = false;
	this.cooldownTimer=0;
	
	if(this.cooldownTimer>0)
	{
		this.cooldownTimer -=deltaTime;
	}
	
	//Check keypress events
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
	{
		left = true;
	}
	if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
	{
		right = true;
	}
	if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
	{
		up = true;
	}
	if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
	{
		down = true;
	}
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true&& this.cooldownTimer <= 0);
	{
		drop = true;
		var	tempBomb = new Bomb((this.position.x), this.position.y);
		this.cooldownTimer=0.3;
		tempBomb.position.x = player.position.x;
		tempBomb.position.y = player.position.y;
		Bombs.push(tempBomb);
	}
	
	//movement code
	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var wasup = this.velocity.y < 0;
	var wasdown = this.velocity.y > 0;
	var ddx = 0;
	var ddy = 0;
	//left
	if(left)
	{
		ddx = ddx - XACCEL;
	}
	else if(wasleft)
	{
		ddx = ddx + FRICTION;
	}
	//right
	if(right)
	{
		ddx = ddx + XACCEL;
	}
	else if(wasright)
	{
		ddx = ddx - FRICTION;
	}
	//up
	if(up)
	{
		ddy = ddy - YACCEL;
	}
	else if(wasup)
	{
		ddy = ddy + FRICTION;
	}
	//down
	if(down)
	{
		ddy = ddy + YACCEL;
	}
	if(wasdown)
	{
		ddy = ddy - FRICTION
	}
	
	//collision detection \\probs need to be tested*****************************************
	//Variables
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE;
	var ny = (this.position.y)%TILE;
	var cell = cellAtTileCoord(LAYER_ROCKS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_ROCKS, tx + 1, ty);
	var cellleft = cellAtTileCoord(LAYER_ROCKS, tx - 1, ty);
	var celldown = cellAtTileCoord(LAYER_ROCKS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_ROCKS, tx + 1, ty + 1);
	//actual collision 
	if(this.velocity.y > 0)
	{
		//Y down
		if((celldown && !cell) || (celldiag && !cellright && nx))
		{
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0
			ny = 0;
		}
	}
		//Y Up
		else if (this.velocity.y < 0)
	{
		if((cell && !celldown) || (cellright && !celldiag && nx))
		{
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0;
			ny = 0;
		}
	}
		//X Right
		if(this.velocity.x > 0)
	{
			if((cellright && !cell) || (celldiag && !celldown && ny))
			{
				this.position.x = tileToPixel(tx);
				this.velocity.x = 0;
			}
	}
		//X Left
		else if (this.velocity.x < 0)
	{
		if((cell && !cellright) || (celldown && !celldiag && ny))
		{
			this.position.x = tileToPixel(tx + 1);
			this.velocity.x = 0;
		}
	}
}

Player.prototype.draw = function()
{
	//will need to update once sprite is done
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}
















