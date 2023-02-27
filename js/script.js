let sair = false;
let ids = 0;
const veiculos = obterVeiculos();

do {
  const operacao = Number(
    prompt(`
      No momento existem ${veiculos.length} carros cadastrados!
    
      Escolha uma das opções para interagir com o sistema.
    
      1. Cadastrar veículo
      2. Listar todos os veículos
      3. Filtrar veículos por marca
      4. Atualizar veículo
      5. Remover veículo
      6. Sair do sistema
    `)
  );

  switch (operacao) {
    case 1:
      cadastrarVeiculo();
      break;
    case 2:
      listarVeiculos();
      break;
    case 3:
      filtrarVeiculosMarca();
      break;
    case 4:
      atualizarVeiculo();
      break;
    case 5:
      removerVeiculo();
      break;
    case 6:
      sair = true;
      break;
    default:
      alert("Esta opção não é válida!");
  }
} while (!sair);

function salvarVeiculos() {
  localStorage.setItem("veiculos", JSON.stringify(veiculos));
}

function obterVeiculos() {
  const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
  return veiculos;
}

function cadastrarVeiculo() {
  const carro = {
    id: gerarId(),
    modelo: prompt("Digite o modelo do veículo: "),
    marca: prompt("Digite a marca do veículo: "),
    ano: Number(prompt("Digite o ano do veículo: ")),
    cor: prompt("Digite a cor do veículo: "),
    preco: Number(prompt("Digite o preço do veículo: ")),
  };

  veiculos.push(carro);
  salvarVeiculos();
}

function gerarId() {
  return ids + 1;
}

function exibirListas(filtrado, array) {
  let lista = "";
  array.sort(function (a, b) { return b.preco - a.preco; });

  if (!filtrado) {
    array.forEach(function (item) {
      lista += `ID: ${item.id} | Modelo: ${item.modelo} | Cor: ${item.cor} | Preço: R$ ${item.preco}  | Ano: ${item.ano} | Marca: ${item.marca} \n`;
    });

    return lista;
  }

  array.forEach(function (item) {
    lista += `ID: ${item.id} | Modelo: ${item.modelo} | Cor: ${item.cor} | Preço: R$ ${item.preco}  \n`;
  });

  return lista;
}

//////////////////////////////////////////////////////////

function listarVeiculos() {
  const lista = exibirListas(false, veiculos);
  alert(lista);
}

/////////////////////////////////////////////////////////

function filtrarVeiculosMarca() {
  const marca = prompt("Digite a marca que deseja filtrar: ");
  const marcaFiltrada = veiculos.filter(function (item) {
    return item.marca === marca;
  });

  if (marcaFiltrada.length === 0) {
    return alert("Nenhum carro foi cadastrado com a marca digitada.");
  }

  const lista = exibirListas(true, marcaFiltrada);
  alert(lista);
}

////////////////////////////////////////////////////////

function atualizarVeiculo() {
  const id = Number(prompt("Digite o ID do veículo."));
  const veiculoFiltrado = veiculos.find(function (item) {
    return item.id === id;
  });

  if (!veiculoFiltrado) {
    return alert("Veículo não encontrado");
  }
  
  alert(`O veículo encontrado foi: ${veiculoFiltrado.modelo}`);

  veiculoFiltrado.cor = prompt("Digite a nova cor: ");
  veiculoFiltrado.preco = Number(prompt("Digite o novo valor: "));
  veiculos.splice(veiculoFiltrado.id - 1, 1, veiculoFiltrado);
  salvarVeiculos();

  return alert("Veículo atualizado com sucesso!");
}

///////////////////////////////////////////////////////

function removerVeiculo() {
  const id = Number(prompt("Digite o ID do veículo: "));

  const veiculoFiltrado = veiculos.find(function (item) {
    return item.id === id;
  });

  if (!veiculoFiltrado) {
    return alert("Veiculo não encontrado!");
  }

  veiculos.splice(id - 1, 1);
  salvarVeiculos();
  return alert(`Veículo ${veiculoFiltrado.modelo} removido com sucesso!`);
}
