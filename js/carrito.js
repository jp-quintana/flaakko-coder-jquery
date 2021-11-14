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
              <p class="carrito__nombre">${producto.tipo} ${producto.modelo}</p>
              <div class="carrito__desplegado">
                <p>Talle: ${producto.talle}</p>
                <p>Color: ${producto.color}</p>
              </div>
              <p class="carrito__desplegar">desplegar info</p>
              <p class="carrito__ocultar">ocultar info</p>

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

// Escuchar el evento desplegar
$('#body-carrito').click(() => {
  if ($(event.target).hasClass('carrito__desplegar')) {
    $(event.target).prev('.carrito__desplegado').slideDown()
    $(event.target).next('.carrito__ocultar').show()
    $(event.target).hide()
  } else if ($(event.target).hasClass('carrito__ocultar')) {
    $(event.target).prevAll('.carrito__desplegado').slideUp()
    $(event.target).prev('.carrito__desplegar').show()
    $(event.target).hide()
  }
})

// // Lo que no funciono
// $('#body-carrito').click(() => {
//   if ($(event.target).hasClass('carrito__desplegar')) {
//     $(event.target).prev('.carrito__desplegado').slideDown(() => {
//       $(this).next('.carrito__ocultar').show()
//       $(this).hide()
//     })
//   } else if ($(event.target).hasClass('carrito__ocultar')) {
//     $(event.target).prevAll('.carrito__desplegado').slideUp(() => {
//       $(this).prev('.carrito__desplegar').show()
//       $(this).hide()
//     })
//   }
// })
