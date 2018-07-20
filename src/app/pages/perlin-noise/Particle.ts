export class Particle {
  public pos: p5.Vector;
  public prevPos: p5.Vector;
  public vel: p5.Vector;
  public acc: p5.Vector;
  public maxSpeed: number;
  public h: number;
  public p: any;

  public constructor(p: any) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.prevPos = this.pos.copy();
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxSpeed = 4;
    this.h = 0;
  }

  public update(): void {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  public follow(vectors: Array<p5.Vector>): void {
    const x = this.p.floor(this.pos.x / 10);
    const y = this.p.floor(this.pos.y / 10);
    const index = x + y * this.p.floor(this.p.width / 10);
    const force = vectors[index];
    this.applyForce(force);
  }

  public applyForce(force: p5.Vector): void {
    this.acc.add(force);
  }

  public show(): void {
    this.p.stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    this.p.strokeWeight(1);
    this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  public updatePrev(): void {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  public edges(): void {
    if (this.pos.x > this.p.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = this.p.width;
      this.updatePrev();
    }
    if (this.pos.y > this.p.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p.height;
      this.updatePrev();
    }
  }
}
