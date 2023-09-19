const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'projetoNode'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pesquisa banco Usuarios Mentodo GET, buscando pelo Email
app.get("/api/busca/:email", (req, res) => {
    const { email } = req.params;
    const sql = "SELECT * FROM cliente  where email = ?";
    connection.query(sql, [email ], (err, result) => {
        if (err) {
          console.error("Erro ao localizar o registro:" + err.message);
          res.status(500).json({ error: "erro ao localizar o registro" });
        } else {
          console.log("registro localizado com sucesso!");
          res.status(200).json({ result });
        }
      });
    });
  
  module.exports = app;