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
  }

  private createCanvas() {
    const myCanvas = document.getElementById('my-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
  }

  private sketch(p: any) {
    let bestScore = 0;
    let s: Snake;
    let f: Food;

    p.setup = () => {
      s = new Snake(p);
      f = new Food(p, s);
      p.createCanvas(600, 600);
      console.log(s);
      p.frameRate(10);
      p.print(s.tail);
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

    p.keyPressed = () => {
      if (p.keyCode === p.UP_ARROW) {
          if (s.yspeed === 1 && s.tail.length !== 1) {
            return;
          }
          s.dir(0, -1);
      } else if (p.keyCode === p.DOWN_ARROW) {
          if (s.yspeed === -1 && s.tail.length !== 1) {
            return;
          }
          s.dir(0, 1);
      } else if (p.keyCode === p.LEFT_ARROW) {
          if (s.xspeed === 1 && s.tail.length !== 1) {
            return;
          }
          s.dir(-1, 0);
      } else if (p.keyCode === p.RIGHT_ARROW) {
          if (s.xspeed === -1 && s.tail.length !== 1) {
            return;
          }
              s.dir(1, 0);
      } else if (p.keyCode === 32) {
        s.stop();
      } else if (p.keyCode === 27) {
        if (s.tail.length > bestScore) {
          bestScore = s.tail.length - 1;
        }
        p.setup();
      }
    };
  }
}
