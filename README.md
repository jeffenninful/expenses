##  MEAN  stack application
This is a sample application using the mean stack ( MongoDB database, Express server, Angularjs framework, Nodejs platform). 
This application uses the client and server architecture and also uses a token based authentication approach(Json web tokens). 
Application users are able to register or login, and udpate their profile via REST API endpoints. Tokens assigned to users are
signed with a secret key which is usually valid for 24 hours. Each request to the REST API needs a token passed in the request
headers as ``` x-access-token : "get-token-from-login-or-register" ```. There is an express middleware which intercepts and verifies the
signature and TTL of each request token; access is only granted to requests which have valid signature and TTL.
