import { Component, OnInit } from '@angular/core';
import 'p5';
import { Particle } from './Particle';
import { GlobalVariablesService } from '../../globals';

@Component({
  selector: 'app-perlin-noise-component',
  styleUrls: ['./perlin-noise.component.scss'],
  templateUrl: './perlin-noise.component.html',
})
export class PerlinNoiseComponent implements OnInit {
  private p5;

  private globals: GlobalVariablesService;

  public constructor(globals: GlobalVariablesService) {
    this.globals = globals;
  }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    const myCanvas = <HTMLCanvasElement> document.getElementById('my-perlin-noise-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
  }

  private sketch(p: any) {
    let inc;
    let scl;
    let cols;
    let rows;
    let fr;
    let particles: Array<Particle>;
    let flowField;
    let lastPosition;

    p.setup = () => {
      inc = 0.1;
      scl = 10;
      const myCanvas = p.createCanvas(innerWidth - 18, innerHeight);
      myCanvas.class = 'my-perlin-noise-canvas';
      p.colorMode(p.HSB, 255);
      cols = p.floor(p.width / scl);
      rows = p.floor(p.height / scl);
      fr = p.createP('');

      particles = new Array();
      flowField = new Array(cols * rows);

      for (let i = 0; i < 300; i++) {
        particles[i] = new Particle(p);
      }
      p.background(14);
      p.frameRate(60);

      lastPosition = 0;
    };

    p.windowResized = function() {
      p.resizeCanvas(innerWidth - 280, innerHeight - 150);
      p.background(0);
    };

    p.draw = function() {
      if (GlobalVariablesService.nextPageClicked) {
        if (lastPosition - document.documentElement.scrollTop > 0 && document.documentElement.scrollTop <= 500) {
          GlobalVariablesService.nextPageClicked = false;
          lastPosition = document.documentElement.scrollTop;
        } else {
          lastPosition = document.documentElement.scrollTop;
          return;
        }
      } else {
        if (document.documentElement.scrollTop > 500) {
          return;
        }
        lastPosition = document.documentElement.scrollTop;
      }

      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = p.noise(xoff + p.mouseX, yoff + p.mouseY) * p.TWO_PI * 4;
          const v = p5.Vector.fromAngle(angle);
          v.setMag(1);
          flowField[index] = v;
          xoff += inc;
          p.stroke(0, 50);
        }
        yoff += inc;
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
      }
    };
  }
}
