export class Snake {
  public x: number;
  public y: number;
  public xspeed: number;
  public yspeed: number;
  public scl: number;
  public tail: number[][];
  public p: any;
  public bestScore: number;

  public constructor(p: any) {
    this.p = p;
    this.x = Math.floor(this.p.width / 2);
    this.y = Math.floor(this.p.height / 2);

    this.xspeed = 1;
    this.yspeed = 0;
    this.scl = 20;
    this.tail = [[this.x, this.y]];
  }

  public setP(p): void {
    this.p = p;
  }

  public update(): void {
    this.x += this.xspeed * this.scl;
    this.y += this.yspeed * this.scl;
    if (this.x > (this.p.width - this.scl)) {
        this.x = 0;
    }
    if (this.x < 0) {
        this.x = this.p.width - this.scl;
    }
    if (this.y > (this.p.height - this.scl)) {
        this.y = 0;
    }
    if (this.y < 0) {
        this.y = this.p.height - this.scl;
    }
    for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i][0] = this.tail[i + 1][0];
        this.tail[i][1] = this.tail[i + 1][1];
    }
    this.tail[this.tail.length - 1][0] = this.x;
    this.tail[this.tail.length - 1][1] = this.y;
  }

  public isDead(): boolean {
    for (let i = this.tail.length - 3; i > 0; i--) {
      if ((this.x === this.tail[i][0] && this.y === this.tail[i][1])) {
        return true;
      }
    }
    return false;
  }

  public show() {
    this.p.fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      this.p.fill(255);
      this.p.rect(this.tail[i][0], this.tail[i][1], this.scl, this.scl);
    }
  }

  public dir(x: number, y: number) {
    this.xspeed = x;
    this.yspeed = y;
  }

  public eat(): void {
    this.tail.push([this.x, this.y]);
  }

  public stop(): void {
    this.xspeed = 0;
    this.yspeed = 0;
  }
}
