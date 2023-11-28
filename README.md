# CEPRegister - Sistema web para consulta de endereço via CEP 🌐

## Introdução

Este é um projeto web que permite consultar um endereço utilizando o CEP, armazenar este registro e exibir os registros armazenados. 

A busca do endereço é realizada em JavaScript, através de uma requisição para a API disponibilizada no site https://viacep.com.br/. Os dados são armazenados em um banco de dados SQLite, permitindo a persistência e recuperação dos registros.

Além disso, implementei funcionalidades de ordenação dos registros. Você pode ordenar os registros por cidade, bairro e estado, tanto em ordem crescente quanto decrescente.

## Como Usar 🚀

Siga estes passos para configurar e executar o projeto localmente:

### 1. Clonar o repositório 📋

```bash
git clone https://github.com/Sergio-Gabriell/CEPRegister.git
cd CEPRegister
```

### 2. Instalar as dependências 🛠️

Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 3. Iniciar o servidor 📡

Execute o servidor Node.js:

```bash
node server.js
```

### 4. Acessar a aplicação 👁️

Abra o navegador e vá para http://localhost:3000 para acessar a aplicação.

## Contribuições e Problemas 🤝

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões.
