document.addEventListener("DOMContentLoaded", main);

function main() {
  const moveRight = document.getElementById("moverParaDireitaBtn");
  const moveLeft = document.getElementById("moverParaEsquerdaBtn");

  const rightSelect = document.getElementById("carteiraInvestimentos");
  const leftSelect = document.getElementById("ativosDisponiveis");

  moveLeft.addEventListener("click", onMoveLeft);
  moveRight.addEventListener("click", onMoveRight);
}

function onMoveLeft() {
  const rightSelect = document.getElementById("carteiraInvestimentos");
  const leftSelect = document.getElementById("ativosDisponiveis");

  const selectedValues = rightSelect.selectedOptions;

  if (selectedValues.length === 0) {
    showErrorMessage(
      "Selecione algum valor para ser movido!",
      "errorArea",
      1.5
    );
    return;
  }

  for (let element of selectedValues) {
    leftSelect.appendChild(element);
  }
}

function onMoveRight() {
  const rightSelect = document.getElementById("carteiraInvestimentos");
  const leftSelect = document.getElementById("ativosDisponiveis");

  const selectedValues = leftSelect.selectedOptions;
  if (selectedValues.length === 0) {
    showErrorMessage(
      "Selecione algum valor para ser movido!",
      "errorArea",
      1.5
    );
    return;
  }

  for (let element of selectedValues) {
    console.log(element);
    rightSelect.appendChild(element);
  }
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
