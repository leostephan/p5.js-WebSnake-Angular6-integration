
export class Food {
  public x: number;
  public y: number;
  public s: any;
  public p: any;

  public constructor(p, s) {
    this.p = p;
    this.s = s;
    this.x = MyMaths.approachNumberByMult(p.random(p.width), s.scl);
    this.y = MyMaths.approachNumberByMult(p.random(p.height), s.scl);
  }

  public show(): void {
    this.p.fill(100, 255, 0);
    this.p.rect(this.x, this.y, this.s.scl, this.s.scl);
  }
}

export class MyMaths {
  public static approachNumberByMult(n: number, m: number): number {
    const approx = n - n % m;
    return approx;
  }
}
