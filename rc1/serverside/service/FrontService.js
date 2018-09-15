'use strict';


/**
 * Retorna os estacionamentos e seus id's
 * Retorna um array com o nome e id de todos os estacionamentos registrados
 *
 * returns EstacionamentoResponse
 **/
exports.estacionamentosGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "estacionamentos" : [ {
    "name" : "Campus",
    "id" : 0
  }, {
    "name" : "Portão Principal",
    "id" : 1
  }, {
    "name" : "Divisão de Motores",
    "id" : 2
  }, {
    "name" : "Bolsão H",
    "id" : 3
  }, {
    "name" : "Bolsão U",
    "id" : 4
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retorna a quantidade de carros por dia
 * Retorna dois arrays de 24 elementos cada, sendo um de entrada e um de saida, com a quantidade de carros no estacionamento a cada hora, completando um dia no total
 *
 * id Integer Id do estacionamento
 * timestamp Long Data desejado
 * returns DayResponse
 **/
exports.estacionamentosIdFindByDayGET = function(id,timestamp) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
  "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retorna a quantidade de carros por hora
 * Retorna dois arrays de 12 elementos cada, sendo um de entrada e um de saida, com a quantidade de carros no estacionamento a cada 5 minutos, completando uma hora no total
 *
 * id Integer Id do estacionamento
 * timestamp Long Data desejado
 * returns HourResponse
 **/
exports.estacionamentosIdFindByHourGET = function(id,timestamp) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "entrada" : [ 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21 ],
  "saida" : [ 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retorna a quantidade de carros por mes
 * Retorna 5 objetos, um para cada semana, e cada objeto possui 7 objetos, um para cada dia da semana, e cada objeto possui dois arrays de 24 elementos cada, sendo um de entrada e um de saida, com a quantidade de carros no estacionamento a cada hora, completando um dia no total, para cada dia da semana
 *
 * id Integer Id do estacionamento
 * timestamp Long Data desejado
 * returns MonthResponse
 **/
exports.estacionamentosIdFindByMonthGET = function(id,timestamp) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "1" : {
    "quarta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "segunda" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "quinta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "domingo" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sexta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sabado" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "terca" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    }
  },
  "2" : {
    "quarta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "segunda" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "quinta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "domingo" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sexta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sabado" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "terca" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    }
  },
  "3" : {
    "quarta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "segunda" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "quinta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "domingo" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sexta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sabado" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "terca" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    }
  },
  "4" : {
    "quarta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "segunda" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "quinta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "domingo" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sexta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sabado" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "terca" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    }
  },
  "5" : {
    "quarta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "segunda" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "quinta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "domingo" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sexta" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "sabado" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    },
    "terca" : {
      "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
      "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
    }
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retorna a quantidade de carros dos proximos 7 dias
 * Retorna 7 objetos, um para cada dia da semana, e cada objeto possui dois arrays de 24 elementos cada, sendo um de entrada e um de saida, com a quantidade de carros no estacionamento a cada hora, completando um dia no total, para cada dia da semana
 *
 * id Integer Id do estacionamento
 * timestamp Long Data desejado
 * returns WeekResponse
 **/
exports.estacionamentosIdFindByWeekGET = function(id,timestamp) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "quarta" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "segunda" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "quinta" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "domingo" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "sexta" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "sabado" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  },
  "terca" : {
    "entrada" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ],
    "saida" : [ 1, 0, 0, 0, 0, 0, 10, 13, 17, 15, 8, 8, 9, 14, 16, 18, 20, 21, 17, 15, 12, 7, 3, 2 ]
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

