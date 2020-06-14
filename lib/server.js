import express from 'express'
import config from './config'
var compression = require('compression')
var helmet = require('helmet');
const app = express()

app.use(express.static('public'));
app.set('view engine','ejs')
app.use(compression());
app.use(helmet());
app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(config.port,function listenHandler(){
    console.info(`Running on ${config.port}`);
});