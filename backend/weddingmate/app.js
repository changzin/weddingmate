const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRouter = require('./router');
const fs = require('fs');
const path = require("path");

dotenv.config();

const app = express();

let corsOption = {
    origin: 'http://localhost:8080',
    credential: true
}

let dir = path.join(__dirname, `./uploads`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = path.join(__dirname, `./uploads/review`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = path.join(__dirname, `./uploads/qna`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = path.join(__dirname, `./uploads/item`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

app.set('port', process.env.PORT || 9090);
app.use(cors(corsOption));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/uploads')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

app.use('/', indexRouter);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port listening...')
});