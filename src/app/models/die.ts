export class die {
  get totalWeight() {
    return this.w1 + this.w2 + this.w3 + this.w4 + this.w5 + this.w6
  }

  get w1Perc() {
    return (this.w1 / this.totalWeight) * 100
  }

  get w2Perc() {
    return (this.w2 / this.totalWeight) * 100
  }

  get w3Perc() {
    return (this.w3 / this.totalWeight) * 100
  }

  get w4Perc() {
    return (this.w4 / this.totalWeight) * 100
  }

  get w5Perc() {
    return (this.w5 / this.totalWeight) * 100
  }

  get w6Perc() {
    return (this.w6 / this.totalWeight) * 100
  }

  constructor(
    public id: string,
    public name: string,
    public w1: number,
    public w2: number,
    public w3: number,
    public w4: number,
    public w5: number,
    public w6: number
  ) {}
}
