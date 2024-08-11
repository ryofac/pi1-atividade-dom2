document.addEventListener("DOMContentLoaded", main);

function main() {
  const submitButton = document.getElementById("botaoEnviar");
  const clearButton = document.getElementById("botaoLimpar");

  submitButton.addEventListener("click", submitOnClick);
  clearButton.addEventListener("click", cleanSelectedHashtags);
}

function cleanSelectedHashtags() {
  const destino = document.getElementById("hashtagsSelect");
  const selectedOptionsArr = Array.from(destino.selectedOptions);
  selectedOptionsArr.forEach((option) => {
    destino.removeChild(option);
  });
}

function submitOnClick() {
  const hashtag = document.getElementById("mensagem");
  const destino = document.getElementById("hashtagsSelect");

  if (!validateHashtagNotNull(hashtag.value)) {
    showErrorMessage(`A hashtag é inválida!`, "errorArea", 1.5);
    return;
  }

  if (!validateHashtagLen(hashtag.value)) {
    showErrorMessage(
      "Escreva uma hashtag com mais de 2 caracteres!",
      "errorArea",
      1.5
    );
    return;
  }

  if (!validateHashtagLimit()) {
    showErrorMessage("Existem 5 hashtags na lista!", "errorArea", 1.5);
    return;
  }

  const option = document.createElement("option");
  option.textContent = hashtag.value;
  destino.appendChild(option);
}

function validateHashtagNotNull(hashtag) {
  return hashtag.trim() !== "" && hashtag !== null && hashtag.startsWith("#");
}

function validateHashtagLen(hashtag) {
  console.log(hashtag.length);
  return hashtag.length > 2;
}

function validateHashtagLimit() {
  const destino = document.getElementById("hashtagsSelect");
  const valuesCount = destino.childNodes.length;
  return valuesCount < 5;
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
