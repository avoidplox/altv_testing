"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from 'alt';
import * as native from 'natives';
import * as chat from 'chat';

alt.on("keyup", (key) => {
  chat.pushLine("Test");
});
//key === 0x54 && alt.gameControlsEnabled()
