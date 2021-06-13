import fs from "fs";

export const unhandledRejectionsLogger = (reason: {message: string }) => {
    console.error(`Unhandled rejection detected: ${reason.message}`);
    fs.writeFileSync('./error.log', `Unhandled rejection detected: ${reason.message}`, {flag:'a'})
    process.exit(1);
}
