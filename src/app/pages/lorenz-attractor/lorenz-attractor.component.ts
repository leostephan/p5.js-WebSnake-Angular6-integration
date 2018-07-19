import { Component, OnInit } from '@angular/core';
import 'p5';

@Component({
  selector: 'app-lorenz-attractor-component',
  styleUrls: ['./lorenz-attractor.component.scss'],
  templateUrl: './lorenz-attractor.component.html'
})
export class LorenzAttractorComponent implements OnInit {

  private p5;

  public ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas() {
    const myCanvas = document.getElementById('my-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
  }

  private sketch(p: any) {
    let x = 0.01;
    let y = 0;
    let z = 0;

    const a = 10;
    const b = 28;
    const c = 8.0 / 3.0;

    const points: Array<PVector> = new Array<PVector>();

    p.setup = () => {
      p.createCanvas(600, 600);
      p.colorMode(p.HSB);
      p.background(0);
    };

    p.draw = () => {
      const dt = 0.01;
      const dx = (a * (y - x))  * dt * 2;
      const dy = (x * (b - z) - y) * dt * 2;
      const dz = (x * y - c * z) * dt * 2;
      x = x + dx;
      y = y + dy;
      z = z + dz;

      points.push(new PVector(x, y, z));

      p.translate(0, 0, -80);
      p.scale(5);
      p.stroke(255);

      p.noFill();

      let hu = 0.1;
      let incr = 1;
      p.beginShape();
      for (const v of points) {
        p.stroke(hu, 255, 255);
        p.vertex(50 + v.x * 1, 50 + v.y * 1);
        hu += incr;
        if (hu >= 255) {
          incr = -incr;
        }
        if (hu <= 0) {
          incr = -incr;
        }
      }
      p.endShape();
    };
  }
}

export class PVector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
