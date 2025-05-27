// Script para exibição do nome do curso
const params = new URLSearchParams(window.location.search);
const curso = params.get("curso") || "Curso não especificado";

document.getElementById("curso-selecionado").style.color = "black";
document.getElementById("nome-curso").textContent = curso;
document.getElementById("nome-curso").style.color = "#007BFF";
document.getElementById("nome-curso").style.fontWeight = "700";

// Função para limpar os campos de endereço
const limparFormulario = () => {
  document.getElementById("cep").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

// Preenche o formulário com os dados da API
const preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

// Verifica se é um número
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// Verifica se o CEP é válido
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Função principal de busca do CEP
const pesquisarCep = async () => {
  const cep = document.getElementById("cep").value.replace("-", "");
  
  limparFormulario();

  if (cepValido(cep)) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const resposta = await fetch(url);
      const endereco = await resposta.json();

      if (endereco.hasOwnProperty("erro")) {
        alert("CEP não encontrado.");
      } else {
        preencherFormulario(endereco);
      }
    } catch (error) {
      alert("Erro ao buscar o CEP.");
      console.error(error);
    }
  } else {
    alert("CEP inválido.");
  }
};

// Adiciona evento ao sair do campo CEP
document.getElementById("cep").addEventListener("focusout", pesquisarCep);
