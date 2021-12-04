// Agregar productos al carrito en el browser
const renderListaCarrito = () => {

  $('#body-carrito').empty();

  let precioIndividual = 0
  for (let producto of carrito) {
    precioIndividual = producto.precio * producto.unidades

      $('#body-carrito').append(
        `
        <tr class="carrito__fila">
          <td class="carrito__producto">
            <img src=${producto.img1} alt="" class="carrito__imagen">
            <div class="carrito__info">
              <p class="carrito__nombre">${producto.tipo} ${producto.modelo}</p>
              <div class="carrito__desplegado">
                <p>Color: ${producto.color}</p>
              </div>
              <p class="carrito__desplegar">desplegar info</p>
              <p class="carrito__ocultar">ocultar info</p>

              <p data-id=${producto.sku} class="carrito__eliminar">remover</p>
            </div>
          </td>
          <td class="carrito__cantidad">
            <div class="carrito__cantidad-elementos">
              <p data-id=${producto.sku} class="carrito__agregar">
                ^
              </p>
              <p>${producto.unidades} u</p>
              <p data-id=${producto.sku} class="carrito__reducir">
                ^
              </p>
            </div>
          </td>
          <td class="carrito__subtotal">$ ${precioIndividual}</td>
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
      total += producto.precio * producto.unidades
  }
  $('#precio-total-carrito').text(`Total: $${total}`);
}

renderPrecioTotalCarrito()

// Escuchar el evento click en remover
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__eliminar')) {
    let skuString = $(event.target).data('id').toString()
    removeCarrito(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
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

// Escuchar el evento click en agregar
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__agregar')) {
    let skuString = $(event.target).data('id').toString()
    addUnidad(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
  }
})

// Escuchar el evento click en reducir
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__reducir')) {
    let skuString = $(event.target).data('id').toString()
    reducirUnidad(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
  }
})
