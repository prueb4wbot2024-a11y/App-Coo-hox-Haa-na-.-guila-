let carrito = [];

// 👉 Agregar producto
function agregar(nombre, precio) {
  carrito.push({ nombre, precio });
  renderCarrito();
}

// 👉 Render carrito
function renderCarrito() {
  const lista = document.getElementById("pedidoTexto");
  const total = document.getElementById("totalPrecio");

  lista.innerHTML = carrito.map(i => `🍽️ ${i.nombre}`).join("<br>");

  const suma = carrito.reduce((a, b) => a + parseFloat(b.precio), 0);
  total.innerText = "Total: $" + suma;
}

// 👉 Enviar pedido al backend
async function enviarPedido() {
  const total = carrito.reduce((a, b) => a + parseFloat(b.precio), 0);

  const res = await fetch("/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      negocio: "Demo Mérida",
      items: carrito,
      total
    })
  });

  const data = await res.json();

  alert("✅ Pedido enviado");

  // 👉 WhatsApp directo
  const mensaje = encodeURIComponent(
    `Pedido:\n${carrito.map(i => i.nombre).join(", ")}\nTotal: $${total}`
  );

  window.open(`https://wa.me/529991234567?text=${mensaje}`);

  carrito = [];
  renderCarrito();
}

// 👉 VOZ IA (NAVEGADOR)
function activarVoz() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "es-MX";

  recognition.onresult = function(event) {
    const texto = event.results[0][0].transcript.toLowerCase();

    if (texto.includes("pibil")) agregar("Cochinita Pibil", 185);
    if (texto.includes("panucho")) agregar("Panuchos", 120);
    if (texto.includes("sopa")) agregar("Sopa de Lima", 140);

    alert("🎤 Escuché: " + texto);
  };

  recognition.start();
}
function pagar(total){
  const link = `https://wa.me/529991234567?text=Quiero pagar $${total}`;
  window.open(link);
}
<button onclick="pagar(200)">💳 Pagar</button>
