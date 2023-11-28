// Função para consultar um CEP
function consultarCEP() {
    // Obter o campo de entrada do CEP e a div de resultados
    const cepInput = document.getElementById('cepInput'); // Obtém o campo de entrada do CEP pelo ID
    const resultadosDiv = document.getElementById('resultados'); // Obtém a div de resultados pelo ID

    // Obter o valor do campo de entrada do CEP e remover todos os caracteres não numéricos
    const cep = cepInput.value.replace(/\D/g, ''); // <-- Remove todos os caracteres não numéricos

    // Verificar se o CEP tem 8 dígitos
    if (cep.length !== 8) {
      alert('CEP inválido. Por favor, insira um CEP válido.'); // <-- Exibe um alerta se o CEP não tiver 8 dígitos
      return;
    }

    // Fazer uma requisição à API ViaCEP para obter informações sobre o CEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`) // <-- Faz uma requisição à API ViaCEP
      .then(response => response.json()) // <-- Converte a resposta em JSON
      .then(data => {
        console.log('Dados recebidos da API:', data); // <-- Exibe os dados recebidos no console

        // Verificar se a API retornou um erro
        if (data.erro) {
          alert('CEP não encontrado. Por favor, verifique o CEP digitado.'); // <-- Exibe um alerta se a API retornou um erro
        } else {
          // Exibir os resultados
          const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`; // <-- Formata o endereço
          resultadosDiv.innerHTML = `<p><strong>Endereço:</strong> ${endereco}`; // <-- Exibe o endereço na div de resultados

          // Salvar o registro no backend
          salvarRegistro(data); // <-- Chama a função para salvar o registro no backend
        }
      })
      .catch(error => console.error('Erro na consulta do CEP:', error)); // <-- Exibe um erro no console se ocorrer um erro na requisição
}

// Função para salvar um registro no backend
function salvarRegistro(registro) {
    // Fazer uma requisição POST para o endpoint '/api/registros' do servidor
    fetch('http://localhost:3000/api/registros', { // <-- Faz uma requisição POST para o endpoint '/api/registros' do servidor
      method: 'POST', // <-- Define o método da requisição como POST
      headers: {
        'Content-Type': 'application/json', // <-- Define o tipo de conteúdo da requisição como JSON
      },
      body: JSON.stringify(registro), // <-- Converte o registro em JSON e o envia no corpo da requisição
    })
      .then(response => response.json()) // <-- Converte a resposta em JSON
      .then(data => {
        console.log('Resposta do servidor:', data); // <-- Exibe a resposta do servidor no console
      })
      .catch(error => console.error('Erro ao enviar dados para o servidor:', error)); // <-- Exibe um erro no console se ocorrer um erro na requisição
}
