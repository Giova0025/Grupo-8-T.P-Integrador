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

/*validacion de datos(formulario de contacto)*/


const form = document.getElementById('form');
const nombre = document.getElementById('username');
const email = document.getElementById('email');
const contraseña = document.getElementById('password');
const contraseña2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nombreValue = nombre.value.trim();
    const emailValue = email.value.trim();
    const contraseñaValue = contraseña.value.trim();
    const contraseña2Value = contraseña2.value.trim();

    if(nombreValue === '') {
        setError(nombre, 'Se requiere un nombre de usuario');
    } else {
        setSuccess(nombre);
    }

    if(emailValue === '') {
        setError(email, 'Se requiere un correo electronico');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'El correo electronico no es correcto');
    } else {
        setSuccess(email);
    }

    if(contraseñaValue === '') {
        setError(contraseña, 'Se requiere contraseña');
    } else if (contraseñaValue.length < 4 ) {
        setError(contraseña, 'La contraseña debe tener al menos 4 caracteres')
    } else {
        setSuccess(contraseña);
    }

    if(contraseña2Value === '') {
        setError(contraseña2, 'Por favor, confirme su contraseña');
    } else if (contraseña2Value !== contraseñaValue) {
        setError(contraseña2, "Las contraseñas no coinciden");
    } else {
        setSuccess(contraseña2);
    }

};

//INICIO. DE AQUI EN ADELANTE CORRESPONDE AL USO DE LA API Y EL PAGINADOR

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

window.onload = traerApi;

const apiKey = '356e9ef6b35f3477dd1929c933f50cb0';
const peliculasDiv = document.querySelector('.peliculas');

function traerApi() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=${currentPage}`;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      const peliculas = response.results;
      console.log(peliculas);
      //const peliculas = response;
      const urlBase="https://image.tmdb.org/t/p/";
      const tamanio="w342";
      for (i = 0; i < peliculas.length; i++) {
        const newImg = document.createElement('img');
        const src=urlBase+tamanio+peliculas[i].poster_path;
        newImg.src = src;
        newImg.setAttribute('width', '350px');
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

//FIN. AQUI TERMINA EL USO DE LA API Y EL PAGINADOR