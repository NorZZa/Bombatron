/* global keyboard */
/* global Vector2 */

var Bomb = function(x, y, player)
{
	this.sprite = new Sprite("bomb.png");	//don't know what sprite you want to use
	this.sprite.buildAnimation();
	this.sprite.setAnimationOffset();
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.bombCooldown = 0;
}

Bomb.prototype.update = function(dt)
{
	this.sprite.update(dt);
	
	//code to drop bomb, play sound effect, and make it so that you can't spam bombs
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true && this.bombCooldown <= 0);
	{
		sfxBombDrop.play;
		this.bombCooldown = 5;
	}
	
	//I honestly have no idea how to set up explosions, sorry
}

Bomb.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}