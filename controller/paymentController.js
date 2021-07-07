import express from 'express'
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, UNAUTHORIZED } from '../helpers/responseHelper'
import { MERC_MENU_REL, MERCHANT_MENU, PROFILE_MERCHANT } from '../models'
import { tokenVerify } from '../middleware'
require('dotenv').config()
import axios from 'axios'

const router = express.Router()


router.post('/accountdetails', async (req, res) => {
    try {
        let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
        xmlns:web="http://www.dwcorp.com/BillMasterWebAccessWebService/>\
            <soapenv:Header/>\
            <soapenv:Body>\
            <bil:GetAccount>\
            <bil:sAcctNum>10000101</bil:sAcctNum>\
            </bil:GetAccount>\
            </soapenv:Body>\
            </soapenv:Envelope>';

        axios.post('https://share.dwcorp.com/IVR000/BWAWebService.asmx/',
            xmls,
            {
                headers:
                    { 'Content-Type': 'text/xml' }
            }).then(response => {
                console.log(response);
                res.send(response)
            }).catch(err => { console.log(err) });
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
