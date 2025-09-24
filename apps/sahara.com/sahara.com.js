const express = require('express');
const request = require('request');

const routes = express.Router();

routes.get('/', (req, res) => {
    let response = {
        message: "THIS IS SAHARA",
        statusCode: 200
    }
    res.status(200).send(response);
})

routes.get('/', (req, res) => {
    let response = {
        message: "THIS IS SAHARA",
        statusCode: 200
    }
    res.status(200).send(response);
})

module.exports.routes = routes;