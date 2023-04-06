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

const apiKey = '356e9ef6b35f3477dd1929c933f50cb0';
const peliculasDiv = document.querySelector('.peliculas');
const firstPageButton = document.querySelector('.first-page');
const previousPageButton = document.querySelector('.previous-page');
const currentPageElement = document.querySelector('.current-page');
const nextPageButton = document.querySelector('.next-page');
const lastPageButton = document.querySelector('.last-page');

let currentPage = 1;
let total_pages = 500; //a pesar de q la api diga que tiene 548 paginas, solo llega hasta 500
let consumiApi = false;

function nextPage(){
  currentPage+=1;
  currentPageElement.textContent=`Página ${currentPage}`;
  firstPageButton.removeAttribute("disabled");
  previousPageButton.removeAttribute("disabled");
  if(currentPage==total_pages){
    nextPageButton.setAttribute("disabled","");
    lastPageButton.setAttribute("disabled","");
  }
  peliculasDiv.innerHTML="";
  traerApi();
}

function lastPage(){
  currentPage=total_pages;
  currentPageElement.textContent=`Página ${currentPage}`;
  firstPageButton.removeAttribute("disabled");
  previousPageButton.removeAttribute("disabled");
  nextPageButton.setAttribute("disabled","");
  lastPageButton.setAttribute("disabled","");
  peliculasDiv.innerHTML="";
  traerApi();
}

function previousPage(){
  currentPage-=1;
  currentPageElement.textContent=`Página ${currentPage}`;
  nextPageButton.removeAttribute("disabled");
  lastPageButton.removeAttribute("disabled");
  if(currentPage==1){
    firstPageButton.setAttribute("disabled","");
    previousPageButton.setAttribute("disabled","");
  }
  peliculasDiv.innerHTML="";
  traerApi();
}

function firstPage(){
  currentPage=1;
  currentPageElement.textContent=`Página ${currentPage}`;
  nextPageButton.removeAttribute("disabled");
  lastPageButton.removeAttribute("disabled");
  firstPageButton.setAttribute("disabled","");
  previousPageButton.setAttribute("disabled","");
  peliculasDiv.innerHTML="";
  traerApi();
}

function traerApi() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=${currentPage}`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      const peliculas = response.results;
      console.log(peliculas);
      const urlBase="https://image.tmdb.org/t/p/";
      const tamanio="w342"
      for (i = 0; i < peliculas.length; i++) {
        const newImg = document.createElement('img');
        const src=urlBase+tamanio+peliculas[i].poster_path;
        newImg.src = src;
        newImg.setAttribute('width', '25%');
        peliculasDiv.appendChild(newImg);

        const newH = document.createElement('h2');
        newH.textContent = peliculas[i].title;
        peliculasDiv.appendChild(newH);

        const newP = document.createElement('p');
        newP.textContent = peliculas[i].overview;
        peliculasDiv.appendChild(newP);

        const newPValoracion = document.createElement('p');
        newPValoracion.textContent = peliculas[i].vote_average;
        peliculasDiv.appendChild(newPValoracion);

        if (i != peliculas.length - 1) {
          const newBr = document.createElement('br');
          peliculasDiv.appendChild(newBr);
        }

        if (consumiApi == false){
          nextPageButton.removeAttribute("disabled");
          lastPageButton.removeAttribute("disabled");
          consumiApi=true;
        }
        
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/*
function fetchMovies(page) {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`;

  axios.get(url)
    .then(response => {
      const movies = response.data.results;
      totalPages = response.data.total_pages;

      // Actualizar la lista de películas en la página
      moviesListElement.innerHTML = '';
      movies.forEach(movie => {
        const imageUrl = `https://
*/