"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
/// <reference types="@altv/types-server" />

import * as alt from 'alt';
import * as native from 'natives';
import * as chat from 'chat';

const keys = {
  't': 0x54,
  'n': 0x4E,
  'm': 0x4D,
  'x': 0x58
};

alt.on("keyup", (key) => {
  if(alt.gameControlsEnabled()){
    if(key == keys['n']){
      alt.emitServer('vehicleSpawn');
    }
    if(key == keys['m']){
      alt.emitServer('vehicleMod');
    }
  }
});

alt.onServer('warpveh', (veh) => {
  alt.setTimeout(() => {
      native.setPedIntoVehicle(native.playerPedId(), veh.scriptID, -1);
  }, 500);
});



