## Aplicação

### Setup

**Requerimentos**: Possuir Node.js/npm e MongoDB instalados na máquina. Também faz-se necessário ter o Postman instalado para poder testar a API com outros verbos HTTP que não seja o GET. Caso queira uma interface gráfica para o MongoDB, instalar o Robo3T.

Dentro da pasta onde estiver o package.json, executar o seguinte comando:
```console
http://localhost:6419/npm install
```

Depois da instalação das dependências, rode o seguinte comando para iniciar a aplicação:
```console
node index.js
```

Para acessa-lá, entre em: ``http://localhost:4000``

### Comandos no Postman:

*GET*: Exemplo de URL com coordenadas: ``http://localhost:4000/api/ninjas?lng=-80&lat=25``

*POST*: Exemplo de URL: ``http://localhost:4000/api/ninjas``

Exemplo de Body:
```console
{
    "name": "Mariana",
    "rank": "black belt",
    "available": true,
    "geometry": { "type": "point", "coordinates": [68, -26] }
}
```

*PUT*: Exemplo de URL com ID do objeto do DB: ``http://localhost:4000/api/ninjas/5b121cbc3c2c571fc84485a1``

Exemplo de Body:
```console
{
    "name": "Maria"
}
```

*DELETE*: Exemplo de URL com ID do objeto do DB: ``http://localhost:4000/api/ninjas/5b0d7c88a3ef184928ff09fb``
