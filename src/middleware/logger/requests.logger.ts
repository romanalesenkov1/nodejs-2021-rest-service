import winston from 'winston';
import expressWinston from 'express-winston';

export const requestsLogger = expressWinston.logger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston.format.combine(
                winston.format.uncolorize(),
                winston.format.json()
            )
        }),
    ],
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}} | query parameters: {{JSON.stringify(req.query)}} | body: {{JSON.stringify(req.body)}} | status code: {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute () { return false; } // optional: allows to skip some log messages based on request and/or response
});
