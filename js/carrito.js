// Renderiza el carrito
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

// Suma el total $$$ de los productos en el browser
const renderPrecioTotalCarrito = () => {
  let total = 0;
  for (let producto of carrito) {
      total += producto.precio * producto.unidades
  }
  $('#precio-total-carrito').text(`Total: $${total}`);
}

renderPrecioTotalCarrito()

// Escucha el evento click en remover. Remueve el producto elegido del carrito
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__eliminar')) {
    let skuString = $(event.target).data('id').toString()
    removeCarrito(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
  }
})

// Escucha el evento desplegar. Despliega info del producto elegido
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

// Escucha el evento click en agregar. Agrega una unidad del producto elegido
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__agregar')) {
    let skuString = $(event.target).data('id').toString()
    addUnidad(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
  }
})

// Escucha el evento click en reducir. Reduce una unidad del producto elegido
$('#body-carrito').on('click', () => {
  if ($(event.target).hasClass('carrito__reducir')) {
    let skuString = $(event.target).data('id').toString()
    reducirUnidad(skuString);
    renderListaCarrito()
    renderPrecioTotalCarrito()
    itemsCarrito()
  }
})

// Escucha el evento click en confirmar. Vacía carrito y tira alert de éxito
const confirmarCarrito = () => {
  if (carrito.length === 0) {
    $("#boton-carrito").css("visibility", "hidden")
  } else {
    $("#boton-carrito").css("visibility", "visible")

    $("#boton-carrito").click(() => {
      vaciarCarrito()
      renderListaCarrito()
      renderPrecioTotalCarrito()
      itemsCarrito()
      alert("Has realizado tu compra con éxito")
      confirmarCarrito()
    })

  }
}

confirmarCarrito()
