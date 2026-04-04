const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// DB LOCAL (pedidos)
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ pedidos: [], negocios: [] }).write();

// 👉 Guardar pedido
app.post('/pedido', (req, res) => {
  const pedido = {
    id: Date.now(),
    negocio: req.body.negocio,
    items: req.body.items,
    total: req.body.total,
    estado: "nuevo",
    fecha: new Date()
  };

  db.get('pedidos').push(pedido).write();

  res.json({ ok: true, pedido });
});

// 👉 Obtener pedidos (admin)
app.get('/pedidos', (req, res) => {
  res.json(db.get('pedidos').value());
});

// 👉 Cambiar estado
app.post('/estado', (req, res) => {
  const { id, estado } = req.body;

  db.get('pedidos')
    .find({ id })
    .assign({ estado })
    .write();

  res.json({ ok: true });
});

// 👉 Multi-negocio
app.post('/negocio', (req, res) => {
  db.get('negocios').push(req.body).write();
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🔥 Aguila corriendo en " + PORT));
