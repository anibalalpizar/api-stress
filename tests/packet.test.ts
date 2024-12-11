import { PacketLossSimulator } from "../src/core";

describe("PacketLossSimulator", () => {
  let packetLossSimulator: PacketLossSimulator;

  beforeEach(() => {
    packetLossSimulator = new PacketLossSimulator();
  });

  it("should return false when packet loss rate is 0", () => {
    const result = packetLossSimulator.shouldDrop(0);
    expect(result).toBeFalsy();
  });

  it("should return true when packet loss rate is 100", () => {
    const result = packetLossSimulator.shouldDrop(100);
    expect(result).toBeTruthy();
  });

  it("should have statistical distribution close to expected rate", () => {
    const simulationCount = 10000;
    const testRate = 30;

    let dropCount = 0;
    for (let i = 0; i < simulationCount; i++) {
      if (packetLossSimulator.shouldDrop(testRate)) {
        dropCount++;
      }
    }

    const observedRate = (dropCount / simulationCount) * 100;
    expect(Math.abs(observedRate - testRate)).toBeLessThan(3);
  });
});
