document.addEventListener("DOMContentLoaded", main);

function main() {
  const moveRight = document.getElementById("moverParaDireitaBtn");
  const moveLeft = document.getElementById("moverParaEsquerdaBtn");

  moveLeft.addEventListener("click", onMoveLeft);
  moveRight.addEventListener("click", onMoveRight);
}

function onMoveLeft() {
  const rightSelect = document.getElementById("carteiraInvestimentos");
  const leftSelect = document.getElementById("ativosDisponiveis");

  const selectedValues = rightSelect.selectedOptions;

  for (let element of selectedValues) {
    leftSelect.appendChild(element);
  }
}

function onMoveRight() {
  const rightSelect = document.getElementById("carteiraInvestimentos");
  const leftSelect = document.getElementById("ativosDisponiveis");

  const selectedValues = leftSelect.selectedOptions;

  for (let element of selectedValues) {
    rightSelect.appendChild(element);
  }
}
