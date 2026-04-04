async function cargarPedidos(){
  const res = await fetch('/pedidos');
  const pedidos = await res.json();

  const cont = document.getElementById('pedidos');
  const ventas = document.getElementById('ventas');

  cont.innerHTML = "";

  let total = 0;

  pedidos.reverse().forEach(p => {

    total += p.total;

    const div = document.createElement('div');
    div.className = "card";

    div.innerHTML = `
      <h3>🧾 Pedido #${p.id}</h3>
      <p>${p.items.map(i => i.nombre).join(", ")}</p>
      <p>Total: $${p.total}</p>
      <p>Estado: ${p.estado}</p>

      <button class="nuevo" onclick="cambiar(${p.id},'nuevo')">Nuevo</button>
      <button class="preparando" onclick="cambiar(${p.id},'preparando')">Preparando</button>
      <button class="listo" onclick="cambiar(${p.id},'listo')">Listo</button>
      <button class="entregado" onclick="cambiar(${p.id},'entregado')">Entregado</button>
    `;

    cont.appendChild(div);
  });

  ventas.innerText = "$" + total;
}

async function cambiar(id, estado){
  await fetch('/estado', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({id, estado})
  });

  cargarPedidos();
}

// 🔄 refresco automático
setInterval(cargarPedidos, 3000);

cargarPedidos();
