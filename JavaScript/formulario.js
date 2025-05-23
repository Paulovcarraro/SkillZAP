//  Script para exibição do nome do curso

const params = new URLSearchParams(window.location.search);
const curso = params.get("curso") || "Curso não especificado";

document.getElementById("curso-selecionado").style.color = "black";
document.getElementById("nome-curso").textContent = curso;
document.getElementById("nome-curso").style.color = "#007BFF";
document.getElementById("nome-curso").style.fontWeight = "700";
