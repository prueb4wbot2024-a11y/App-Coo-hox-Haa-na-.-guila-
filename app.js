const socket = io();

document.getElementById("app").innerHTML = `
<h2>Negocios</h2>
<div id="negocios"></div>
<h2>Pedidos</h2>
<div id="pedidos"></div>
`;

fetch('/negocios')
.then(r=>r.json())
.then(data=>{
 const cont=document.getElementById('negocios');
 data.forEach(n=>{
  const div=document.createElement('div');
  div.className='card';
  div.innerHTML=`<h3>${n.nombre}</h3>
  <button onclick="pedir('${n.id}')">Pedir</button>`;
  cont.appendChild(div);
 });
});

function pedir(id){
 fetch('/pedidos',{method:'POST',
 headers:{'Content-Type':'application/json'},
 body:JSON.stringify({negocioId:id})
 });
}

socket.on('nuevoPedido',p=>{
 const div=document.createElement('div');
 div.className='card';
 div.innerHTML=`Pedido nuevo: ${p.negocioId}`;
 document.getElementById('pedidos').prepend(div);
});
