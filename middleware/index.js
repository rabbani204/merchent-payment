
import  {OK, INTERNAL_SERVER_ERROR,BAD_REQUEST} from '../helpers/responseHelper'
import jwt from 'jsonwebtoken';
import {jwtKey} from '../config/keys';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = 'infinity@encryption#key@%3436!h@'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;

module.exports= { 

    localize: (req, res, next) => {

		    let locale =req.acceptsLanguages()[0];
		    locale = locale.includes("-")?locale.slice(0, -3):locale;
		    req.i18n.setLocale(locale);
		    next();

		},

	checkInvalidInput:async (error, req, res, next)=>{
		if(error){
			return  res.status(400).send(BAD_REQUEST( req.i18n.__('invalid_input'), null, req));
		}
		next();
	},
	encrypt:async(text)=>{

		try{

			let iv = crypto.randomBytes(IV_LENGTH);
			let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
			let encrypted = cipher.update(text);

			encrypted = Buffer.concat([encrypted, cipher.final()]);
			return iv.toString('hex') + ':' + encrypted.toString('hex');

		}catch(e){

			console.log(e)
			return text;
		}
	},
	decrypt:async(text)=>{

		try{

			let textParts = text.split(':');
			let iv = new Buffer.from(textParts.shift(), 'hex');
			let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
			let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
			let decrypted = decipher.update(encryptedText);

			decrypted = Buffer.concat([decrypted, decipher.final()]);
			return decrypted.toString();

		}catch(e){

			return text;
		}
	},
	tokenGenerate: async(payload) => {

		return jwt.sign(payload,jwtKey, { expiresIn: '1h' });
      },

    tokenVerify: async(req,res,next) => {

		try { 

			let authorization = req.header("authorization")
			if(!authorization){ 
				return  res.status(400).send(BAD_REQUEST( req.i18n.__('unauthorized'), null, req))
			 }
			authorization = authorization.split(" "); 
			if( authorization[0] != 'Bearer'){  
				return  res.status(400).send(BAD_REQUEST( req.i18n.__('unauthorized'), null, req))
			 }
			 let token = authorization[1]||null; 
			if (!token) {
				return  res.status(400).send(BAD_REQUEST( req.i18n.__('unauthorized'), null, req))
			}


			let decode = await jwt.verify(token, jwtKey);
			req.user_info = decode;
			next();

			}catch (e) {

				return  res.status(400).send(BAD_REQUEST( req.i18n.__('unauthorized'), null, req))

			}
     },

}