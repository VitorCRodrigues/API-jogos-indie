const express = require('express'); 
const fs = require('fs');
const DATA_PATH = './data.json';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(express.static('front'));

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH));
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

app.get('/api/jogos', (req, res) => {
  const data = readData();
  res.json(data);
});

app.get('/api/jogos/:id', (req, res) => {
  const data = readData();
  const jogo = data.find(j => j.id === parseInt(req.params.id));
  if (!jogo) return res.status(404).send('Jogo não encontrado');
  res.json(jogo);
});

app.post('/api/jogos', (req, res) => {
  const data = readData();
  const novoJogo = {
    id: Date.now(),
    ...req.body
  };
  data.push(novoJogo);
  saveData(data);
  res.status(201).json(novoJogo);
});

app.put('/api/jogos/:id', (req, res) => {
  let data = readData();
  const index = data.findIndex(j => j.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Jogo não encontrado');

  data[index] = { ...data[index], ...req.body };
  saveData(data);
  res.json(data[index]);
});

app.delete('/api/jogos/:id', (req, res) => {
  let data = readData();
  data = data.filter(j => j.id !== parseInt(req.params.id));
  saveData(data);
  res.sendStatus(204);
});

app.listen(PORT, () => console.log("Servidor rodando 3000!"));
