const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const list = document.getElementById("character-list");
let currentPage = 1;

function llamada(i) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
    .then((response) => {
      console.log(response.nextPage);
      if (!response.ok) {
        throw new Error("La solicitud no se pudo realizar");
      }

      console.log(response);
      return response.json();
    })
    .then((data) => {
      list.innerHTML = "";
      const personajes = data.results;
      console.log(personajes);
      personajes.forEach((personaje) => {
        const name = personaje.name;
        console.log(name);
        const image = personaje.image;
        const species = personaje.species;
        console.log(species);
        const item = document.createElement("li");
        const imgContainer = document.createElement("img");
        item.prepend(imgContainer);
        imgContainer.src = image;
        list.appendChild(item);
        list.appendChild(imgContainer);
        item.textContent = name;
      });
    });
}
llamada(currentPage);

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    llamada(currentPage);
  }
});

nextPage.addEventListener("click", () => {
  currentPage++;
  llamada(currentPage);
});
