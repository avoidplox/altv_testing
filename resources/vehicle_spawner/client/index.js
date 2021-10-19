"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
/// <reference types="@altv/types-server" />

import * as alt from 'alt';
import * as native from 'natives';
import * as chat from 'chat';

const keys = {
  't': 0x54,
  'n': 0x4E
};

alt.on("keyup", (key) => {
  if(key == keys['n'] && alt.gameControlsEnabled()){
    alt.emitServer('vehicleSpawn');
  };
});

alt.onServer('warpveh', (veh) => {
  chat.pushLine('spawned')
  alt.setTimeout(() => {
      native.setPedIntoVehicle(native.playerPedId(), veh.scriptID, -1);
  }, 500);
});



