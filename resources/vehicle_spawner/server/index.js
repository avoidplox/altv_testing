import * as alt from "alt-server";

const vehicles = ['issi3', 'felon', 'oracle2', 'fbi'];
let spawnedVehicles = [];

alt.onClient('vehicleSpawn', player => {
    let randomVeh = vehicles[Math.floor(Math.random() * vehicles.length)];
    let vehicle = spawnVehicle(player, randomVeh); // spawn random vehicle from array
    vehicle.primaryColor = 50;
    alt.emitClient(player, 'warpveh', vehicle);
});

function spawnVehicle(player, vehicleModel){
    let veh;
    veh = new alt.Vehicle(vehicleModel, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
    console.log(`${player.name} spawned a ${vehicleModel}.`);
    spawnedVehicles.unshift(veh); // put vehicle into array at index 0
    if (spawnedVehicles.length >= 4){ // only 3 vehicles per player
        let vehicle;
        vehicle = spawnedVehicles[spawnedVehicles.length - 1];
        spawnedVehicles.pop(spawnedVehicles);
        vehicle.destroy();
    }
    return veh;
}


