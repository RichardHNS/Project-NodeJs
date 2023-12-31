const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cliente  = require("./cliente");
const Usuario = require("./app")
const buscaEmail = require("./buscaEmail")


const app = express();
const port = process.env.PORT || 3000;

app.use('/', cliente);

app.use('/', Usuario);

app.use("/", buscaEmail);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
