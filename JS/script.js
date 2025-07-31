document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const contador = document.getElementById("contador-carrito");
  const lista = document.getElementById("lista-carrito");
  const panel = document.getElementById("panel-carrito");
  const cerrar = document.getElementById("cerrar-carrito");
  const carritoIcono = document.getElementById("carrito");
  const totalTexto = document.getElementById("total-carrito");

  const botonesAgregar = document.querySelectorAll(".producto button");

  // Función para actualizar el total
  const actualizarTotal = () => {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    totalTexto.textContent = `Total: $${total}`;
  };

  // Función para actualizar el contador
  const actualizarContador = () => {
    contador.textContent = carrito.length;
    contador.style.display = carrito.length > 0 ? "inline-block" : "none";
  };

  // Agregar productos al carrito
  botonesAgregar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
      const producto = document.querySelectorAll(".producto")[i];
      const nombre = producto.querySelector("h3").textContent;

      const precioTexto = producto.querySelector(".precio").textContent;
      const precio = parseInt(precioTexto.replace("$", "").trim());

      const nuevoProducto = { nombre, precio };
      carrito.push(nuevoProducto);

      const li = document.createElement("li");
      li.innerHTML = `
        ${nombre} - $${precio}
        <button class="eliminar">✖</button>
      `;

      li.querySelector(".eliminar").addEventListener("click", () => {
        const index = carrito.indexOf(nuevoProducto);
        if (index !== -1) {
          carrito.splice(index, 1);
          li.remove();
          actualizarContador();
          actualizarTotal();
        }
      });

      lista.appendChild(li);
      actualizarContador();
      actualizarTotal();
    });
  });

  // Abrir panel
  carritoIcono.addEventListener("click", (e) => {
    e.preventDefault();
    panel.classList.add("abierto");
  });

  // Cerrar panel
  cerrar.addEventListener("click", () => {
    panel.classList.remove("abierto");
  });
});

