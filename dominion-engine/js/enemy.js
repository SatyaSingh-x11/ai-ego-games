import { aStar } from "./pathfinding.js";

export class Enemy {
 constructor(x,y){
   this.x=x;
   this.y=y;
   this.path=[];
 }

 update(player,map){
   this.path=aStar({x:this.x,y:this.y},{x:player.x,y:player.y},map);
   if(this.path.length>1){
     this.x=this.path[1].x;
     this.y=this.path[1].y;
   }
 }
}
