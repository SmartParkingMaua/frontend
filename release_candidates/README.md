# Release Candidates

## Requeriments

* node
* npm
* python 2 ou 3

### Running the application

Rode o seguinte comando de dentro da pasta **serverside**:

```console
npm install
```

Após instalar as dependências, inicie a API rodando: 

```console
node index.js
```

Em outro console, rode um dos seguintes comandos de dentro da pasta **rcX/clientside** (sendo X o número do rc desejado) para iniciar a aplicação:

* Python 2:
```console
python -m SimpleHTTPServer 8000
```

* Python 3:
```console
python3 -m http.server 8000
```

Acesse a aplicação em: ``http://localhost:8000``

Acesse a documentação da API em: ``http://localhost:8080/docs/``
