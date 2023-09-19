const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "projetao",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySOL: " + err.message);
  } else {
    console.log("Conectado ao MySQL");
  }
});
// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pesquisa banco Usuarios Mentodo GET
app.get("/api/Usuarios", (req, res) => {
  const sql = "SELECT * FROM Usuario";
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
app.post("/api/Usuarios", (req, res) => {
  const { email, nome } = req.body;

  const sql = "INSERT INTO Usuario (email, nome) values (?,?)";
  connection.query(sql, [email, nome], (err, result) => {
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

app.put("/api/Usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { email, nome } = req.body;

  const sql = "UPDATE Usuario Set email = ?, nome = ? where id = ?";
  connection.query(sql, [email, nome, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar registro:" + err.message);
      res.status(500).json({ error: "erro ao atualizar o registro" });
    } else {
      console.log("registro atualizado com sucesso!");
      res.status(200).json({ message: "resgistro atualizado com sucesso" });
    }
  });
});

app.delete("/api/Usuarios/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Usuario WHERE id = ?";
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