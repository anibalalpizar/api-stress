import { StormMiddleware } from "../src/middleware/storm.middleware";
import type { Request, Response, NextFunction } from "express";

describe("StormMiddleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should call next when no simulation occurs", async () => {
    const stormMiddleware = new StormMiddleware({
      delay: { min: 0, max: 0 },
      packetLoss: { rate: 0 },
      errorSimulation: { probability: 0 },
    });

    await stormMiddleware.middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 504 on packet loss", async () => {
    const stormMiddleware = new StormMiddleware({
      packetLoss: { rate: 100 },
    });

    await stormMiddleware.middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(504);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Simulated Packet Loss",
    });
  });

  it("should return error on error simulation", async () => {
    const stormMiddleware = new StormMiddleware({
      errorSimulation: {
        probability: 1,
        statusCode: 500,
        message: "Test Error",
      },
    });

    await stormMiddleware.middleware(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Test Error" });
  });
});
