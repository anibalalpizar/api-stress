export class DelaySimulator {
  private defaultMin: number;
  private defaultMax: number;

  constructor(defaultMin = 0, defaultMax = 1000) {
    this.defaultMin = defaultMin;
    this.defaultMax = defaultMax;
  }

  public async simulate(min?: number, max?: number): Promise<void> {
    const delayMin = min ?? this.defaultMin;
    const delayMax = max ?? this.defaultMax;

    const delay =
      Math.floor(Math.random() * (delayMax - delayMin + 1)) + delayMin;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}
