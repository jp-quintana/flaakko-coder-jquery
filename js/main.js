// Array carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Retorna el contenido del carrito
const getCarrito = () => {
    return carrito;
}

// Agrega un producto al carrito y guardar en el local storage
const addCarrito = producto => {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Agrega unidad de producto con un SKU particular
const addUnidad = sku => {
  const producto = findCarrito(sku);
  const indice = carrito.indexOf(producto);
  carrito[indice].unidades += 1;
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Reduce unidad de producto con un SKU particular. Elimina producto si es la ultima unidad
const reducirUnidad = sku => {
  const producto = findCarrito(sku);
  const indice = carrito.indexOf(producto);

  if (carrito[indice].unidades === 1) {
    removeCarrito(sku)
  } else {
    carrito[indice].unidades -= 1;
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

}

// Encuentra un producto por su SKU
const findCarrito = sku => {

    const producto = carrito.find(producto => producto.sku === sku);

    if (!producto) {
        throw new Error(`No existe el producto con el SKU ${sku}`)
    }

    return producto;

}

// Elimina un producto según su SKU
const removeCarrito = (sku) => {

    const producto = findCarrito(sku);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


// Modifica el color de un producto según su SKU
const modifyCarrito = (sku, color) => {
    const producto = findCarrito(sku);
    producto.color = capitalizar(color);
}

// Vacía carrito
const vaciarCarrito = () => {
  carrito.length = 0;
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Renderiza cant items carrito en icono nav bar
const itemsCarrito = () => {
  if (carrito.length === 0) {
    $("#items-carrito").css("visibility", "hidden")
  } else {
    $("#items-carrito").css("visibility", "visible")

    let total = 0
    for (let producto of carrito) {
      total += producto.unidades
    }
    $("#items-carrito").text(
      `
      ${total}
      `
    )
  }
}

itemsCarrito()
