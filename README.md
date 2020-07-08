# kr-MERN-ecommerce
An E-Commerce Web Application I built from scratch using MongoDB, Express, React, and Node.js. 

I built the backend using Node.js , defined the mongoDB user schema and implemented authentication functions using bcrypt, JWT, and Moment NPM libraries. Mounted the middlewares express router, cors, and bodyparser and defined the register, login, logout and auth routes.
The register route posts the user data to the sever after generating the salt and hashing the user password for security. 
A token is generated after successful authentication at the login route, and the token is deleted and redirected at the logout route.

I connected the front end and back end with the http-proxy-middleware and built the front-end with React.

The front end does not have full functionality as the project's focus was mostly on the back end, but it is being slowly improved on.

Currently there are About, Login, Register components which stand for each of the pages the user has. 
The Register and Login pages contain forms which are passed through validation functions to make sure that the passwords are valid and match before sending it to the server, also logging any error messages for the user. 
