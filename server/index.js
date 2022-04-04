import dotenv from 'dotenv';

import path from 'path';
import express from 'express';
import cors from 'cors';

// import routes
import userRouter from './routes/user.routes.js';
import formRouter from './routes/form.routes.js';
import jobRouter from './routes/job.routes.js';

import { authenticateToken } from './helpers/token-helpers.js';
import db from './sequelize';

// Configure .env and __dirname for use
dotenv.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));

// Connect database from sequelize_cli configuration
db.sequelize.sync()

// Express app object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Path to webpack build of reactjs app
const clientPath = path.resolve(__dirname, '../client/dist')
app.use(express.static(clientPath));

// Any get request send index.html react file
app.get('/*', (req, res, next) => {
    console.log('Site requeste');
    res.sendFile(path.join(clientPath, '/index.html'))
})

// Routes
app.use('/user', userRouter);
app.use('/form', formRouter);
app.use('/job', jobRouter);

app.post('/authorization', authenticateToken, (req, res) => {
    console.log('Checked authorization')
    res.send("authorized")
});

app.post('/getJobs', async (req, res) => {
    const jobs = mdb.collection('jobs').find({})
    await jobs.forEach(doc => console.log(doc));
    res.send('test');
});


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Job Portal (reactjs) listening at http://${process.env.HOST}:${process.env.PORT}`);
})

process.on('SIGINT', function () {
    db.close();
    disconnectMongodb();
    console.log("Cleanning up...");
    process.exit();
});


