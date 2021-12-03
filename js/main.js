class ProductoCarrito {
  constructor(sku, tipo, modelo, color, talle, precio, unidad) {
    this.sku = sku
    this.tipo = capitalizar(tipo)
    this.modelo = capitalizar(modelo)
    this.color = capitalizar(color)
    this.talle = talle.toUpperCase()
    this.precio = parseInt(precio)
    this.unidad = parseInt(unidad)
  }
}


// Funcion para capitalizar la primer letra de un string
function capitalizar(palabra) {
  return palabra[0].toUpperCase() + palabra.slice(1);
}

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
    $("#items-carrito").css("display", "none")
  } else {
    $("#items-carrito").text(
      `
      ${carrito.length}
      `
    )
  }

}

itemsCarrito()
