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


window.onload = loadDoc;

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