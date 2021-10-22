"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
/// <reference types="@altv/types-server" />

import * as alt from 'alt';
import * as native from 'natives';
import * as chat from 'chat';

let mario = false;
let mario_interval;
let step = 250;


const keys = {
  't': 0x54,
  'n': 0x4E,
  'm': 0x4D,
  'x': 0x58
};

alt.on("keyup", (key) => {
  if(alt.gameControlsEnabled()){
    switch(key){
      case keys['n']:
        alt.emitServer('vehicleSpawn');
        break;
      case keys['m']:
        alt.emitServer('vehicleMod');
        break;
      case keys['x']:
        marioMode(); //callback function
        break;
    }
  }
});

alt.onServer('warpveh', (veh) => {
  alt.setTimeout(() => {
      native.setPedIntoVehicle(native.playerPedId(), veh.scriptID, -1);
  }, 500);
});

function marioMode(){
  mario = !mario;
  if(mario){
    mario_interval = alt.setInterval(function(){
      alt.emitServer('randomVehicleColor')
    }, step);
    chat.pushLine('Mario Modus aktiviert!');
  } else {
    alt.clearInterval(mario_interval);
    chat.pushLine('Mario Modus deaktiviert!');
  }

}



