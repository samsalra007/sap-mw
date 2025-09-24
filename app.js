//archivo index.js
console.log('Importing resources');
const Express = require('express');
const Fs = require('fs');
const Https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const vhost = require('vhost');

console.log('Loading SSL certificates');
const port = 443;
const certificates = {
    cert: Fs.readFileSync('~/ssl-cert/mw.edificiosano.com/fullchain.pem'),
    key: Fs.readFileSync('~/ssl-cert/mw.edificiosano.com/privkey.pem')
 };

console.log("Mapping middleware routes");
const filtechRdscaNet = require('./apps/filtech.rdsca.net/filtech.rdsca.net');
//const saharaCom = require('./apps/sahara.com/sahara.com');

console.log("Raising services")
const app = Express();
app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())
    .use(vhost('prod.sap.edificiosano.com', filtechRdscaNet.routes))
    .use(vhost('sap.edificiosano.com', filtechRdscaNet.routes))
    //.use(vhost('sap.sahara.middleware.treeware.com.mx', saharaCom.routes));
    // .use('/', filtechRdscaNet.routes);

Https.createServer(certificates,app).listen(port, function(){
	console.log('HTTPS server is listening on 443 server');
});