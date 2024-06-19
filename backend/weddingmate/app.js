const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRouter = require('./router');

dotenv.config();

const app = express();

let corsOption = {
    origin: 'http://localhost:8080',
    credential: true
}


app.set('port', process.env.PORT || 9090);
app.use(cors(corsOption));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/', indexRouter);

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port listening...')
});


