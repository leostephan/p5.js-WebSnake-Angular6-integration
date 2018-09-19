import { Component, OnInit } from '@angular/core';
import 'p5';
import { Snake } from './Snake';
import { Food } from './Food';

@Component({
  selector: 'app-snake-component',
  styleUrls: ['./snake.component.scss'],
  templateUrl: './snake.component.html'
})
export class SnakeComponent implements OnInit {

  private p5;

  ngOnInit() {
    this.createCanvas();
    setTimeout(() => {
      document.getElementsByTagName('canvas')[1].style.zIndex = '1000';
      document.getElementsByTagName('canvas')[1].focus();
    }, 1000);
  }

  private createCanvas() {
    const myCanvas = document.getElementById('my-snake-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
  }

  private sketch(p: any) {
    let bestScore = 0;
    let s: Snake;
    let f: Food;

    p.setup = () => {
      p.createCanvas(600, 600);
      p.frameRate(10);
      s = new Snake(p);
      f = new Food(p, s);
      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 90) {
          console.log('UP');
          if (s.yspeed === 1 && s.tail.length !== 1) {
            return;
          }
          s.dir(0, -1);
        } else if (e.keyCode === 83) {
            console.log('DOWN');
            if (s.yspeed === -1 && s.tail.length !== 1) {
              return;
            }
            s.dir(0, 1);
        } else if (e.keyCode === 81) {
            console.log('LEFT');
            if (s.xspeed === 1 && s.tail.length !== 1) {
              return;
            }
            s.dir(-1, 0);
        } else if (e.keyCode === 68) {
            console.log('RIGHT');
            if (s.xspeed === -1 && s.tail.length !== 1) {
              return;
            }
                s.dir(1, 0);
        } else if (e.keyCode === 27) {
          if (s.tail.length > bestScore) {
            bestScore = s.tail.length - 1;
          }
          p.setup();
        }
      }, false);
    };

    p.draw = () => {
      p.background(51);
      s.update();
      s.show();
      f.show();
      if (s.x === f.x && s.y === f.y) {
        s.eat();
        f = new Food(p, s);
        f.show();
      }
      if (s.isDead()) {
        if (s.tail.length > bestScore) {
          bestScore = s.tail.length - 1;
        }
        p.setup();
      }
      p.textSize(32);
      p.fill(255);
      p.text('Score: ' + (s.tail.length - 1), 0, 32);
      p.text('Best score: ' + (bestScore), 0, 64);
    };
  }
}
