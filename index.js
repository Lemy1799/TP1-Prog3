require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json');

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger-output.json');

//Routers
const taskRouter = require("./src/modules/task/task.routes");
const usuarioRouter = require("./src/modules/user/user.routes");

// Secure setup
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT


// Enable CORS
app.use(cors());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


mongoose.connect(
  process.env.DB_RECLAMO, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Conectado a MongoDB')).catch(err => console.error('No se pudo conectar a MongoDB', err)); 

app.get("/", async (request, response) => {
      return response.send("Backend reclamos node js express");
});
// Routers
app.use(taskRouter);
app.use(usuarioRouter);

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
    ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
    ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
  res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
  next();
});
var options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})