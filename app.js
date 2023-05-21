// Clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
    }
  }

  // Crear productos
  const productos = [
    new Producto(1, 'Copa del mundo', 5000, 'imagen1.jpg'),
    new Producto(2, 'Soporte Auriculares', 2000, 'imagen2.jpg'),
    new Producto(3, 'Jarron 3D Modern', 4000, 'imagen3.jpg'),
    new Producto(4, 'Lampara 3D', 4000, 'imagen4.jpg'),
    new Producto(5, 'Joystick holder', 3000, 'imagen5.jpg'),
    new Producto(6, 'Torre eiffel', 4500, 'imagen6.jpg'),
    new Producto(7, 'Dispensador p/bolsa', 1000, 'imagen7.jpg'),
    new Producto(8, 'Porta memorias SD Mario Bross', 2000, 'imagen8.jpg'),
    new Producto(9, 'Portamacetas Raices', 3500, 'imagen9.jpg'),
    new Producto(10, 'Cohete despegando 3D', 3500, 'imagen10.jpg'),
    new Producto(11, 'Porta papel higienico Star Wars', 3500, 'imagen11.jpg'),
    new Producto(12, 'Personaje Groot 12', 4000, 'imagen12.jpg')
  ];

  const productsGrid = document.getElementById('products-grid');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartButton = document.getElementById('empty-cart');
  const buyButton = document.getElementById('buy-button');

  let carrito = [];

  // Recuperar carrito de compras desde el Local Storage
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }

  // Mostrar productos en forma de grilla
  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.className = 'col-md-4 mb-3';
    productoElement.innerHTML = `
      <div class="card">
        <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-primary add-to-cart">Agregar al Carrito</button>
        </div>
      </div>
    `;

    // Agregar producto al carrito al hacer clic
    const addToCartButton = productoElement.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
      agregarAlCarrito(producto);
    });

    productsGrid.querySelector('.row').appendChild(productoElement);
  });

  // Agregar producto al carrito
  function agregarAlCarrito(producto) {
    carrito.push(producto);

    // Mostrar alerta de producto agregado al carrito
    Toastify({
      text: `Producto "${producto.nombre}" fue agregado al carrito`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to left, #1601b7, #5788dd)',
      stopOnFocus: true,
    }).showToast();

    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }

  // Vaciar carrito
  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
  }

  // Actualizar la visualización del carrito
  function actualizarCarrito() {
    let total = 0;
    cartTotal.textContent = `Total: $${total}`;

    carrito.forEach(producto => {
      total += producto.precio;
    });

    cartTotal.textContent = `Total: $${total}`;
  }

  emptyCartButton.addEventListener('click', vaciarCarrito);

  // Comprar
  buyButton.addEventListener('click', () => {
    fetch('colores.json')
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          title: 'Ponte en contacto con nosotros para gestionar pago y envío',
          html: `
            <input id="name" type="text" placeholder="Nombre" class="swal2-input">
            <input id="email" type="email" placeholder="Email" class="swal2-input">
            <input id="phone" type="tel" placeholder="Teléfono" class="swal2-input">
            <input id="address" type="text" placeholder="Dirección" class="swal2-input">
            <select id="color" class="swal2-select">
              ${data.colores.map(color => `<option value="${color}">${color}</option>`).join('')}
            </select>
          `,
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const email = Swal.getPopup().querySelector('#email').value;
            const phone = Swal.getPopup().querySelector('#phone').value;
            const address = Swal.getPopup().querySelector('#address').value;
            const color = Swal.getPopup().querySelector('#color').value;

            enviarFormulario(name, email, phone, address, color);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  });

  // Enviar formulario
  function enviarFormulario(name, email, phone, address, color) {
    // Aquí podrías hacer la lógica para enviar el formulario

    // Mostrar alerta de agradecimiento
    Swal.fire({
      title: '¡Gracias por tu compra, A la brevedad nos pondremos en contacto contigo!',
      icon: 'success'
    });

    // Vaciar el carrito después de comprar
    vaciarCarrito();
    guardarCarritoEnLocalStorage();
  }

  // Guardar el carrito en el Local Storage
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }





  // Cargar opciones de colores desde un archivo JSON
  fetch('colores.json')
    .then(response => response.json())
    .then(data => {
      const colorSelect = document.getElementById('color');
      data.colores.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error(error);
    });

  // Escuchar el envío del formulario
  const pedidoForm = document.getElementById('pedido-form');
  pedidoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const archivo = document.getElementById('archivo').value;
    const dimensiones = document.getElementById('dimensiones').value;
    const color = document.getElementById('color').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    // Enviar formulario o realizar la lógica correspondiente aquí

    // Mostrar mensaje de confirmación con SweetAlert
    Swal.fire({
      title: '¡Pedido Recibido!',
      text: 'A la brevedad nos contactaremos contigo.',
      icon: 'success'
    });

    // Limpiar el formulario
    pedidoForm.reset();
  });