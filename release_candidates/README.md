# Release Candidate 0

## Requeriments

* node
* npm
* python3

### Running the application

Rode o seguinte comando de dentro da pasta **serverside**:

```console
npm install
```

Após instalar as dependências, inicie a API rodando: 

```console
node index.js
```

Em outro console, rode o seguinte comando de dentro da pasta **rcX/clientside** (sendo X o número do rc desejado) para iniciar a aplicação:

```console
python3 -m http.server 8000
```

Acesse a aplicação em: ``http://localhost:8000``

Acesse a documentação da API em: ``http://localhost:8080/docs/``