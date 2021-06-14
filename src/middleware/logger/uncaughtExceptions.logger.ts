import fs from 'fs';

export const uncaughtExceptionsLogger = (error: Error) => {
  console.error(`Captured error: ${error.message}`);
  fs.writeFileSync('./error.log', `Captured error: ${error.message}`, {
    flag: 'a',
  });
  process.exit(1);
};
