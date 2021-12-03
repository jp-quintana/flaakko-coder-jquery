const URL_JSON = ""
let botonesDOM = []
console.log(carrito)

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
        } else {
          addCarrito(productoCarrito)
        }

        // Storage.saveCarrito(carrito)


      })








    })
    // let talles = forms.map(form => {
    //   return
    // })
    // console.log(talles)
    // $('.form-producto').on('submit', (e) => {
    //   e.preventDefault()
    //   console.log(id)
      // e.preventDefault()
      //
      // if ($(event.target).hasClass('.producto-boton')) {
        // console.log(id)
        // checkCarrito($(event.target).data('id'), $('#talle-producto').val());

      // }

  //   })
  // }
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
  })

})

// $('#form-producto').on('submit', (e) => {
//   e.preventDefault()
//
//   if ($(event.target).hasClass('.producto-boton')) {
//     console.log('hola')
//     // checkCarrito($(event.target).data('id'), $('#talle-producto').val());
//   }
// })





// $('#form-producto').on('submit', () => {
//   if (carrito.) {
//
//   } else {
//     sku = sku + 1
//     const tipo = "Buzo"
//     const modelo = "De Gira"
//     const color = "Blanco"
//     const talle = $('#talle-producto').val()
//     const precio = 6400
//
//     const producto = new ProductoCarrito(sku, tipo, modelo, color, talle, precio);
//
//     addCarrito(producto);
//   }
// })

// const checkCarrito = (sku, talle) => {
//   let idCarrito = carrito.map(producto => {
//     return producto['sku']
//   })
//   let talleCarrito = carrito.map(producto => {
//     return producto['talle']
//   })
//   if (idCarrito.indexOf(sku) > 0 && talleCarrito.indexOf(talle) > 0) {
//     agregarUnidadCarrito(findCarrito(sku));
//   } else {
//     const sku = sku
//     const tipo = "Buzo"
//     const modelo = "De Gira"
//     const color = "Blanco"
//     const talle = $('#talle-producto').val()
//     const precio = 6400
//
//     const producto = new ProductoCarrito(sku, tipo, modelo, color, talle, precio);
//
//     addCarrito(producto);
//   }
//   return
// }
//
// console.log(checkCarrito())















// $(document).ready(() => {
  // $.getJSON(URL_JSON, (response) => {
    // for (let i = 0; i < response.length; i++) {
    //   for (let j = 0; j < response[i].length; j++) {
    //     $('#productos').append(
    //       `
    //       <div class="productos__item">
    //           <a href="producto.html" class="productos__enlace">
    //             <div class="productos__imagen-contenedor">
    //               <img src=${response[i][j].img1} alt="" class="productos__imagen">
    //               <img src=${response[i][j].img2} alt="" class="productos__imagen-bottom">
    //             </div>
    //             <ul class="productos__info">
    //               <li class="productos__nombre">${response[i][j].tipo} <span>${response[i][j].modelo}</span> ${response[i][j].color}</li>
    //               <li class="productos__precio">$${response[i][j].precio}</li>
    //             </ul>
    //           </a>
    //       </div>
    //       `
    //     )
    //   }
    // }

//
//     for (let articulo of response) {
//       $('#productos').append(
//         `
//         <div class="productos__item">
//             <a href="producto.html" class="productos__enlace">
//               <div class="productos__imagen-contenedor">
//                 <img src=${articulo.img1} alt="" class="productos__imagen">
//                 <img src=${articulo.img2} alt="" class="productos__imagen-bottom">
//               </div>
//               <ul class="productos__info">
//                 <li class="productos__nombre">${articulo.tipo} <span>${articulo.modelo}</span> ${articulo.color}</li>
//                 <li class="productos__precio">$${articulo.precio}</li>
//               </ul>
//             </a>
//         </div>
//         `
//       )
//     }
//     // console.log(response[1].img1);
//     // console.log(response[2]);
//   }).fail(() => {
//     throw new Error('error')
//   })
// })


// $(document).ready(() => {
//   $.ajax({
//     method: "GET",
//     datatype: 'json',
//     url: "../productos.json",
//     success: (response) => {
//       for (let articulo of response) {
//         $('#productos').append(
//           `
//           <div class="productos__item">
//               <a href="producto.html" class="productos__enlace">
//                 <div class="productos__imagen-contenedor">
//                   <img src=${articulo.img1} alt="" class="productos__imagen">
//                   <img src=${articulo.img2} alt="" class="productos__imagen-bottom">
//                 </div>
//                 <ul class="productos__info">
//                   <li class="productos__nombre">${articulo.tipo} <span>${articulo.modelo}</span> ${articulo.color}</li>
//                   <li class="productos__precio">$${articulo.precio}</li>
//                 </ul>
//               </a>
//           </div>
//           `
//         )
//       }
//     }
//   }).fail(() => {
//     throw new Error('error')
//   })
// })
