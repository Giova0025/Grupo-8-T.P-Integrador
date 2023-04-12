/*menu hamburguesa*/

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");
  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menu");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menu");
  }
});

/*registro*/

const boton = document.getElementById("miBoton");
const elementoActivo = document.getElementById("cuerpoRegistro");
boton.addEventListener("click", () =>{
  elementoActivo.classList.remove("activo");
  elementoActivo.classList.add("desactivo");
});



window.onload = traerApi;

function loadDoc() {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      results = JSON.parse(this.responseText).results;
      console.log(results);
      var currentDiv = document.getElementById('peliculas');
      for (i = 0; i < results.length; i++) {
        const newImg = document.createElement('img');
        newImg.src = results[i].primaryImage.url;
        newImg.setAttribute('width', '25%');
        currentDiv.appendChild(newImg);

        const newP = document.createElement('p');
        newP.textContent = results[i].titleText.text;
        currentDiv.appendChild(newP);

        if (i != results.length - 1) {
          const newBr = document.createElement('br');
          currentDiv.appendChild(newBr);
        }
      }
    }
  };
  xhr.open(
    'GET',
    'https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&list=top_rated_250'
  );
  xhr.setRequestHeader(
    'X-RapidAPI-Key',
    'a8d767de57mshb85f8e4cffe244ep130fb3jsn81f02efa9e64'
  );
  xhr.setRequestHeader('X-RapidAPI-Host', 'moviesdatabase.p.rapidapi.com');
  xhr.send(data);
}

function traerApi() {
  const apiKey = '356e9ef6b35f3477dd1929c933f50cb0';
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      const peliculas = response.results;
      console.log(peliculas);
      //const peliculas = response;

      var currentDiv = document.getElementById('peliculas');
      const urlBase="https://image.tmdb.org/t/p/";
      const tamanio="w342"
      for (i = 0; i < peliculas.length; i++) {
        const newImg = document.createElement('img');
        const src=urlBase+tamanio+peliculas[i].poster_path;
        newImg.src = src;
        newImg.setAttribute('width', '350px');
        currentDiv.appendChild(newImg);

        const newH = document.createElement('h2');
        newH.textContent = peliculas[i].title;
        currentDiv.appendChild(newH);

        const newP = document.createElement('p');
        newP.textContent = peliculas[i].overview;
        currentDiv.appendChild(newP);

        const newPValoracion = document.createElement('p');
        newPValoracion.textContent = peliculas[i].vote_average;
        currentDiv.appendChild(newPValoracion);

        if (i != peliculas.length - 1) {
          const newBr = document.createElement('br');
          currentDiv.appendChild(newBr);
        }
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}