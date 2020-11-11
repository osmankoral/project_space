import React, { useEffect } from 'react';
import {Player} from './player';
import {SCREEN, GAME_WIDTH, GAME_HEIGHT} from './constants'
import {Enemy} from './enemy'
import {randomNumber} from './utils'
import { Bullet } from './bullet';

const MAX_ENEMY_COUNT = 10;

function Game({setScreen, setScore, userName}) {
  let canvas;
  let ctx;
  let player;
  let lastEnemySpawnAt = Date.now();
  //let onFire = false;
  

  useEffect(() => {
	
    player = new Player(GAME_WIDTH/2, GAME_HEIGHT/2);
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
	
    let enemies = [];
    let bullets = [];

    const fireBulletCb = (angle, xPosition, yPosition) => bullets.push(new Bullet(angle, xPosition, yPosition));

	  setInterval(() => {
      
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      if (player.dead) {
        setScreen(SCREEN.GAME_OVER);
        setScore(player.score);
        return;
      }
      


      player.update(fireBulletCb);
      player.draw(ctx);






      const random1 = randomNumber(0,200);
      const random2 = randomNumber(0,200);

      if(enemies.length < MAX_ENEMY_COUNT && (Date.now() - lastEnemySpawnAt) > 1500){
        enemies.push(new Enemy(
        Math.random() < 0.5 ? randomNumber(- random1, GAME_WIDTH -random1)
          :randomNumber(GAME_WIDTH + random1, GAME_WIDTH / 2 + random1 ),
        Math.random() < 0.5 ? randomNumber(- random2, GAME_HEIGHT + random2)
          :randomNumber(GAME_HEIGHT + random2, GAME_HEIGHT / 2 + random2) 
        ));
          lastEnemySpawnAt = Date.now();
      }

      enemies = enemies.filter((enemy) => !enemy.dead);
      enemies.forEach((enemy) => {
          enemy.update(player, bullets);
          enemy.draw(ctx);
        });
     
      bullets = bullets.filter((bullet) => !bullet.dead);
      bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
      });

    }, 1000 / 30);
});

  return (
    
    <div>
      <canvas id="myCanvas" width={GAME_WIDTH} height={GAME_HEIGHT} style={ {border: '1px solid #000000'} }>

      </canvas>
    </div>
  
    );
}

export default Game;
