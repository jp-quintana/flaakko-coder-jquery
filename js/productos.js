class Productos {
  async getProductos(url) {
    const result = await $.ajax({
        method: "GET",
        datatype: 'json',
        url: url,
        success: (response) => {
          let productos = response;
          return productos;
        }
    }).fail(() => {
      throw new Error('error')
    })
    return result;
  }
}

class Display {
  displayProductos(productos) {
    for (let producto of productos) {
      $('#productos').append(
        `
        <div class="productos__item">
            <a href="#" class="productos__enlace">
              <div class="productos__imagen-contenedor">
                <img src=${producto.img1} alt="" class="productos__imagen">
                <img src=${producto.img2} alt="" class="productos__imagen-bottom">
              </div>
              <ul class="productos__info">
                <li class="productos__nombre">${producto.tipo} <span>${producto.modelo}</span> ${producto.color}</li>
                <li class="productos__precio">$${producto.precio}</li>
              </ul>
            </a>
            <button class="producto__boton producto-boton" type="submit" name="button" data-id=${producto.sku}>Agregar a carrito</button>
        </div>
        `
      )
    }
  }

  // Method para poder darle uso a cada boton y funciones
  getBotonesCarrito() {

    // Storear todos los botones en un array
    let botones = [...$(".producto-boton")]

    botones.forEach(boton => {

      // Conseguir el data-id de cada boton
      let sku = boton.dataset.id;

      boton.addEventListener('click', event => {

        // Traer del local el producto segun su sku
        let productoCarrito = {...Storage.getProducto(sku)}

        // Variable para testear
        let skuEnCarrito = carrito.find(producto => producto.sku === sku)

        // Se agrega unidad o producto nuevo
        if (skuEnCarrito) {
          addUnidad(sku)
          itemsCarrito()

        } else {
          addCarrito(productoCarrito)
          itemsCarrito()
        }
      })
    })
  }
}

class Storage {
  static saveProductos(productos) {
    localStorage.setItem("productos", JSON.stringify(productos))
  }
  static getProducto(sku) {
    let productos = JSON.parse(localStorage.getItem("productos"))
    return productos.find(producto => producto.sku === sku)
  }
  static saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }
}

$(document).ready(() => {

  const productos = new Productos();
  const display = new Display();

  productos.getProductos("../productos.json").then(productos => {
    display.displayProductos(productos)
    Storage.saveProductos(productos)
  }).then(() => {
    display.getBotonesCarrito()
    itemsCarrito()
  })


})
