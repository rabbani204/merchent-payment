import express from 'express'
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNAUTHORIZED } from '../helpers/responseHelper'
import { MERC_MENU_REL, MERCHANT_MENU, PROFILE_MERCHANT } from '../models'
import { tokenVerify } from '../middleware'
require('dotenv').config()
import axios from 'axios'
var convert = require('xml-js');
const router = express.Router()


router.post('/soap/accountdetails', async (req, res) => {
    try {
        let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bil="http://www.dwcorp.com/BillMasterWebAccessWebService/">
        <soapenv:Header/>
        <soapenv:Body>
           <bil:GetAccount>
              <bil:sAcctNum>10000101</bil:sAcctNum>
           </bil:GetAccount>
        </soapenv:Body>
     </soapenv:Envelope>`

        axios.post('https://share.dwcorp.com/IVR000/BWAWebService.asmx',
            xmls,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from('APIUser' + ":" + 'd@t@We3t').toString('base64')}`,
                    "Content-Type" : "text/xml"
                }
            }).then(ress => {
                console.log(ress.data)
                var result = convert.xml2json(ress.data, {compact: true, spaces: 4});
                return res.status(200).send(OK(result, null, req))
            }).catch(err => {
                console.log(err, 'error from err')
                return res.status(500).send(INTERNAL_SERVER_ERROR(null, req))
            })

    } catch (e) {
        console.log(e, 'error form e')
        return res.status(500).send(INTERNAL_SERVER_ERROR(null, req))
    }
})


router.post('/soap/payment', (req, res)=>{
    try {
        let {sAcctNum, dPayAmt, dFeeAmt, paymentType, sReferenceNum} = req.body
        // console.log(sAcctNum, dPayAmt, dFeeAmt, sReferenceNum)
        let xmls =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bil="http://www.dwcorp.com/BillMasterWebAccessWebService/">
        <soapenv:Header/>
        <soapenv:Body>
           <bil:PostPayment>
              <!--Optional:-->
              <bil:sAcctNum>${sAcctNum}</bil:sAcctNum>
              <bil:dPayAmt>${dPayAmt}</bil:dPayAmt>
              <bil:dFeeAmt>${dFeeAmt}</bil:dFeeAmt>
              <bil:paymentType>Visa</bil:paymentType>
              <!--Optional:-->
              <bil:sReferenceNum>${sReferenceNum}</bil:sReferenceNum>
           </bil:PostPayment>
        </soapenv:Body>
     </soapenv:Envelope>`

        axios.post('https://share.dwcorp.com/IVR000/BWAWebService.asmx',
            xmls,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from('APIUser' + ":" + 'd@t@We3t').toString('base64')}`,
                    "Content-Type" : "text/xml"
                }
            }).then(ress => {
                var result = convert.xml2json(ress.data, {compact: true, spaces: 4});
                console.log(result)
                return res.status(200).send(OK(result, null, req))
            }).catch(err => {
                console.log(err, 'error')
                return res.status(500).send(INTERNAL_SERVER_ERROR(null, req))
            })

    } catch (e) {
        console.log(e, 'error form e')
        return res.status(500).send(INTERNAL_SERVER_ERROR(null, req))
    }
})

module.exports = router;
