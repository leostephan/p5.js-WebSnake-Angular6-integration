import { Component, OnInit } from '@angular/core';
import 'p5';
import { Particle } from './Particle';

@Component({
  selector: 'app-perlin-noise-component',
  styleUrls: ['./perlin-noise.component.scss'],
  templateUrl: './perlin-noise.component.html'
})
export class PerlinNoiseComponent implements OnInit {
  private p5;
  private p52;

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    const myCanvas = document.getElementById('my-perlin-noise-canvas');
    this.p5 = new p5(this.sketch, myCanvas);
  }

  private sketch(p: any) {
    const inc = 0.1;
    const scl = 10;
    let cols;
    let rows;
    let zoff = 0;
    let fr;
    let particles: Array<Particle>;
    let flowField;

    p.setup = () => {
      p.createCanvas(800, 600);
      p.colorMode(p.HSB, 255);
      cols = p.floor(p.width / scl);
      rows = p.floor(p.height / scl);
      fr = p.createP('');

      particles = new Array();
      flowField = new Array(cols * rows);

      for (let i = 0; i < 300; i++) {
        particles[i] = new Particle(p);
      }
      p.background(0);
      p.frameRate(60);
    };

    p.draw = function() {
      let yoff = 0;
      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
          const v = p5.Vector.fromAngle(angle);
          v.setMag(1);
          flowField[index] = v;
          xoff += inc;
          p.stroke(0, 50);
        }
        yoff += inc;
        zoff += 0.0003;
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
