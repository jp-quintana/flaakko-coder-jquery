let sku = 1000

// Mostar "Producto agregado con exito" en el browser
const renderExitoCarrito = () => {

    $('#exito-producto').append(
      `
      <p>Se ha agregado con exito el producto al carrito!</p>
      `
    )

  // Desaparezca despues de 3 segundos
  setTimeout(() => {
    $('#exito-producto').empty();
  }, 3000);
}

// Escuchar el evento submit
$('#form-producto').on('submit', () => {
  sku = sku + 1
  const tipo = "Buzo"
  const modelo = "De Gira"
  const color = "Blanco"
  const talle = $('#talle-producto').val()
  const precio = 6400

  const producto = new Producto(sku, tipo, modelo, color, talle, precio);

  addCarrito(producto);
})

// Escuchar el evento submit Exito
$('#form-producto').on('submit', () => {
  event.preventDefault();
  renderExitoCarrito();
})
