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
      // Border walls
      if(x===0 || y===0 || x===this.cols-1 || y===this.rows-1){
        this.tiles[y][x]=0;
      } else {
        this.tiles[y][x]=1;
      }
    }
  }

  // Add random obstacles but not too many
  for(let i=0;i<150;i++){
    const rx=Math.floor(Math.random()*this.cols);
    const ry=Math.floor(Math.random()*this.rows);
    if(rx>2 && ry>2 && rx<this.cols-3 && ry<this.rows-3){
      this.tiles[ry][rx]=0;
    }
  }
 }
   }
 }

 isWalkable(x,y){
   if(x<0||y<0||x>=this.cols||y>=this.rows) return false;
   return this.tiles[y][x]===1;
 }
}
