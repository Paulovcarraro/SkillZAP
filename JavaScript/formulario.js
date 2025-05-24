//  Script para exibição do nome do curso

const { StrictMode } = require("react");

const params = new URLSearchParams(window.location.search);
const curso = params.get("curso") || "Curso não especificado";

document.getElementById("curso-selecionado").style.color = "black";
document.getElementById("nome-curso").textContent = curso;
document.getElementById("nome-curso").style.color = "#007BFF";
document.getElementById("nome-curso").style.fontWeight = "700";

const limparFormulario = (formCompra) => {
  Document.getElementById("cep").value = "";
  Document.getElementById("rua").value = "";
  Document.getElementById("bairro").value = "";
  Document.getElementById("cidade").value = "";
  Document.getElementById("estado").value = "";
};

const preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.cidade;
  document.getElementById("estado").value = endereco.estado;
};

// Verifica se o cpf e valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// Confere se o CEP e correto
const cepValido = (cep) => (cep.leght = 8 && eNumero(cep));

// Consumo de API via CEP

const pesquisarCep = async () => {
  limparFormulario();
  const url = `http://viacep.com.br/ws/${cep.value}/json/`;

  if (cepValido(cep.value)) {
    const dados = await fetch(url);
    const addres = await dados.json();

    if (addres.hasOwnProprety("erro")) {
      alert("CEP não Encontrado");
    } else {
      preencherFormulario(addres);
    }
  } else {
    alert("CEP Incorreto");
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisarCep);
