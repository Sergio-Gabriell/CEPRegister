const express = require('express'); // Importa o módulo Express
const sqlite3 = require('sqlite3'); // Importa o módulo SQLite3
const path = require('path');  // Importa o módulo Path
const app = express(); // Cria uma nova aplicação Express
const port = 3000; // Define a porta em que o servidor vai escutar

// Configura o banco de dados SQLite
const db = new sqlite3.Database('registros.db'); // Cria uma nova instância do SQLite e configura o banco de dados 'registros.db'

// Cria a tabela 'registros' se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS registros (
    cep TEXT,
    logradouro TEXT,
    bairro TEXT,
    localidade TEXT,
    uf TEXT
  )
`);

// Configura o Express para usar o middleware 'express.json()' para permitir requisições JSON
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Configura o Express para servir arquivos estáticos do diretório atual

// Define um endpoint para salvar registros
app.post('/api/registros', (req, res) => {
    const { cep, logradouro, bairro, localidade, uf } = req.body; // Extrai os dados do corpo da requisição
  
    console.log('Recebendo registro:', { cep, logradouro, bairro, localidade, uf }); // Exibe os dados recebidos no console
  
    // Verifica se algum campo está vazio e atribui null em vez de uma string vazia
    const valores = [cep, logradouro || null, bairro || null, localidade, uf];
  
    // Insere os dados na tabela 'registros'
    db.run(
      'INSERT INTO registros (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?)',
      valores,
      err => {
        if (err) {
          console.error('Erro ao inserir no banco de dados:', err.message); // Exibe um erro no console se ocorrer um erro ao inserir os dados
          res.status(500).json({ error: 'Erro ao salvar o registro.' }); // Envia uma resposta com status 500 e uma mensagem de erro
        } else {
          console.log('Registro inserido com sucesso no banco de dados.'); // Exibe uma mensagem no console se os dados foram inseridos com sucesso
          res.json({ message: 'Registro salvo com sucesso.' }); // Envia uma resposta com uma mensagem de sucesso
        }
      }
    );
});

// Define um endpoint para obter todos os registros com opções de ordenação
app.get('/api/registros', (req, res) => {
    const { order, direction } = req.query; // Extrai os parâmetros de ordenação da query da requisição
  
    let orderBy = 'cep'; // Valor padrão para ordenação
    let orderDirection = 'ASC'; // Valor padrão para direção da ordenação
  
    // Mapeia os campos permitidos para ordenação
    const allowedFields = ['cep', 'localidade', 'bairro', 'uf'];
  
    // Verifica se foram fornecidos parâmetros de ordenação válidos
    if (order && (direction === 'ASC' || direction === 'DESC') && allowedFields.includes(order)) {
      orderBy = order;
      orderDirection = direction;
    }
  
    const query = `SELECT * FROM registros ORDER BY ${orderBy} ${orderDirection}`; // Define a query SQL para obter os registros ordenados
  
    // Executa a query SQL
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message); // Exibe um erro no console se ocorrer um erro ao executar a query
        res.status(500).json({ error: 'Erro ao obter os registros.' }); // Envia uma resposta com status 500 e uma mensagem de erro
      } else {
        res.json(rows); // Envia uma resposta com os registros obtidos
      }
    });
});

// Define um endpoint para servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Envia o arquivo 'index.html' como resposta
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`); // Exibe uma mensagem no console quando o servidor é iniciado
});
