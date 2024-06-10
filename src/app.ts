import express, {json, urlencoded} from 'express';
import {join} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import swaggerDocument from "../swagger-output.json" assert { type: "json" };

import {fileURLToPath} from "node:url";

import indexRouter from './routes/index.js'
import signupRouter from './routes/signup.js'
import loginRouter from './routes/login.js'
import accountRouter from './routes/account.js'
import surveyRouter from './routes/survey.js';
import resultRouter from './routes/result.js';
import wineRouter from './routes/wine.js';
import searchRouter from './routes/search.js';
import rakingRouter from './routes/ranking.js'

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename)

app.use(logger(process.env.NODE_ENV === "production" ? "production" : 'dev'));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public')));

//라우터
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/account', accountRouter);
app.use('/survey', surveyRouter);
app.use('/result', resultRouter);
app.use('/wine', wineRouter)
app.use('/search', searchRouter)
app.use('/ranking', rakingRouter)
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    // #swagger.ignore = true
    res.redirect('/api-docs/')
})

app.use(function(req, res, _) {
    res.set('Content-Type', 'text/plain')
    res.status(404).send('Sorry, we cannot find that!')
});

export default app;
