# MEAN  stack application
    This is a sample application using the MEAN stack ( MongoDB database, Express server, Angularjs framework, Nodejs
platform) which enables users to report their monthly expenses along with receipts for approval by their managers. 
### Architecture
    This application uses the client/server architecture and a token based authentication approach(Json Web Tokens). 
Application users are able to register or login, and udpate their profile via REST API endpoints.
Tokens assigned to users are signed with a secret key which is usually valid for 24 hours. Each request to the REST API
needs a token passed in the request headers as ``` x-access-token : "get-token-from-login-or-register" ```. 
There is an express middleware which intercepts all server request and verifies the signature and TTL of each request 
token. Access is only granted to requests which have valid signature and TTL.
