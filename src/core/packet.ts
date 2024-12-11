export class PacketLossSimulator {
  private defaultRate: number;

  constructor(defaultRate = 0) {
    this.defaultRate = defaultRate;
  }

  public shouldDrop(rate?: number): boolean {
    const effectiveRate = rate ?? this.defaultRate;
    return Math.random() * 100 < effectiveRate;
  }
}
