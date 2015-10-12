var Player = function()
{
	//**TODO** - Sprite Animation
	this.image = document.createElement("img");
	//this.position = new Vector2();
	
	this.width = 23;
	this.height = 36;
	
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
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		drop = true;
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
	
}

Player.prototype.draw = function()
{
	//will need to update once sprite is done
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, this.position.x/7, this.position.y);
	context.restore();
}


















