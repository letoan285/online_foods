import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AdminRoute, VandorRoute } from './src/routes';
import { MONGO_URI } from './src/config';

const middleware = (req: any, res: any, next: any) => {
    console.log('middleware run');
    next();
    
}
const middlewareTwo = (req: any, res: any, next: any) => {
    console.log('middleware two run');
    res.redirect('/');
    next();
    
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);

mongoose.connect(MONGO_URI, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then((result) => {
    // console.log(result);
    console.log('Database is Connected');
    
}).catch(error => console.log(error));

app.listen(8000, () => {
    console.log(`Server is running on port 8000`);    
})