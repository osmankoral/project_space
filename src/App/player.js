import {GAME_WIDTH, GAME_HEIGHT} from './constants';

export class Player {

    angle = 0;

    score = 0;

    healt = 100;

    dead = false;

    isFire = false;

    LastfireAt = Date.now();

    lastScore = Date.now();
    

    FiredBullets = [];

    constructor(positionX,positionY){
        this.positionX = positionX;
        this.positionY = positionY;
    }



    update = (FireCb) =>{


        if (this.healt <= 0) {
            this.dead = true;
        }
        this.angle = (this.angle - 0.05) % 360;

        
    if((Date.now() - this.LastfireAt) > 250){

        if(this.isFire){
            FireCb(this.angle, GAME_WIDTH/2, GAME_HEIGHT/2);
        }
       
        
        window.addEventListener('click', e => {
            FireCb(this.angle, GAME_WIDTH/2, GAME_HEIGHT/2);
         });

          window.addEventListener('mousedown', e => {
            if((Date.now() - this.LastfireAt) > 30){
                this.isFire = true;
                  this.LastfireAt = Date.now();
            }
            
          });

          window.addEventListener('mouseup', e => {
            this.isFire = false;
          });

        this.LastfireAt = Date.now();
    }  


    }

    increaseScore = () => {
        if((Date.now() - this.lastScore)> 30){
        this.score += 10;
        this.lastScore = Date.now();
    }

    }
    
    deductHealth = () => {
        this.healt -= 10;
    }

    draw = (ctx) => {
        
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, 30, 0, 2 * Math.PI);
        
        ctx.fillStyle = 'cornflowerblue';
        ctx.fill();
        ctx.lineWidth = 0.3;
        ctx.stroke();

        ctx.font = '16px Arial';
        ctx.fillStyle = 'black'
        ctx.fillText(this.healt, GAME_WIDTH - 50, GAME_HEIGHT - 15);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black'
        ctx.fillText(this.score, 15, 25);
        

        ctx.fillStyle = 'green';
        const edgeX = Math.sin(this.angle) * 70;
        const edgeY = Math.cos(this.angle) * 70;
        ctx.beginPath();
        drawArrow(ctx, GAME_WIDTH/2, GAME_HEIGHT/2, GAME_WIDTH/2 + edgeX, GAME_HEIGHT/2 + edgeY);
        ctx.stroke();
    }
}
function drawArrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

