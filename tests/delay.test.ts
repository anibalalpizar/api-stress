import { DelaySimulator } from "../src/core";

describe("DelaySimulator", () => {
  let delaySimulator: DelaySimulator;

  beforeEach(() => {
    delaySimulator = new DelaySimulator();
  });

  it("should create a delay within default range", async () => {
    const start = Date.now();
    await delaySimulator.simulate();
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(0);
    expect(duration).toBeLessThanOrEqual(1000);
  });

  it("should create a delay within custom range", async () => {
    const start = Date.now();
    await delaySimulator.simulate(500, 1500);
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(500);
    expect(duration).toBeLessThanOrEqual(1500);
  });

  it("should handle zero delay with minimal overhead", async () => {
    const start = Date.now();
    await delaySimulator.simulate(0, 0);
    const duration = Date.now() - start;

    expect(duration).toBeLessThanOrEqual(20);
  });

  it("should return a Promise", () => {
    const result = delaySimulator.simulate();
    expect(result).toBeInstanceOf(Promise);
  });
});
