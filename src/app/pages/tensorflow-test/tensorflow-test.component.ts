import { Component, OnInit } from '@angular/core';
import 'p5';

@Component({
  selector: 'app-tensorflow-test-component',
  styleUrls: ['./tensorflow-test.component.scss'],
  templateUrl: './tensorflow-test.component.html'
})
export class TensorFlowTestComponent implements OnInit {
  private p5;

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    const myCanvas = document.getElementById('my-tensorflow-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
    setTimeout(() => {
      document.getElementsByTagName('canvas')[0].focus();
    }, 500);
  }

  private sketch(p: any) {

    const memoryArray = Array();

    p.setup = () => {
      const myCanvas = p.createCanvas(innerWidth - 280, innerHeight - 150);
      myCanvas.class = 'my-tensorflow-canvas';
      p.colorMode(p.HSB, 255);
      p.background(0);
      p.frameRate(60);
      const curr = new p5.Vector();
      curr.x = p.width / 2;
      curr.y = p.height / 2;
      memoryArray.push(curr);
    };

    p.draw = function() {
      p.background(0);
      p.fill(255);
      /* const npoints = p.map(p.mouseX, 0, p.width, 3, 30, true);
      polygon(p.width / 2, p.height / 2, 200, npoints); */
      const randX = p.random(-1, 1);
      const randY = p.random(-1, 1);
      const newPoint = new p5.Vector();
      newPoint.x = p.map(memoryArray[memoryArray.length - 1].x + 10 * randX, 0, 1, 0, 1);
      newPoint.y = memoryArray[memoryArray.length - 1].y + 10 * randY;
      memoryArray.push(newPoint);
      let hu = 0.1;
      for (let i = 0; i < memoryArray.length - 1; i++) {
        p.stroke(hu % 255, 255, 255);
        p.line(memoryArray[i].x, memoryArray[i].y, memoryArray[i + 1].x, memoryArray[i + 1].y);
        hu += 0.1;
      }
    };

    /*function polygon(x, y, radius, npoints) {
      const angle = p.TWO_PI / npoints;
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += angle) {
        const sx = x + p.cos(a) * radius;
        const sy = y + p.sin(a) * radius;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    }*/
  }
}
