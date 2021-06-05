import {requestsLogger} from './requests.logger';
import {errorsLogger} from './errors.logger';
import {unhandledRejectionsLogger} from './unhandledRejections.logger';
import {uncaughtExceptionsLogger} from './uncaughtExceptions.logger'

export const logger = {
   requestsLogger,
   errorsLogger,
   uncaughtExceptionsLogger,
   unhandledRejectionsLogger,
}