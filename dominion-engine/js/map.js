export class Map {
 constructor(cols, rows){
   this.cols = cols;
   this.rows = rows;
   this.tiles = [];
   this.generate();
 }

 generate(){
   for(let y=0;y<this.rows;y++){
     this.tiles[y]=[];
     for(let x=0;x<this.cols;x++){
       this.tiles[y][x]=Math.random()>0.2?1:0; // random walls
     }
   }
 }

 isWalkable(x,y){
   if(x<0||y<0||x>=this.cols||y>=this.rows) return false;
   return this.tiles[y][x]===1;
 }
}
