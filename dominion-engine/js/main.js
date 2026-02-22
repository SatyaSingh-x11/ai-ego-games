let gameState="menu";
let score=0;
let health=100;
import { Engine } from "./engine.js";
import { Map } from "./map.js";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

const TILE=32;
const map=new Map(40,25);
const player=new Player(5,5);
const enemy=new Enemy(30,15);

document.addEventListener("keydown",e=>{
 if(e.key==="ArrowUp") player.move(0,-1,map);
 if(e.key==="ArrowDown") player.move(0,1,map);
 if(e.key==="ArrowLeft") player.move(-1,0,map);
 if(e.key==="ArrowRight") player.move(1,0,map);
});

function update(){
  if(gameState!=="playing") return;

  enemy.update(player,map);

  if(enemy.x===player.x && enemy.y===player.y){
    health-=1;
    if(health<=0){
      gameState="gameover";
    }
  }

  score+=0.05;
}

function render(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 for(let y=0;y<map.rows;y++){
   for(let x=0;x<map.cols;x++){
     ctx.fillStyle=map.tiles[y][x]===1?"#222":"#000";
     ctx.fillRect(x*TILE,y*TILE,TILE,TILE);
   }
 }

 ctx.fillStyle="cyan";
 ctx.fillRect(player.x*TILE,player.y*TILE,TILE,TILE);

 ctx.fillStyle="red";
 ctx.fillRect(enemy.x*TILE,enemy.y*TILE,TILE,TILE);
}

const engine=new Engine(update,render);
engine.start();
