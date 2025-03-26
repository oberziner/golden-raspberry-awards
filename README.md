Este projeto implementa um serviço que expõe uma API HTTP com um único endpoint, que retorna os produtores vencedores da categoria Pior Filme do Golden Raspberry Awards com os maiores e menores intervalos entre premiações.

# Como executar

O projeto foi escrito em Typescript + Node.js, e necessita da versão 22.14.0 do Node.js (provavelmente funcionará com versões menores, mas foi testado apenas com a 22.14.0)

Instale as dependencias:

`npm install`

Compile/empacote a aplicação:

`npm run build`

Execute a aplicação (o servidor será iniciado usando a porta 3000):

`npm run start`

Para executar os testes:
Run the tests:

`npm test`

Como chamar o endpoint usando curl:

Example of a valid call:

```
curl -s -H "Content-Type: application/json" http://localhost:3000/awards
```

# Design do projeto

O projeto possui os seguintes componentes:

- src/index.ts: O ponto de entrada da aplicação. Ele é bem pequeno, e apenas inicia o servidor.
- src/server/start.ts: creates the Express application, binding the JSON middleware and the single HTTP route. If the application grew, this component would register additional middlewares and routes.
- src/server/start.ts: Cria a aplicação Express, registra as rotas e inicializa o banco de dados.
- src/server/db/: Possui os arquivos que expõem a conexão com o banco de dados em memória (SQLite), e que inicializa o banco, criando as tabelas e carregando os registros do arquivo movielist.csv. Eu considerei criar uma outra camada para abstrair o SQLite do resto da aplicação, o que permitiria trocar o banco de dados com alterações mínimas no código. Entretanto, isso exigiria que eu definisse uma interface de acesso a BD agnóstica ao client, o que demandaria um pouco mais de trabalho e dado o pouco tempo disponível, provavelmente resultaria numa interface incompleta e não portável. Por isso, decidi não implementar essa abstração.
- src/routes/award-intervals.ts: Implementa a rota do Express. Ele apenas chama o método que consulta os dados no banco de dados, monta e retorna a resposta HTTP com os dados retornados.
- src/repository/awards-repository.ts: Implementa um repositorio que retorna as informações de premiação do banco de dados, isolando o BD da camada HTTP da aplicação e centralizando o acesso às tabelas em um único módulo.
