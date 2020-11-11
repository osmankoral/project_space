import {GAME_WIDTH, GAME_HEIGHT} from './constants';


export class Bullet {

    dead = false;
    angle;
    xPosition;
    yPosition;

    speed = 7;

    constructor(angle, xPosition, yPosition){
        this.angle = angle;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    update = () => {
        if(this.xPosition < 0 || GAME_WIDTH < this.xPosition){
            this.dead = true;
        }

        if(this.yPosition < 0 || GAME_HEIGHT < this.yPosition){
            this.dead = true;
        }
        
        const x = Math.sin(this.angle) * this.speed;
        const y = Math.cos(this.angle) * this.speed;
        this.xPosition += x;
        this.yPosition += y;
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.xPosition, this.yPosition, 5, 0, 2 * Math.PI );
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 0.3;
        ctx.stroke();
    }
}