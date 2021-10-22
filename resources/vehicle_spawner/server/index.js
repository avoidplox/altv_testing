import * as alt from "alt-server";

const vehicles = ['issi3', 'felon', 'elegy'];
const vehicle_mods = { //some mod examples
    'felon': [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 4, 0, 0, 1, 0, 1, 0, 1],
    'elegy': [10, 2, 3, 1, 3, 1, 0, 0, 0, 0, 2, 4, 3, 1, 15, 4, 5, 0, 1, 0, 1, 0, 1, 0],
    'issi' : [0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 4, 3]
};

let spawnedVehicles = [];

alt.onClient('vehicleSpawn', player => {
    let randomVeh = vehicles[Math.floor(Math.random() * vehicles.length)];
    let vehicle = spawnVehicle(player, randomVeh); // spawn random vehicle from array
    vehicle.primaryColor = Math.floor(Math.random() * 255);
    vehicle.secondaryColor = Math.floor(Math.random() * 255);
    alt.emitClient(player, 'warpveh', vehicle);
});

alt.onClient('vehicleMod', player => {
    if (player.vehicle){
        player.vehicle.modKit = 1;
        for(let vehicle_model in vehicle_mods){ //Iterates through vehicles to check if current model matches object
            if(player.vehicle.model == alt.hash(vehicle_model)){
                for (let i = 0; i < vehicle_mods[vehicle_model].length; i++) {
                    player.vehicle.setMod(i, vehicle_mods[vehicle_model][i]); //Sets the mod kit
                    player.vehicle.repair(); // repair vehicle
                }
            }
        }
    }
});

alt.onClient('randomVehicleColor', player => {
    if(player.vehicle){
        player.vehicle.primaryColor = Math.floor(Math.random() * 255);
        player.vehicle.secondaryColor = Math.floor(Math.random() * 255);
    }
});

function spawnVehicle(player, vehicleModel){
    let veh;
    veh = new alt.Vehicle(vehicleModel, player.pos.x, player.pos.y + 8, player.pos.z, 0, 0, 0);
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


