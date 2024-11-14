import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "application.log" }),
  ],
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});


