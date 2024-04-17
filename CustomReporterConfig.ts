import {
  Reporter,
  TestCase,
  TestError,
  TestResult,
  TestStep,
} from "@playwright/test/reporter";
const winston = require(`winston`);

const console = new winston.transports.Console();
const logger = new winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  ],
});

logger.add(console);

export default class CustomReporterConfig implements Reporter {
  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started : ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    logger.info(
      `Test Case Completed : ${test.title} Status : ${result.status}`
    );
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      logger.info(`Executing Step : ${step.title}`);
    }
  }

  onError(error: TestError): void {
    logger.error(error.message);
  }
}
