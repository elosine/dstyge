var notationElementDictByElementByPart = {
  'motives': [
    '/notation/shaker.svg',
    '/notation/bottles.svg',
    '/notation/handclap.svg',
    '/notation/bassdrum.svg',
    '/notation/cowbell.svg',
    '/notation/snare.svg'
  ]
}

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
// singleTempoGenerator_numBeats(tempo, instNum, startTime, numBeats)
//SECTION 1 - 16 BEATS OF 123BPM IN UNISON
var s2st;
for (var i = 0; i < insts.length; i++) {
  s2st = singleTempoGenerator_numBeats(123, i, 0, 32);
}
//SECTION 2 MOVE TO lazyCaterer OVER 19 SEC
var s2Tempi = lazyCatererBPM.clone();
shuffle(s2Tempi);
s2Tempi = s2Tempi.slice(0, 6);
var s2tet = s2st + 19;
var s3st = [];
for (var i = 0; i < insts.length; i++) {
  s3st.push(mkAccel2WholeBeat(123, s2Tempi[i], insts[i], s2st, s2tet));
}
//SECTION 3 MOVE TO UNISON 50BPM IN 23 SEC
//find latest endTime
var s3LastStart = s3st.clone();
s3LastStart = sortNumArr(s3LastStart);
var s3end = s3LastStart[s3LastStart.length - 1] + 23;
for (var i = 0; i < insts.length; i++) {
  var s3t2 = 55;
  var t_ta = accelFindClosestBeat(s2Tempi[i], s3t2, i, s3st[i], s3end);
  var t_net = t_ta[0][1];
  // //[ closestBtNum, closestBtTimeSec, accel, beatVsEndTime: 0-beatBefore; 1-beatAfter, beatBeforeTCsec, beatAfterTCsec]
  var t_newAcc = getAccel(s2Tempi[i], s3t2, s3st[i], t_net);
  accelFixed2(s2Tempi[i], s3t2, i, s3st[i], s3end, t_newAcc);
}
//SECTION 4 - 16 BEATS OF 55BPM IN UNISON
var s5st;
for (var i = 0; i < insts.length; i++) {
  s5st = singleTempoGenerator_numBeats(55, i, s3end, 16);
}
//SECTION 5 -  to fourDLattice over 11 seconds
var s5Tempi = fourDLatticeBPM.clone();
shuffle(s5Tempi);
s5Tempi = s5Tempi.slice(0, 6);
var s5tet = s5st + 11;
var s6st = [];
for (var i = 0; i < insts.length; i++) {
  s6st.push(mkAccel2WholeBeat(55, s5Tempi[i], insts[i], s5st, s5tet));
}
//SECTION 6 - 16 BEATS in fourdlattice
var s7st = [];
for (var i = 0; i < insts.length; i++) {
  s7st.push(singleTempoGenerator_numBeats(s5Tempi[i], i, s6st[i], 16));
}
// //find latest endTime
var s7LastStart = s7st.clone();
s7LastStart = sortNumArr(s7LastStart);
var s7start = s7LastStart[s7LastStart.length - 1];
//SECTION 7 - 8 beats @ 83
var s7t = 42;
var s8st;
for (var i = 0; i < insts.length; i++) {
  s8st = singleTempoGenerator_numBeats(s7t, i, s7start, 8);
}
//SECTION 8 - ACCELS
var s8ratios = xenharmonic.clone();
s8ratios = sortNumArr(s8ratios);
s8ratios = s8ratios.slice(4);
shuffle(s8ratios);
s8ratios = s8ratios.slice(4);
var s8baseT = 180;
var s8Tempi = [];
for (var i = 0; i < insts.length; i++) {
  s8Tempi.push(s8ratios[i] * s8baseT);
}
var s8baseDur = 6.9;
var s8Durs = [];
for (var i = 0; i < insts.length; i++) {
  s8Durs.push(s8ratios[i] * s8baseDur);
}
var s8nextSt = [];
for (var i = 0; i < insts.length; i++) {
  var t_et = s8st + s8Durs[i];
  s8nextSt.push(mkAccel2WholeBeat(s7t, s8Tempi[i], insts[i], s8st, t_et));
}
for (var j = 0; j < 5; j++) {
  var s8nextSt2 = [];
  for (var i = 0; i < insts.length; i++) {
    var t_et = s8nextSt[i] + s8Durs[i];
    s8nextSt2.push(mkAccel2WholeBeat(s7t, s8Tempi[i], insts[i], s8nextSt[i], t_et));
  }
  s8nextSt = s8nextSt2;
}
//SECTION 9 - UNISON DECEL
// //find latest endTime
var s9LastStart = s8nextSt2.clone();
s9LastStart = sortNumArr(s9LastStart);
var s9start = s9LastStart[s9LastStart.length - 1];
var t_et = s9start + 59;
var s10st = [];
for (var i = 0; i < insts.length; i++) {
  s10st.push(mkAccel2WholeBeat(195, 8, insts[i], s9start, t_et));
}
//SECTION 10 - decel to slow tempi
var s10st = t_et;
var s11st = [];
var s10Tempi = [4, 5, 6, 7, 8, 9];
shuffle(s10Tempi);
var s10end = s10st + 25;
for (var i = 0; i < insts.length; i++) {
  s11st.push(mkAccel2WholeBeat(8, s10Tempi[i], insts[i], s10st, s10end));
}
//SECTION 11 - 16 beats
s12st = [];
for (var i = 0; i < insts.length; i++) {
  s12st.push(singleTempoGenerator_numBeats(s10Tempi[i], i, s11st[i], 4));
}

