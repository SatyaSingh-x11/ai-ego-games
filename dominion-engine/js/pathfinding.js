export function heuristic(a,b){
 return Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
}

export function aStar(start, goal, map){
 let open=[start];
 let cameFrom={};
 let gScore={};
 let fScore={};

 const key=(p)=>p.x+","+p.y;

 gScore[key(start)]=0;
 fScore[key(start)]=heuristic(start,goal);

 while(open.length>0){
   open.sort((a,b)=>fScore[key(a)]-fScore[key(b)]);
   let current=open.shift();

   if(current.x===goal.x && current.y===goal.y){
     let path=[current];
     while(key(current) in cameFrom){
       current=cameFrom[key(current)];
       path.push(current);
     }
     return path.reverse();
   }

   const neighbors=[
     {x:current.x+1,y:current.y},
     {x:current.x-1,y:current.y},
     {x:current.x,y:current.y+1},
     {x:current.x,y:current.y-1},
   ];

   neighbors.forEach(n=>{
     if(!map.isWalkable(n.x,n.y)) return;

     let tentative=gScore[key(current)]+1;
     if(!(key(n) in gScore) || tentative<gScore[key(n)]){
       cameFrom[key(n)]=current;
       gScore[key(n)]=tentative;
       fScore[key(n)]=tentative+heuristic(n,goal);
       if(!open.find(p=>p.x===n.x&&p.y===n.y)) open.push(n);
     }
   });
 }

 return [];
}
