import express from 'express'
import router from "./route/index.js";
import {config} from "./config/config.js";
import { swaggerDefinition, swaggerUi } from "./swagger.js";

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${config.app.root}/swagger-ui`, swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(config.app.root, router);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error'
    });
});

process.on('uncaughtException', (e) => {
    console.error('uncaughtException: ', e);
    console.error(e.stack);
    process.exit(1);
})

export default app;
