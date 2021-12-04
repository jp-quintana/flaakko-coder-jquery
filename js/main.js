// Array carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Metodo que retorna el contenido del carrito
const getCarrito = () => {
    return carrito;
}

// Metodo para agregar un producto al carrito
const addCarrito = producto => {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const addUnidad = sku => {
  const producto = findCarrito(sku);
  const indice = carrito.indexOf(producto);
  carrito[indice].unidades += 1;
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

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

// Metodo para hallar un producto por su SKU
const findCarrito = sku => {

    const producto = carrito.find(producto => producto.sku === sku);

    if (!producto) {
        throw new Error(`No existe el producto con el SKU ${sku}`)
    }

    return producto;

}

// Metodo para eliminar un producto segun su SKU
const removeCarrito = (sku) => {

    const producto = findCarrito(sku);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


// Metodo para modificar el color de un producto segun su SKU
const modifyCarrito = (sku, color) => {
    const producto = findCarrito(sku);
    producto.color = capitalizar(color);
}

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
