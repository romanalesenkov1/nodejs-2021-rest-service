import { unhandledRejectionsLogger } from './unhandledRejections.logger';
import { uncaughtExceptionsLogger } from './uncaughtExceptions.logger';
import { createLogger } from './logger.factory';

export const logger = {
  requestsLogger: createLogger('info'),
  errorsLogger: createLogger('error'),
  uncaughtExceptionsLogger,
  unhandledRejectionsLogger,
};
