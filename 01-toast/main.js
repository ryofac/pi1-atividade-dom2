document.addEventListener("DOMContentLoaded", main);

function main() {
  const botao = document.getElementById("botaoErro");
  const inputText = document.getElementById("mensagem");

  botao.addEventListener("click", () =>
    showErrorMessage(inputText.value, "messageArea", 5)
  );
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
