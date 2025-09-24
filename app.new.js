// // Importing modules
const fs = require('fs');
const cors = require('cors');
const vhttps = require('vhttps');
const bodyParser = require('body-parser');
console.log("Import finished");

// Importing route mapping
console.log("Loading applications in memory..")
const filtechRdscaNet = require('./apps/filtech.rdsca.net/filtech.rdsca.net');
console.log("Applications were loaded successfully!")

const options = {};

// Importing certificates
console.log("Reading SSL certificates");
const certificates = {
    cert: fs.readFileSync('/etc/letsencrypt/live/treeware.com.mx/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/treeware.com.mx/privkey.pem')
};
console.log("SSL certificates were loaded sucessfully!");
 
// Create an vhttps instance
console.log("Initializing server..")
const server = vhttps.init();
 
// Introduce handlers to different domain names

var whitelist = ['http://localhost:4200', 'http://qa-edificio-sano.filtech.com.mx', 'https://qa-edificio-sano.filtech.com.mx']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

console.log("Mapping middleware routes");
server
    .use(cors(corsOptions))
    .use(bodyParser.json())
    .use('sap.filtech.middleware.treeware.com.mx', certificates, filtechRdscaNet.routes)
    .use('sap-api.filtech.com.mx', certificates, filtechRdscaNet.routes);
 
// Listen at port 443
console.log("Listening application on port 443");
server.listen(443);