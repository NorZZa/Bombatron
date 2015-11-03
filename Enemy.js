var Enemy = function(x, y)
{
	
this.sprite = new Sprite("Tank3.png");
// ANIM_Left
this.sprite.buildAnimation(4, 2, 50, 34, 0.3, 
	[0, 1, 2, 3]);
// ANIM_RIGHT
this.sprite.buildAnimation(4, 2, 50, 34, 0.3,
	[4, 5, 6, 7]);

	this.position = new Vector2();
	this.position.set( 9*TILE, 0*TILE );
	
	this.width = 50;
	this.height = 50;
		
	this.velocity = new Vector2();

	this.moveRight = true;
	this.pause = 0;
};

 // var bullets = [];

Enemy.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	if(this.pause > 0)
	{
		this.pause -= dt;
	}
	else
	{
		var ddx = 0; 		//acceleration

		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE;	//True if enemy overlaps right
		var ny = (this.position.y)%TILE;	//True if enemey overlaps below
		var cell = cellAtTileCoord(LAYER_ROCKS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_ROCKS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_ROCKS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_ROCKS, tx + 1, ty + 1);

		// shoot

		// if(PlayerInRange == true)
		// {
			// ShootAtPlayer();
		// }
		


		if(this.moveRight)
		{
			if(celldiag && !cellright) {
				ddx = ddx + ENEMY_ACCEL;	//enemy wants to go right


			}
			else{
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}

		if(!this.moveRight)
		{
			if(celldown && !cell) {
				ddx = ddy - ENEMY_ACCEL;	//enemy wants to go left
			}
			else {
				this.velocity.x = 0;
				this.moveRight = true;
				this.pause = 0.5;
			}
		}

		//COLLISION
		if(this.velocity.y > 0)
	{	
			// Y-Down	
		if((celldown && !cell) || (celldiag && !cellright && nx))
		{
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0;
			ny = 0;
		}
	}
	// Y-Up
	else if (this.velocity.y < 0)
	{
		//if((cell && !celldown) || (cellright &&))
		{
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0;
			ny = 0;
		}
	}

	// X-Right
	if(this.velocity.x > 0)
	{
		if((cellright && !cell) || (celldiag && !celldown && ny))
		{
			this.position.x = tileToPixel(tx);
			this.velocity.x = 0;
		}
	}

	//X-Left
	else if (this.velocity.x < 0)
	{
		if((cell && !cellright) || (celldown && !celldiag && ny))
		{
			this.position.x = tileToPixel(tx + 1);
			this.velocity.x = 0;
		}
	}




		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (deltaTime * ddx),
													-ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

Enemy.prototype.draw = function()
{
	var screenX = this.position.x - worldOffsetX;
	this.sprite.draw(context, screenX, this.position.y);
}