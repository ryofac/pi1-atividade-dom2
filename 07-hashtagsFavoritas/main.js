document.addEventListener("DOMContentLoaded", main);

function main() {
  const submitButton = document.getElementById("botaoEnviar");
  const clearButton = document.getElementById("botaoLimpar");

  submitButton.addEventListener("click", submitOnClick);
  clearButton.addEventListener("click", cleanHashtags);
}

function cleanHashtags() {
  const destino = document.getElementById("hashtagsSelect");
  destino.innerHTML = "";
}

function submitOnClick() {
  const hashtag = document.getElementById("mensagem");
  const destino = document.getElementById("hashtagsSelect");

  if (!validateHashtag(hashtag.value)) {
    showErrorMessage(`A hashtag é inválida!`, "errorArea", 1.5);
    return;
  }
  const option = document.createElement("option");
  option.textContent = hashtag.value;
  destino.appendChild(option);
}

function validateHashtag(hashtag) {
  return hashtag.trim() !== "" && hashtag !== null && hashtag.startsWith("#");
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
