// Agregar productos al carrito en el browser
const renderListaCarrito = () => {

  $('#body-carrito').empty();

  for (let producto of carrito) {
      $('#body-carrito').append(
        `
        <tr class="carrito__fila">
          <td class="carrito__producto">
            <img src="../img/productos-hoodie-blanco-1.jpg" alt="" class="carrito__imagen">
            <div class="carrito__info">
              <p class="carrito__nombre">${producto.tipo} ${producto.modelo} ${producto.talle}</p>
              <p data-id=${producto.sku} class="carrito__eliminar">remover</p>
            </div>
          </td>
          <td class="carrito__cantidad">1u</td>
          <td class="carrito__subtotal">$ ${producto.precio}</td>
        </tr>
        `
      )
  }
}

renderListaCarrito()

// Sumar el total de los productos en el browser
const renderPrecioTotalCarrito = () => {
  let total = 0;
  for (let producto of carrito) {
      total += producto.precio
  }
  $('#precio-total-carrito').text(`Total: $${total}`);
}

renderPrecioTotalCarrito()

// Escuchar el evento click en remover
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__eliminar')) {
    removeCarrito($(event.target).data('id'));
    renderListaCarrito()
    renderPrecioTotalCarrito()
  }
})
