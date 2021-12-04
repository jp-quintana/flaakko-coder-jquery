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
              <i data-id=${producto.sku} class="carrito__agregar">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-up" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="16" y1="9" x2="12" y2="5" />
                  <line x1="8" y1="9" x2="12" y2="5" />
                </svg>
              </i>
              <p>${producto.unidades} u</p>
              <i data-id=${producto.sku} class="carrito__reducir">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-down" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="16" y1="15" x2="12" y2="19" />
                  <line x1="8" y1="15" x2="12" y2="19" />
                </svg>
              </i>
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
