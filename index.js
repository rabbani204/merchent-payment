
require('dotenv').config()
import express from 'express';
import debug from 'debug';
import {readdir} from 'fs' ;
import cors from 'cors';
import i18n from 'i18n-2';
import morgan from 'morgan';
import {localize,checkInvalidInput} from './middleware';
import auth from './controller/authController'
import payment from './controller/paymentController'

const app = express();
const PORT = process.env.PORT|| 2000;
const [ info, errorLog, debugLog ]= [ debug('info'), debug('warning'), debug('warnning') ];

//app.use(express.static(__dirname+'/../AEON_Image'));
app.use( express.static(process.env.image_root_path));
//app.use(express.static('C:\Users\Unruly\Desktop\AEON_Image') );

app.use(express.json({limit:'1024mb',strict:false}));
app.use (checkInvalidInput);
app.use(express.urlencoded({limit: '1024mb', extended: true}));
app.use(morgan('dev'));
app.use(cors())



// language config

i18n.expressBind(app, {locales: [ 'en' ] })

app.use(localize);


app.use("/api/",auth)
app.use("/api/",payment)


app.listen(PORT, () => {

    info(`🚀 Magic happens at port number ${PORT}`);

});



