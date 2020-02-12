// INSTRUMENTS: 0-shaker 1-bottles 2-handclap 3-bassdrum 4-cowbells 5-snare
var lazyCaterer = [7, 11, 16, 22, 29, 37, 46, 56, 67]; //base 21/7
var lazyCatererBase = 21.0 / 7.0;
var lazyCatererBPM = [];
for (var i = 0; i < lazyCaterer.length; i++) {
  lazyCatererBPM.push(lazyCaterer[i] * lazyCatererBase);
}
var fourDLattice = [5, 9, 11, 16, 19, 20, 25, 29, 31, 36];
var fourDLatticeBase = 21.0 / 5.0;
var fourDLatticeBPM = [];
for (var i = 0; i < fourDLattice.length; i++) {
  fourDLatticeBPM.push(fourDLattice[i] * fourDLatticeBase);
}
var leroyQuet = [7, 13, 17, 19, 23, 41, 31];
var leroyQuetBase = 21.0 / 7.0;
var leroyQuetBPM = [];
for (var i = 0; i < leroyQuet.length; i++) {
  leroyQuetBPM.push(leroyQuet[i] * leroyQuetBase);
}
var xenharmonic = [(14 / 13), (13 / 12), (15 / 13), (13 / 11), (16 / 13),
  (13 / 10), (18 / 13), (13 / 9), (20 / 13), (13 / 8), (22 / 13), (26 / 15),
  (24 / 13), (13 / 7)
];
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
var eventSet = [];
var insts = [0, 1, 2, 3, 4, 5];
// var t_et01 = singleTempoGenerator_numBeats(43.5, 1, 2.45, 8);
// var t_et02 = singleTempoGenerator_numBeats(110.672, 1, t_et01, 8);
// var t_et03 = singleTempoGenerator_numBeats(22.81, 1, t_et02, 8);
// var t_et04 = singleTempoGenerator_numBeats(187.341, 1, t_et03, 16);


var ta = accelFindClosestBeat(40, 101, 1, 2.78, 15.558);
console.log(ta);
console.log(accelFixed(40, 101, 1, 2.78, ta[0][1], ta[0][2]));


// FUNCTION: singleTempoGenerator_numBeats ------------------------------------------------------------- //
function accelFixed(itempo, ftempo, instNum, startTime, endTime, accel) {
  var t_1stBeat_beatsSet = [];
  var t_beatsSet = [];
  var t_iVms = (itempo / 60000.0);
  var t_fVms = (ftempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTmsFloat = (endTime - startTime) * 1000.0;
  var t_a = accel;
  var t_dTms = Math.ceil(t_dTmsFloat);
  var t_btsF = 0;
  var t_num16 = 0;
  var t_lastBtF = 0;
  var t_lastTcSec = 0;
  var t_beatNum = 0;
  //First Beat
  t_beatsSet.push([t_beatNum, startTime]);
  for (var i = 0; i < (t_dTms + 100000); i++) {
    var t_tcSec = startTime + (i / 1000.0);
    var t_nV = t_iVms + (t_a * i);
    var t_fl16bts = floorByStep(t_btsF, 0.25) - (t_num16 * 0.25);
    if (i < t_dTms) {
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          t_beatNum++;
          t_beatsSet.push([t_beatNum, t_tcSec]);
          t_lastBtF = t_btsF;
          t_lastTcSec = t_tcSec;
        }
      }
    } else {
      var t_postBeats = t_btsF - t_lastBtF;
      if (t_postBeats >= 1) {
        var t_postBeatDif = t_tcSec - endTime;
        var t_preBeatDif = endTime - t_lastTcSec;
        var t_closest = Math.min(t_postBeatDif, t_preBeatDif);
        if (t_closest == t_postBeatDif) {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length-1][0] + 1;
          t_1stBeat_beatsSet.push([t_lastBtNum, t_tcSec]);
        } else {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length-1][0];
          t_1stBeat_beatsSet.push([t_lastBtNum, t_lastTcSec, t_a]);
        }
        t_1stBeat_beatsSet.push(t_beatsSet);
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
    // console.log(t_btsF);
  }
  return t_1stBeat_beatsSet;
}

// FUNCTION: singleTempoGenerator_numBeats ------------------------------------------------------------- //
function accelFindClosestBeat(itempo, ftempo, instNum, startTime, endTime) {
  var t_1stBeat_beatsSet = [];
  var t_beatsSet = [];
  var t_iVms = (itempo / 60000.0);
  var t_fVms = (ftempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTmsFloat = (endTime - startTime) * 1000.0;
  var t_a = t_dV / t_dTmsFloat;
  var t_dTms = Math.ceil(t_dTmsFloat);
  var t_btsF = 0;
  var t_num16 = 0;
  var t_lastBtF = 0;
  var t_lastTcSec = 0;
  var t_beatNum = 0;
  //First Beat
  t_beatsSet.push([t_beatNum, startTime]);
  for (var i = 0; i < (t_dTms + 100000); i++) {
    var t_tcSec = startTime + (i / 1000.0);
    var t_nV = t_iVms + (t_a * i);
    var t_fl16bts = floorByStep(t_btsF, 0.25) - (t_num16 * 0.25);
    if (i < t_dTms) {
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          t_beatNum++;
          t_beatsSet.push([t_beatNum, t_tcSec]);
          t_lastBtF = t_btsF;
          t_lastTcSec = t_tcSec;
        }
      }
    } else {
      var t_postBeats = t_btsF - t_lastBtF;
      if (t_postBeats >= 1) {
        var t_postBeatDif = t_tcSec - endTime;
        var t_preBeatDif = endTime - t_lastTcSec;
        var t_closest = Math.min(t_postBeatDif, t_preBeatDif);
        if (t_closest == t_postBeatDif) {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length-1][0] + 1;
          t_1stBeat_beatsSet.push([t_lastBtNum, t_tcSec]);
        } else {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length-1][0];
          t_1stBeat_beatsSet.push([t_lastBtNum, t_lastTcSec, t_a]);
        }
        t_1stBeat_beatsSet.push(t_beatsSet);
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
    // console.log(t_btsF);
  }
  return t_1stBeat_beatsSet;
}




