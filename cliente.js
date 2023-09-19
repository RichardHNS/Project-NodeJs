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

// Pesquisa banco Usuarios Mentodo GET
app.get("/api/cliente", (req, res) => {
    const sql = "SELECT * FROM cliente";
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Erro ao buscar registros: " + err.message);
        res.status(500).json({ error: "Erro ao buscar registros" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  //inserir Usuarios metodo POST
  app.post("/api/cliente", (req, res) => {
    const { nome, cpf,  email, idade } = req.body;
  
    const sql = "INSERT INTO cliente (nome, cpf, email, idade) values (?,?,?,?)";
    connection.query(sql, [nome, cpf, email, idade], (err, result) => {
      if (err) {
        console.error("erro ao inserir registro" + err.message);
        res.status(500).json({ error: "erro ao inserir registro" });
      } else {
        console.log("registro inserido com sucesso");
        res.status(201).json({ message: "registro inserido com sucesso" });
      }
    });
  });
  
  //Update de usuarios Metodo PUT
  
  app.put("/api/cliente/:id", (req, res) => {
    const { id } = req.params;
    const { nome, cpf,email, idade } = req.body;
  
    const sql = "UPDATE cliente Set nome = ?, cpf= ?, email = ?, idade = ? where id = ?";
    connection.query(sql, [nome, cpf,email, idade, id], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar registro:" + err.message);
        res.status(500).json({ error: "erro ao atualizar o registro" });
      } else {
        console.log("registro atualizado com sucesso!");
        res.status(200).json({ message: "resgistro atualizado com sucesso" });
      }
    });
  });
  
  app.delete("/api/cliente/:id", (req, res) => {
    const { id } = req.params;
  
    const sql = "DELETE FROM cliente WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error("erro ao excluir o registro" + err.message);
        res.status(500).json({ error: "erro ao excluir registro" });
      } else {
        console.log("registro não encontrado.");
        res.status(404).json({ message: "Registro não encontrado" });
      }
    });
  });
  

  module.exports = app;


