var parkings = [];

function getParkingId(parkingName) {
    let parking = parkings.find(p => p.name == parkingName);

    if (parking === undefined)
        return -1;
    
    return parking.id;
}

function updateFiltroEstacionamentos() {
    let parkingNames = parkings.map(({name}) => name);
    let select = document.querySelector("#form-estacionamento");
    parkingNames.forEach(name => {
        let option = document.createElement('option');
        option.text = name;
        select.add(option);
    });
}

function updateEstacionamentosByHour(data) {
    console.log("Update Estacionamentos By Hour");
    console.log(data);
}

function updateEstacionamentosByDay(data) {
    console.log("Update Estacionamentos By Day");
    console.log(data);
}

function updateEstacionamentosByWeek(data) {
    console.log("Update Estacionamentos By Week");
    console.log(data);
}

function updateEstacionamentosByMonth(data) {
    console.log("Update Estacionamentos By Month");
    console.log(data);
}

function updateEstacionamentosByYear(data) {
    console.log("Update Estacionamentos By Year");
    console.log(data);
}