// FUNCTION: singleTempoGenerator_numBeats ------------------------------------------------------------- //
function singleTempoGenerator_numBeats(tempo, instNum, startTime, numBeats) {
  var t_dur = beats2seconds(tempo, numBeats);
  var t_endtime = startTime + t_dur;
  singleTempo(tempo, instNum, startTime, t_endtime);
  return t_endtime;
}
// FUNCTION: singleTempo ------------------------------------------------------------- //
function singleTempo(tempo, instNum, startTime, endTime) {
  var t_durSec = endTime - startTime;
  var t_durMS = Math.ceil(t_durSec * 1000.0);
  var t_msPer16th = Math.ceil((60000.0 / tempo) / 4.0);
  var t_beatNum = 0;
  var t_lastBeatTcSec = 0;
  var t_16ct = 0;
  //Add Event Marker
  eventSet.push([startTime, instNum, 8, -1]);
  for (var i = 0; i < t_durMS; i++) {
    var t_tcSec = (i / 1000.0) + startTime; //timecode in seconds
    if ((i % t_msPer16th) == 0) { //every 16th
      //Beat
      if ((t_16ct % 4) == 0) {
        eventSet.push([t_tcSec, instNum, 0, -1]); // make beat marker
        // if tempo is > 130bpm then draw half notes
        if (tempo > 130) {
          if ((t_beatNum % 2) == 0) {
            eventSet.push([t_tcSec, instNum, 7, -1]);
          }
        }
        t_lastBeatTcSec = t_tcSec;
        t_beatNum++;
      }
      // if tempo is < 60 then draw 16ths
      if (tempo < 60) {
        //don't draw on the beat just partials 2-4
        if ((t_16ct % 4) != 0) {
          eventSet.push([t_tcSec, instNum, 6, -1]);
        }
      }
      //Play samples
      motivePlayer(instNum, t_16ct, t_tcSec);
      t_16ct++;
    }
  }
}




/*
  var t_16ct = 0;



    } else {
      var t_postBeats = i - t_lastB;
      if (t_postBeats < 1) {
        // if tempo is < 45 then draw 16ths
        if (tempo < 60) {
          //don't draw on the beat just partials 2-4
          if ((i % t_msPer16th) == 0 && (i % t_msPerBeat) != 0) {
            eventSet.push([t_tc, instNum, 6, -1]);
          }
        }
        //Play samples
        if ((i % t_msPer16th) == 0) {
          motivePlayer(instNum, t_16ct, t_tc);
          t_16ct++;
        }
      } else {
        t_nextBeat = t_tc;
        break;
      }
    }
  }
  return t_nextBeat;
*/



//

// FUNCTION: beats2seconds -------------------------------------------------------- //
function beats2seconds(bpm, numbts) {
  var t_secPerBeat = 1.0 / (bpm / 60.0);
  var t_sec = t_secPerBeat * numbts;
  return t_sec;
}
// FUNCTION: motivePlayer ---------------------------------------------------------------- //
function motivePlayer(instNum, ct16, tc) {
  switch (instNum) {
    case 0: //Shaker
      var t_snum = (ct16 % 2) + 1;
      eventSet.push([tc, instNum, 5, "/samples/shaker_p" + t_snum + ".wav"]);
      break;
    case 1: //bottles
      if ((ct16 % 32) == 0) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 3) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 6) eventSet.push([tc, instNum, 5, "/samples/bottle_p02.wav"]);
      if ((ct16 % 32) == 8) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 11) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 14) eventSet.push([tc, instNum, 5, "/samples/bottle_p02.wav"]);
      if ((ct16 % 32) == 16) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 19) eventSet.push([tc, instNum, 5, "/samples/bottle_p02.wav"]);
      if ((ct16 % 32) == 22) eventSet.push([tc, instNum, 5, "/samples/bottle_p02.wav"]);
      if ((ct16 % 32) == 25) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 27) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 28) eventSet.push([tc, instNum, 5, "/samples/bottle_p01.wav"]);
      if ((ct16 % 32) == 30) eventSet.push([tc, instNum, 5, "/samples/bottle_p02.wav"]);
      break;
    case 2: //HandClap
      if ((ct16 % 8) == 4) {
        eventSet.push([tc, instNum, 5, "/samples/handClap.wav"]);
      }
      break;
    case 3: //bass drum
      if ((ct16 % 16) == 0) eventSet.push([tc, instNum, 5, "/samples/bd.wav"]);
      if ((ct16 % 16) == 3) eventSet.push([tc, instNum, 5, "/samples/bd.wav"]);
      if ((ct16 % 16) == 7) eventSet.push([tc, instNum, 5, "/samples/bd.wav"]);
      if ((ct16 % 16) == 8) eventSet.push([tc, instNum, 5, "/samples/bd.wav"]);
      break;
    case 4: //cowbell
      if ((ct16 % 32) == 6) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 8) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 11) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 18) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 20) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 22) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      if ((ct16 % 32) == 23) eventSet.push([tc, instNum, 5, "/samples/cowBell_s1.wav"]);
      break;
    case 5:
      // sn
      if ((ct16 % 8) == 4) eventSet.push([tc, instNum, 5, "/samples/sn.wav"]);
      break;
  }
}

/*
NOTES:
Build in Metric modulation
Make single tempo, accel/decel, accel/decel to Unison
Check out decels

*/
