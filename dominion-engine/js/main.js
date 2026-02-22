import { Engine } from "./engine.js";
import { Map } from "./map.js";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const TILE = 32;
const map = new Map(60, 35);
const player = new Player(5, 5);

let enemies = [];
let gameState = "menu";
let score = 0;
let health = 100;

function spawnEnemies(count){
  enemies = [];
  for(let i=0;i<count;i++){
    enemies.push(new Enemy(
      Math.floor(Math.random()*map.cols),
      Math.floor(Math.random()*map.rows)
    ));
  }
}

document.addEventListener("keydown", e => {

  if(gameState === "menu" && e.key === "Enter"){
    gameState = "playing";
    spawnEnemies(3);
  }

  if(gameState === "gameover" && e.key === "r"){
    location.reload();
  }

  if(gameState !== "playing") return;

  if(e.key === "ArrowUp") player.move(0,-1,map);
  if(e.key === "ArrowDown") player.move(0,1,map);
  if(e.key === "ArrowLeft") player.move(-1,0,map);
  if(e.key === "ArrowRight") player.move(1,0,map);
});

function update(delta){

  if(gameState !== "playing") return;

  enemies.forEach(enemy => {
    enemy.update(player, map);

    if(enemy.x === player.x && enemy.y === player.y){
      health -= 10;
      if(health <= 0){
        gameState = "gameover";
      }
    }
  });

  score += delta * 10;
}

function render(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(gameState === "menu"){
    ctx.fillStyle = "white";
    ctx.font = "48px Arial";
    ctx.fillText("DOMINION ENGINE", canvas.width/2 - 220, 200);
    ctx.font = "22px Arial";
    ctx.fillText("Press ENTER to Start", canvas.width/2 - 130, 260);
    return;
  }

  if(gameState === "gameover"){
    ctx.fillStyle = "red";
    ctx.font = "48px Arial";
    ctx.fillText("GAME OVER", canvas.width/2 - 150, 200);
    ctx.font = "22px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Final Score: " + Math.floor(score), canvas.width/2 - 100, 250);
    ctx.fillText("Press R to Restart", canvas.width/2 - 110, 290);
    return;
  }

  // Draw map
  for(let y=0;y<map.rows;y++){
    for(let x=0;x<map.cols;x++){
      ctx.fillStyle = map.tiles[y][x] === 1 ? "#1e1e1e" : "#000";
      ctx.fillRect(x*TILE, y*TILE, TILE, TILE);
    }
  }

  // Draw player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x*TILE, player.y*TILE, TILE, TILE);

  // Draw enemies
  ctx.fillStyle = "red";
  enemies.forEach(enemy => {
    ctx.fillRect(enemy.x*TILE, enemy.y*TILE, TILE, TILE);
  });

  // UI Overlay
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Health: " + health, 20, 30);
  ctx.fillText("Score: " + Math.floor(score), 20, 55);
}

const engine = new Engine(update, render);
engine.start();
