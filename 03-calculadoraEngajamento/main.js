document.addEventListener("DOMContentLoaded", main);

function main() {
  const botao = document.getElementById("botaoErro");
  botao.addEventListener("click", onClick);
}

function onClick() {
  const viewsNumberElement = document.getElementById("viewsInput");
  const interactionNumberElement = document.getElementById("interactionsInput");
  const destino = document.getElementById("resultArea");

  const result =
    (interactionNumberElement.value / viewsNumberElement.value) * 100;

  const isValid = validate(result, function validateResult(result) {
    return !isNaN(result) && isFinite(result);
  });

  if (!isValid) {
    showErrorMessage(`Não é possível realizar a divisão!`, "errorArea", 1.5);
    return;
  }
  destino.textContent = `O resultado é um engajamento de ${result.toFixed(2)}%`;
}

function validate(inputValue, validator) {
  return validator(inputValue);
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
