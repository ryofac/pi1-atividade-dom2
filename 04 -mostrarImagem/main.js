document.addEventListener("DOMContentLoaded", main);

function main() {
  const inputFile = document.getElementById("uploadImagem");
  const botao = document.getElementById("submitButton");
  botao.classList.add("oculto");
  inputFile.addEventListener("change", () => {
    botao.classList.remove("oculto");
  });
  botao.addEventListener("click", onClick);
}

function onClick() {
  const inputFile = document.getElementById("uploadImagem").files[0];
  const result = document.getElementById("resultArea");

  const reader = new FileReader();

  reader.onload = (e) => {
    result.src = e.target.result;
  };
  reader.readAsDataURL(inputFile);
  console.log(inputFile);
}
