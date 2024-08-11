document.addEventListener("DOMContentLoaded", main);

function main() {
  const botao = document.getElementById("enviarBtn");
  botao.addEventListener("click", getFavoritesSocialNetworks);
}

function showErrorMessage(message, parentElementId, timeSec) {
  let messageArea = document.getElementById(parentElementId);
  let errorMessage = document.getElementById("mensagemErro");

  if (errorMessage === null) {
    errorMessage = document.createElement("div");
    errorMessage.id = "mensagemErro";
    messageArea.appendChild(errorMessage);
  } else {
    errorMessage.classList.remove("oculto");
  }

  errorMessage.textContent = message;
  setTimeout(function () {
    errorMessage.classList.add("oculto");
  }, timeSec * 1000);
}

function getFavoritesSocialNetworks() {
  let favorites = document.getElementsByTagName("input");
  favorites = Array.from(favorites);
  favorites = favorites.filter((e) => e.checked);

  if (favorites.length === 0) {
    showErrorMessage("Selecione ao menos uma rede social!", "messageArea", 1.2);
    return;
  }

  updateFavoritesDiv(favorites);
}

function updateFavoritesDiv(favorites) {
  const showDiv = document.getElementById("redesSelecionadas");
  showDiv.textContent = "Redes sociais favoritas:";

  favorites.forEach((element) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = element.value;
    showDiv.appendChild(paragraph);
  });

  setTimeout(function () {
    showDiv.innerHTML = "";
  }, 5000);
}
