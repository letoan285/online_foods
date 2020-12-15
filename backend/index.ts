import express from 'express';
import App from './src/services/ExpressApp';
import dbConnection from './src/services/Database';
import { APP_PORT } from './src/config';

const StartServer = async () => {
    const app = express();

    await dbConnection();

    await App(app);

    app.listen(APP_PORT, () => {
        console.log(`Server is running on port ${APP_PORT}`);
        
    });
}

StartServer();