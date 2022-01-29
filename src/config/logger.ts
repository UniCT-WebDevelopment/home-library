import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, prettyPrint } = format;
export const logger = createLogger({
  format: combine(colorize(), timestamp(), prettyPrint()),

  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "home_library.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}
