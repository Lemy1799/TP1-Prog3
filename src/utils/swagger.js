const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()
const doc = {
  
  info: {
    title: 'PIII - TP1',
    description: 'Aplicacion inicial de backend',
  },
   host: 'localhost:3000'
};

const outputFile = '../../swagger-output.json';
const routes = [
  

  
  "../modules/user/user.routes.js",
  "../modules/task/task.routes.js"
];

swaggerAutogen(outputFile, routes, doc);

