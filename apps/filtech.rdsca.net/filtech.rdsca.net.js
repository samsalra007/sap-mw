const express = require('express');
const request = require('request');
const BASE_URL = 'http://filtech.rdsca.net:82/';
const routes = express.Router();

routes.get('/selling-services/:sapOrder', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const sapOrder = !!req.params.sapOrder ? parseInt(req.params.sapOrder): 0;
    let response = {
        message: "ERROR_RETRIEVING_DATA",
        statusCode: 200
    }

    if( isNaN(sapOrder) || sapOrder <= 0){ 
        response.message = "INVALID_PARAMS";
        res.send(response);
    } else {
        const uri = `${BASE_URL}sap-orders?sapOrder=${sapOrder}`;
        request(uri, (error, curl, body) => {
            if(!!body && body.length > 0){
                response.sapDetails = JSON.parse(body);
                if(!!response.sapDetails.response){
                    response.message = "BYPASSED_SUCCESSFULLY";
                    response.sapDetails = response.sapDetails.response.sellingServices;
                    res.status(200).send(response);
                } else {
                    response.message = "SAP_ORDER_NOT_FOUND";
                    response.sapDetails = [];
                    res.status(404).send(response);
                }
            } else {
                response.message = "UNABLE_TO_RETRIEVE_SAP_ORDER";
                res.status(500).send(response);
            }
        });
    }
});

routes.get('/delivery-dashboard/:beginingDate/:endingDate', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    
    const beginingDate = !!req.params.beginingDate ? req.params.beginingDate: '20201001';
    const endingDate = !!req.params.endingDate ? req.params.endingDate: '20201031';

    let response = {
        message: "ERROR_RETRIEVING_DATA",
        statusCode: 200
    }
    
    const uri = `${BASE_URL}delivery-dashboard/${beginingDate}/${endingDate}`;
    request(uri, (error, curl, body) => {
        if(!!body && body.length > 0){
            response.sapDetails = JSON.parse(body);
            if(!!response.sapDetails.response){
                response.message = "BYPASSED_SUCCESSFULLY";
                response.sapDetails = response.sapDetails.response.sellingServices;
                res.status(200).send(response);
            } else {
                response.message = "SAP_ORDER_NOT_FOUND";
                response.sapDetails = [];
                res.status(404).send(response);
            }
        } else {
            response.message = "UNABLE_TO_RETRIEVE_SAP_ORDER";
            res.status(500).send(response);
        }
    });
})

module.exports.routes = routes;