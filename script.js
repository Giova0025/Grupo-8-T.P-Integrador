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