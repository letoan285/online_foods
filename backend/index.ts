import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';


import { AdminRoute, VandorRoute } from './src/routes';
import { MONGO_URI } from './src/config';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join(__dirname, 'images')));

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