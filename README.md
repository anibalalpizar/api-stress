# API Storm Tester 🌩️

## Overview 🌐

`api-stress` is a middleware for simulating various network conditions in Node.js applications to test API resilience. It can simulate random network latency, packet loss, and HTTP errors.

## Features ✨

- Random network latency simulation
- Packet loss simulation
- HTTP error injection
- Configurable network storm parameters

## Installation 🔧

```bash
npm install api-stress
```

## Usage 🚀

```typescript
import express from "express";
import { StormMiddleware } from "api-stress";

const app = express();

// Create Storm Middleware instance with aggressive network simulation
const stormMiddlewareInstance = new StormMiddleware({
  delay: { min: 500, max: 2000 },
  packetLoss: { rate: 10 },
  errorSimulation: {
    probability: 0.05,
    statusCode: 500,
    message: "Simulated Internal Server Error",
  },
});

// Apply storm middleware to all routes
app.use(stormMiddlewareInstance.middleware);

app.get("/test", (req, res) => {
  res.json({
    message: "Survived the network storm!",
  });
});
```

## Configuration Options ⚙️

- `latency`: Simulate random network delays
- `packetLoss`: Simulate percentage of dropped packets
- `errorSimulation`: Inject random HTTP errors

## License 📜

MIT
