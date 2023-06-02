const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const gifsFolder = path.join(__dirname, "gifs");

app.get("/random", (req, res) => {
  fs.readdir(gifsFolder, (err, files) => {
    if (err) {
      res.status(500).send("Erro ao ler a pasta de gifs");
      return;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    const randomGif = files[randomIndex];
    res.sendFile(path.join(gifsFolder, randomGif));
  });
});

app.get("/:gifName", (req, res) => {
  const gifName = req.params.gifName;
  const gifPath = path.join(gifsFolder, gifName);

  fs.access(gifPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send("A imagem solicitada não existe");
    } else {
      res.sendFile(gifPath);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
