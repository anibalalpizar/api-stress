import { ErrorSimulator } from "../src/core";

describe("ErrorSimulator", () => {
  let errorSimulator: ErrorSimulator;

  beforeEach(() => {
    errorSimulator = new ErrorSimulator();
  });

  it("should return null when probability is 0", () => {
    const result = errorSimulator.simulate({ probability: 0 });
    expect(result).toBeNull();
  });

  it("should return error when probability is 1", () => {
    const result = errorSimulator.simulate({ probability: 1 });
    expect(result).toEqual({
      statusCode: 500,
      message: "Simulated Network Error",
    });
  });

  it("should use custom error configuration", () => {
    const customConfig = {
      probability: 1,
      statusCode: 503,
      message: "Custom Error Message",
    };

    const result = errorSimulator.simulate(customConfig);
    expect(result).toEqual({
      statusCode: 503,
      message: "Custom Error Message",
    });
  });

  it("should have statistical distribution close to expected probability", () => {
    const simulationCount = 10000;
    const testProbability = 0.3;

    let errorCount = 0;
    for (let i = 0; i < simulationCount; i++) {
      const result = errorSimulator.simulate({ probability: testProbability });
      if (result !== null) {
        errorCount++;
      }
    }

    const observedProbability = errorCount / simulationCount;
    expect(Math.abs(observedProbability - testProbability)).toBeLessThan(0.03);
  });
});
