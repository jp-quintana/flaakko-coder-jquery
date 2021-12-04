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
  // Renderiza productos
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

  // Obtiene id de botones y otorga funciones
  getBotonesCarrito() {

    // Storea todos los botones en un array
    let botones = [...$(".producto-boton")]

    botones.forEach(boton => {

      // Consigue el data-id de cada boton
      let sku = boton.dataset.id;

      boton.addEventListener('click', event => {

        // Trae del local el producto segun su SKU
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
  // No requieren instances con el static
  static saveProductos(productos) {
    localStorage.setItem("productos", JSON.stringify(productos))
  }
  static getProducto(sku) {
    let productos = JSON.parse(localStorage.getItem("productos"))
    return productos.find(producto => producto.sku === sku)
  }
}

$(document).ready(() => {
  // Instances
  const productos = new Productos();
  const display = new Display();

  // Trae los productos del json
  productos.getProductos("../productos.json").then(productos => {

    // Una vez que se obtiene renderiza los productos
    display.displayProductos(productos)

    // Una vez que se obtiene se guardan en el local storage
    Storage.saveProductos(productos)

  }).then(() => {

    // Por útlimo se busca el id de los botones y se asignan tareas
    display.getBotonesCarrito()

    itemsCarrito()
  })


})
