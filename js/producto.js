let sku = 1000

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

// Mostar "Producto agregado con exito" en el browser
$('#form-producto').on('submit', () => {
  event.preventDefault();
  $('#exito-prodcuto').hide()
  $('#exito-producto').fadeIn('slow', () => {
    $('#exito-producto').fadeOut(3000)
  })
})
