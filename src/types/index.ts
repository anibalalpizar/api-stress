export * from "./delay.types";
export * from "./error.types";
export * from "./packet.types";

export interface StormMiddlewareOptions {
  delay?: {
    min?: number;
    max?: number;
  };
  packetLoss?: {
    rate?: number;
  };
  errorSimulation?: {
    probability?: number;
    statusCode?: number;
    message?: string;
  };
}
