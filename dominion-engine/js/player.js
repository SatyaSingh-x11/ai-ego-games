export class Player {
 constructor(x,y){
   this.x=x;
   this.y=y;
 }

 move(dx,dy,map){
   const nx=this.x+dx;
   const ny=this.y+dy;
   if(map.isWalkable(nx,ny)){
     this.x=nx;
     this.y=ny;
   }
 }
}
