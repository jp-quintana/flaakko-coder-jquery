const URL_JSON = ""

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
                <form id="form-producto" class="" action="" >
                  <select id="talle-producto" class="producto__talle" name="" required>
                    <option value="" disabled selected>Elegi tu talle</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <button class="producto__boton producto-boton" type="submit" name="button" data-id=${producto.sku}>Agregar a carrito</button>
                </form>
            </div>
            `
          )
        }
  }

  getBotonesCarrito() {
    let botones = [...$(".producto-boton")]
    let id = botones.map(boton => {
      return boton.dataset.id
    })

  }
}

class Storage {
  static saveProductos(productos){
    localStorage.setItem("productos", JSON.stringify(productos))
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

const checkCarrito = (sku, talle) => {
  let idEnCarrito = carrito.find(producto => product.sku === sku)
  let talleEnCarrito = carrito.find(producto => producto.talle === talle)

  if (idEnCarrito && talleEnCarrito) {
    agregarUnidadCarrito(findCarrito(sku));
  } else {
    const sku = sku
    const tipo = "Buzo"
    const modelo = "De Gira"
    const color = "Blanco"
    const talle = $('#talle-producto').val()
    const precio = 6400

    const producto = new ProductoCarrito(sku, tipo, modelo, color, talle, precio);

    addCarrito(producto);
  }
  return
}

console.log(checkCarrito())

















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
