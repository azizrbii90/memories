import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("X-Frame-Options", "ALLOW-FROM https://www.google.com https://www.youtube.com"); // restrict it to the required domain
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,X-Frame-Options');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

app.use('/posts', postRoutes);

/*app.get('/', (req, res) => {
        res.send('hello')
})*/

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log('listening on port ' +PORT)))
        .catch((error) => console.log(error.message));

