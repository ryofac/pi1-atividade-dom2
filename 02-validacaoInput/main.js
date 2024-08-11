document.addEventListener("DOMContentLoaded", main);

function main() {
  const botao = document.getElementById("botaoErro");

  botao.addEventListener("click", onClick);
}

function onClick() {
  const inputText = document.getElementById("mensagem");
  const destino = document.getElementById("messageBox");
  const isValid = validate(inputText.value, function validateNotNull(value) {
    return value.trim() !== "" && value !== null;
  });

  if (!isValid) {
    showErrorMessage(`O campo é requerido!`, "errorArea", 1.5);
    return;
  }
  destino.textContent = inputText.value;
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
