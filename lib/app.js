const express = require('express')
const compression = require('compression')
const helmet = require('helmet');
const port = process.env.PORT || 8080
const app = express()

app.use(express.static('public'));
app.set('view engine','ejs')
app.use(compression());
app.use(helmet());
app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,function listenHandler(){
    console.info(`Running on ${port}`);
});