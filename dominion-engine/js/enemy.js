update(player,map){
  if(!this.cooldown) this.cooldown=0;

  this.cooldown--;
  if(this.cooldown>0) return;

  this.cooldown = 15; // move every 15 frames

  this.path=aStar({x:this.x,y:this.y},{x:player.x,y:player.y},map);
  if(this.path.length>1){
    this.x=this.path[1].x;
    this.y=this.path[1].y;
  }
}
