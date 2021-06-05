import winston from 'winston';
import expressWinston from 'express-winston';

export const errorsLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.uncolorize(),
                winston.format.json()
            )
        }),
    ],
    msg: "HTTP {{req.method}} {{req.url}} | query parameters: {{JSON.stringify(req.query)}} | body: {{JSON.stringify(req.body)}} | status code: {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
});
