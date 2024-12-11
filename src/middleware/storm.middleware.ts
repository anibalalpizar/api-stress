import type { Request, Response, NextFunction } from "express";
import type { DelayOptionsPartial, StormMiddlewareOptions } from "../types";
import { DelaySimulator, ErrorSimulator, PacketLossSimulator } from "../core";

export class StormMiddleware {
  private delaySimulator: DelaySimulator;
  private packetLossSimulator: PacketLossSimulator;
  private errorSimulator: ErrorSimulator;
  private options: StormMiddlewareOptions;

  constructor(options: StormMiddlewareOptions = {}) {
    this.options = options;

    const delayOptions: DelayOptionsPartial = {
      min: options.delay?.min ?? 0,
      max: options.delay?.max ?? 1000,
    };

    this.delaySimulator = new DelaySimulator(
      delayOptions.min,
      delayOptions.max
    );

    this.packetLossSimulator = new PacketLossSimulator(
      options.packetLoss?.rate ?? 0
    );

    this.errorSimulator = new ErrorSimulator();
  }

  public middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (this.packetLossSimulator.shouldDrop())
      return res.status(504).json({
        error: "Simulated Packet Loss",
      });

    await this.delaySimulator.simulate(
      this.options.delay?.min,
      this.options.delay?.max
    );

    const randomError = this.errorSimulator.simulate(
      this.options.errorSimulation
    );

    if (randomError)
      return res.status(randomError.statusCode).json({
        error: randomError.message,
      });

    next();
  };
}
