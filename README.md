# sap-mw
SAP Middleware for cloud applications

## Forward Azure Rule before starting the application
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443

## Run the application
PORT=8443 nodemon

## To install certificates
./letsencrypt-auto certonly --standalone -d [domainlist]

## To bind node with 80 and 443 ports
sudo setcap 'cap_net_bind_service=+ep' `which node`

