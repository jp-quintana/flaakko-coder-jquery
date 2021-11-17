const URL_JSON = "../productos.json"

$(document).ready(() => {
  $.getJSON(URL_JSON, (response, status) => {

    if (status !== 'success') {
      throw new ERROR('error')
    }

    for (const articulo of response) {
      $('#productos').prepend(
        `
        <div class="productos__item">
            <a href="producto.html" class="productos__enlace">
              <div class="productos__imagen-contenedor">
                <img src=${articulo.img1} alt="" class="productos__imagen">
                <img src=${articulo.img2} alt="" class="productos__imagen-bottom">
              </div>
              <ul class="productos__info">
                <li class="productos__nombre">${articulo.tipo}<span>${articulo.modelo}</span> ${articulo.color}</li>
                <li class="productos__precio">$${articulo.precio}</li>
              </ul>
            </a>
        </div>
        `
      )
    }
  })
})
