export class ErrorSimulator {
  private defaultOptions = {
    probability: 0,
    statusCode: 500,
    message: "Simulated Network Error",
  };

  public simulate(options: Partial<typeof this.defaultOptions> = {}) {
    const config = { ...this.defaultOptions, ...options };

    return Math.random() < config.probability
      ? {
          statusCode: config.statusCode,
          message: config.message,
        }
      : null;
  }
}
