document.addEventListener("DOMContentLoaded", main);

function main() {
  const select = document.getElementById("imageSelect");

  select.addEventListener("change", (e) => onChange(e));
}

function onChange(event) {
  const result = document.getElementById("resultArea");
  result.src = event.target.value;
}
