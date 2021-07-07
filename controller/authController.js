require('dotenv').config()
import express from 'express'
import  {OK, INTERNAL_SERVER_ERROR,BAD_REQUEST,UNAUTHORIZED} from '../helpers/responseHelper'
import {tokenGenerate,decrypt,encrypt} from '../middleware'



const router = express.Router()

router.post('/getToken',async(req,res)=>{

    try{

        let {username=null,password=null} = req.body

        password = await decrypt(password); 

        if(username !=process.env.apiusername || password != process.env.apipassword){

            return  res.status(400).send(BAD_REQUEST( req.i18n.__('unauthorized'), null, req))
        }
        else{

            let login_datetime = new Date()
            let token = await tokenGenerate({username:process.env.apiusername,login_datetime})

            return res.status(200).send(OK( {token},null, req));

        }

    }catch(e){
        return  res.status(500).send(INTERNAL_SERVER_ERROR(null, req))
    }
})


module.exports = router;