eventSet.sort(sortFunction2DArray);



// FUNCTION: findAccelToMatchBeat ------------------------------------------------------------- //
function findAccelToMatchBeat(itempo, ftempo, a1, a2, instNum, startTime, endTime, maxTime) {
  var t_accel;
  var t_1stBeat_beatsSet = [];
  var t_beatsSet = [];
  var t_iVms = (itempo / 60000.0);
  var t_fVms = (ftempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTmsFloat = (maxTime - startTime) * 1000.0;
  var t_dTms = Math.ceil(t_dTmsFloat);
  var t_btsF = 0;
  var t_num16 = 0;
  var t_lastBtF = 0;
  var t_lastTcSec = 0;
  var t_numBeats = 1;
  for (var j = a1; j < a2; j = j + 1e-12) {
    for (var i = 0; i < t_dTms; i++) {
      var t_tcSec = startTime + (i / 1000.0);
      var t_nV = t_iVms + (j * i);
      t_btsF = t_btsF + t_nV;
      var t_btsFloored = Math.floor(t_btsF) - t_numBeats;
      if ((t_btsFloored % 1) == 0) {
        t_numBeats++;
        var t_beatTcRound = t_tcSec.toFixed(3);
        var t_endTimeRound = endTime.toFixed(3);
        if (t_beatTcRound == t_endTimeRound) {
          t_accel = j;
          break;
        }
      }
    }
  }
  return t_accel;
}
// 1.5162747700962457e-8
// FUNCTION: getAccel ------------------------------------------------------------- //
function getAccel(itempo, ftempo, startTime, endTime) {
  var t_iVms = (itempo / 60000.0);
  var t_fVms = (ftempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTmsFloat = (endTime - startTime) * 1000.0;
  var t_a = t_dV / t_dTmsFloat;
  return t_a;
}
// FUNCTION: accelFixedEndtimeFixed ------------------------------------------------------------- //
function accelFixedEndtimeFixed(itempo, ftempo, instNum, startTime, endTime, accel) {
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
        var t_lastBtNum = t_beatsSet[t_beatsSet.length - 1][0] + 1;
        t_beatsSet.push([t_lastBtNum, t_tcSec]);
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
  }
  return t_beatsSet;
}
// FUNCTION: accelFindClosestBeat ------------------------------------------------------------- //
function mkAccel2WholeBeat(itempo, ftempo, instNum, startTime, endTime) {
  var t_nextBeatTc;
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
  eventSet.push([startTime, instNum, 0, -1]);
  motivePlayer(instNum, t_num16, startTime);
  //Add Event Marker
  eventSet.push([startTime, instNum, 8, -1]);
  for (var i = 0; i < (t_dTms + 100000); i++) {
    var t_tcSec = startTime + (i / 1000.0);
    var t_nV = t_iVms + (t_a * i);
    var t_currTempo = t_nV * 1000 * 60;
    var t_fl16bts = floorByStep(t_btsF, 0.25) - (t_num16 * 0.25);
    if (i < t_dTms) {
      if (t_fl16bts == 0.25) { //Play samples
        t_num16++;
        motivePlayer(instNum, t_num16, t_tcSec);
        // if tempo is < 60 then draw 16ths
        if (t_currTempo < 60) {
          //don't draw on the beat just partials 2-4
          if ((t_num16 % 4) != 0) {
            eventSet.push([t_tcSec, instNum, 6, -1]);
          }
        }
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          t_beatNum++;
          eventSet.push([t_tcSec, instNum, 0, -1]);
          // if tempo is > 130bpm then draw half notes
          if (t_currTempo > 130) {
            if ((t_beatNum % 2) == 0) {
              eventSet.push([t_tcSec, instNum, 7, -1]);
            }
          } ////
          t_lastBtF = t_btsF;
          t_lastTcSec = t_tcSec;
        }
      }
    } else {
      var t_postBeats = t_btsF - t_lastBtF;
      if (t_postBeats >= 1) {
        t_nextBeatTc = t_tcSec;
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
  }
  return t_nextBeatTc;
}
// FUNCTION: accelFixed2 ------------------------------------------------------------- //
function accelFixed2(itempo, ftempo, instNum, startTime, endTime, accel) {
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
  eventSet.push([startTime, instNum, 0, -1]);
  motivePlayer(instNum, t_num16, startTime);
  //Add Event Marker
  eventSet.push([startTime, instNum, 8, -1]);
  for (var i = 0; i < t_dTms; i++) {
    var t_tcSec = startTime + (i / 1000.0);
    var t_nV = t_iVms + (t_a * i);
    var t_currTempo = t_nV * 1000 * 60;
    var t_fl16bts = floorByStep(t_btsF, 0.25) - (t_num16 * 0.25);
    if (t_fl16bts == 0.25) {
      t_num16++;
      motivePlayer(instNum, t_num16, t_tcSec);
      // if tempo is < 60 then draw 16ths
      if (t_currTempo < 60) {
        //don't draw on the beat just partials 2-4
        if ((t_num16 % 4) != 0) {
          eventSet.push([t_tcSec, instNum, 6, -1]);
        }
      }
      //whole beats
      if ((t_num16 % 4) == 0 && t_num16 > 0) {
        t_beatNum++;
        // if tempo is > 130bpm then draw half notes
        if (t_currTempo > 130) {
          if ((t_beatNum % 2) == 0) {
            eventSet.push([t_tcSec, instNum, 7, -1]);
          }
        } ////
        eventSet.push([t_tcSec, instNum, 0, -1]);
        t_lastBtF = t_btsF;
        t_lastTcSec = t_tcSec;
      }
    }
    t_btsF = t_btsF + t_nV;
  }
}
// FUNCTION: accelFixed ------------------------------------------------------------- //
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
        var t_lastBtNum = t_beatsSet[t_beatsSet.length - 1][0] + 1;
        t_1stBeat_beatsSet.push([t_lastBtNum, t_tcSec]);
        t_beatsSet.push([t_lastBtNum, t_tcSec]);
        t_1stBeat_beatsSet.push(t_beatsSet);
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
  }
  return t_1stBeat_beatsSet;
}

// FUNCTION: accelFindClosestBeat ------------------------------------------------------------- //
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
        //find whether the beat after endtime is closer or the beat before endtime
        var t_postBeatDif = t_tcSec - endTime;
        var t_preBeatDif = endTime - t_lastTcSec;
        var t_closest = Math.min(t_postBeatDif, t_preBeatDif);
        if (t_closest == t_postBeatDif) {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length - 1][0] + 1;
          t_beatsSet.push([t_lastBtNum, t_tcSec]);
          // [btNum, timecode, acceleration, whether it is beat before or after endtime]
          t_1stBeat_beatsSet.push([t_lastBtNum, t_tcSec, t_a, 1, t_lastTcSec, t_tcSec]);
        } else {
          var t_lastBtNum = t_beatsSet[t_beatsSet.length - 1][0];
          t_1stBeat_beatsSet.push([t_lastBtNum, t_lastTcSec, t_a, 0, t_lastTcSec, t_tcSec]);
        }
        t_1stBeat_beatsSet.push(t_beatsSet);
        break;
      }
    }
    t_btsF = t_btsF + t_nV;
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


*/
