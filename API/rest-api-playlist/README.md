## Aplicação
### Setup
**Requerimentos**: possuir NodeJS/NPM e MongoDB instalados na máquina. Caso queira uma interface gráfica com o MongoDB, instalar o Robo3T.

Dentro da pasta onde estiver o package.json, executar o seguinte comando:
```
npm install
```

Depois da instação das dependencias, rode o seguinte comando para iniciar a aplicação:
```
node index.js
```

Para acessa-lá, entre em: ``localhost:4000``

### Comandos no Postman:
GET: localhost:4000/api/ninjas?lng=-80&lat=25 (coordenadas)

POST: localhost:4000/api/ninjas
->body: {
            "name": "Mariana",
            "rank": "black belt",
            "available": true,
            "geometry": { "type": "point", "coordinates": [68, -26] }
        }

PUT: localhost:4000/api/ninjas/5b121cbc3c2c571fc84485a1 (id do obj)
->body: {
            "name": "Maria"
        }

DELETE: localhost:4000/api/ninjas/5b0d7c88a3ef184928ff09fb (id do obj)
