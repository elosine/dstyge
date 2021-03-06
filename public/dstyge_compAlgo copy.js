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
var eventSet = [];
var insts = [0, 1, 2, 3, 4, 5];
var bts8 = beats2seconds(60, 8);
var bpm110_8b = beats2seconds(110, 7);
console.log(bpm110_8b);
var e1 = generateOneTempo(60, 1, 0, bts8);
var e2end = bpm110_8b + e1;
var e2 = generateOneTempo(110, 1, e1, e2end);
console.log(e2);
console.log(eventSet);
console.log(e2end);
/*
// SEC1 - UNISON AT 123 FOR 8 BARS OR 3.902 SECONDS
var t_32bts = beats2seconds(123, 32);
var sec1end = [];
for (var i = 0; i < insts.length; i++) {
  sec1end.push(generateOneTempo(123, insts[i], 0, t_32bts));
}
// SEC2 - accel/decel to lazycaterer
var sec2end = [];
var s2tempiA = lazyCatererBPM.clone();
shuffle(s2tempiA);
var s2tempi = s2tempiA.slice(0, 6);
for (var i = 0; i < insts.length; i++) {
  sec2end.push(generateAccel(123, s2tempi[i], insts[i], sec1end[0], 18));
}
// SEC3 - lazycaterer  for 5 sec
var sec3end = [];
for (var i = 0; i < insts.length; i++) {
  sec3end.push(generateOneTempo(s2tempi[i], insts[i], sec2end[i], 5));
}
// SEC 4 - TO UNISON 42BPM IN 13SEC
//find latest endTime
var lastSec3end = sec3end.clone();
lastSec3end.sort();
var sec4dur = 23;
var sec4end = lastSec3end[lastSec3end.length - 1] + sec4dur;
generateAccel2Unison(s2tempi, 42, insts, sec3end, sec4end);

*/

/*
MAKE BEATS AT END UP TO BEAT AFTER LAST
FIND WAY TO CALCULATE PRECISE NUMBER OF BEATS AROUND A DURATION
FIGURE OUT WAY TO DO ACCEL2UNISON WITH VARIABLE STARTING TIME
  DO STARTTIME AND ENDTIME AND CALCULATE DUR
*/
// FUNCTION: generateAccel2Unison -------------------------------------------------------- //
function beats2seconds(bpm, numbts) {
  var t_secPerBeat = 1.0 / (bpm / 60.0);
  return t_secPerBeat * numbts;
}
// FUNCTION: generateAccel2Unison -------------------------------------------------------- //
function generateAccel2Unison(iTempoSet, fTempo, playerSet, startTimeSet, endTime) {
  var t_btsAfterLast = [];
  var t_fud = [];
  for (var i = 0; i < playerSet.length; i++) {
    t_fud.push(accel2UnisonFudge(iTempoSet[i], fTempo, playerSet[i], startTimeSet[i], endTime));
  }
  for (var i = 0; i < playerSet.length; i++) {
    t_btsAfterLast.push(generateAccel2UnisonA(iTempoSet[i], fTempo, playerSet[i], startTimeSet[i], endTime, t_fud[i]));
  }
  return t_btsAfterLast;
}
// FUNCTION: generateAccel ------------------------------------------------------------- //
function generateAccel2UnisonA(iTempo, fTempo, pNum, stTi, endTime, addPerMS) {
  var t_wholeBeats = [];
  var t_btsAfterLast = [];
  var dur = endTime - stTi;
  var t_iVms = (iTempo / 60000.0);
  var t_fVms = (fTempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTfloat = dur * 1000.0;
  var t_a = t_dV / t_dTfloat;
  var t_dT = Math.round(t_dTfloat);
  var t_bts = 0;
  var t_num16 = 0;
  var t_lastBts;
  //Add first beats
  eventSet.push([stTi, pNum, 8, -1]);
  eventSet.push([stTi, pNum, 0, -1]);
  motivePlayer(pNum, t_num16, stTi);
  //make array of 16th notes
  for (var j = 0; j < (t_dT + 100000); j++) {
    var t_currT = stTi + (j / 1000.0) - (j * addPerMS);
    var t_nV = t_iVms + (t_a * j);
    var t_currbpm = t_nV * 60000;
    t_bts = t_bts + t_nV;
    var t_fl16bts = floorByStep(t_bts, 0.25) - (t_num16 * 0.25);
    //To calc beat after last at accel
    //stop adding beats etc after t_dTfloat
    if (j < t_dT) {
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          eventSet.push([t_currT, pNum, 0, -1]);
          t_wholeBeats.push(t_currT);
          t_lastBt = t_bts;
        }
        // if tempo is > 130bpm then draw half notes
        if (t_currbpm > 130) {
          if ((t_num16 % 8) == 0 && t_num16 > 0) {
            eventSet.push([t_currT, pNum, 7, -1]);
          }
        }
        // if tempo is < 45 then draw 16ths
        if (t_currbpm < 60) {
          //don't draw on the beat just partials 2-4
          if ((t_num16 % 4) != 0) {
            eventSet.push([t_currT, pNum, 6, -1]);
          }
        }
        //Play samples
        motivePlayer(pNum, t_num16, t_currT);
      }
    } else {
      var t_postBeats = t_bts - t_lastBt;
      if (t_postBeats >= 1) {
        t_wholeBeats.push(t_currT);
        t_btsAfterLast.push(t_currT);
        break;
      }
    }
  }
  return t_btsAfterLast;
}
// FUNCTION: generateAccel ------------------------------------------------------------- //
function accel2UnisonFudge(iTempo, fTempo, pNum, stTi, endTime) {
  var dur = endTime - stTi;
  var t_wholeBeats = [];
  var t_btAfterLast;
  var t_iVms = (iTempo / 60000.0);
  var t_fVms = (fTempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTfloat = dur * 1000.0;
  var t_a = t_dV / t_dTfloat;
  var t_dT = Math.round(t_dTfloat);
  var t_bts = 0;
  var t_num16 = 0;
  var t_lastBts;
  //make array of 16th notes
  for (var j = 0; j < (t_dT + 100000); j++) {
    var t_currT = stTi + (j / 1000.0);
    var t_nV = t_iVms + (t_a * j);
    var t_currbpm = t_nV * 60000;
    t_bts = t_bts + t_nV;
    var t_fl16bts = floorByStep(t_bts, 0.25) - (t_num16 * 0.25);
    //To calc beat after last at accel
    //stop adding beats etc after t_dTfloat
    if (j < t_dT) {
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          t_wholeBeats.push(t_currT);
          t_lastBt = t_bts;
        }
      }
    } else {
      var t_postBeats = t_bts - t_lastBt;
      if (t_postBeats >= 1) {
        t_btAfterLast = t_currT;
        t_wholeBeats.push(t_currT);
        break;
      }
    }
  }
  var fudgePerMs = (t_btAfterLast - (dur + stTi)) / (dur * 1000);
  return fudgePerMs;
}
// FUNCTION: generateAccel ------------------------------------------------------------- //
function generateAccel(iTempo, fTempo, pNum, stTi, endTime) {
  var dur = endTime - stTi;
  var t_btAfterLast;
  var t_iVms = (iTempo / 60000.0);
  var t_fVms = (fTempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTfloat = dur * 1000.0;
  var t_a = t_dV / t_dTfloat;
  var t_dT = Math.round(t_dTfloat);
  var t_bts = 0;
  var t_num16 = 0;
  var t_lastBts;
  //Add first beats
  eventSet.push([stTi, pNum, 8, -1]); //new event marker
  eventSet.push([stTi, pNum, 0, -1]);
  motivePlayer(pNum, t_num16, stTi);
  //make array of 16th notes
  for (var j = 0; j < (t_dT + 100000); j++) {
    var t_currT = stTi + (j / 1000.0);
    var t_nV = t_iVms + (t_a * j);
    var t_currbpm = t_nV * 60000;
    t_bts = t_bts + t_nV;
    var t_fl16bts = floorByStep(t_bts, 0.25) - (t_num16 * 0.25);
    if (j < t_dT) {
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          eventSet.push([t_currT, pNum, 0, -1]);
          t_lastBt = t_bts;
        }
        // if tempo is > 130bpm then draw half notes
        if (t_currbpm > 130) {
          if ((t_num16 % 8) == 0 && t_num16 > 0) {
            eventSet.push([t_currT, pNum, 7, -1]);
          }
        }
        // if tempo is < 45 then draw 16ths
        if (t_currbpm < 60) {
          //don't draw on the beat just partials 2-4
          if ((t_num16 % 4) != 0) {
            eventSet.push([t_currT, pNum, 6, -1]);
          }
        }
        //Play samples
        motivePlayer(pNum, t_num16, t_currT);
      }
    } else {
      var t_postBeats = t_bts - t_lastBt;
      if (t_postBeats < 1) {
        if (t_fl16bts == 0.25) {
          t_num16++;
          //whole beats
          if ((t_num16 % 4) == 0 && t_num16 > 0) {
            eventSet.push([t_currT, pNum, 0, -1]);
            t_lastBt = t_bts;
          }
          // if tempo is > 130bpm then draw half notes
          if (t_currbpm > 130) {
            if ((t_num16 % 8) == 0 && t_num16 > 0) {
              eventSet.push([t_currT, pNum, 7, -1]);
            }
          }
          // if tempo is < 45 then draw 16ths
          if (t_currbpm < 60) {
            //don't draw on the beat just partials 2-4
            if ((t_num16 % 4) != 0) {
              eventSet.push([t_currT, pNum, 6, -1]);
            }
          }
          //Play samples
          motivePlayer(pNum, t_num16, t_currT);
        }
      } else {
        t_btAfterLast = t_currT;
        break;

      }
    }
  }
  return t_btAfterLast;
}
// FUNCTION: generateOneTempo ------------------------------------------------------------- //
function generateOneTempo(tempo, instNum, startTime, endTime) {
  var t_nextBeat;
  var t_durSec = endTime - startTime;
  var t_durMS = Math.round(t_durSec * 1000.0);
  var t_secPerBeat = 60.0 / tempo;
  var t_msPer16th = Math.round((t_secPerBeat * 1000.0) / 4.0);
  var t_msPerBeat = t_msPer16th * 4;
  var t_lastB;
  var t_16ct = 0;
  //add eventMarker
  eventSet.push([startTime, instNum, 8, -1]);
  //examine each millisecond
  for (var i = 0; i < (t_durMS + 10000); i++) {
    var t_tc = (i / 1000.0) + startTime;
    if (i < t_durMS) {
      //add beat markers on the beat
      if ((i % t_msPerBeat) == 0) {
        eventSet.push([t_tc, instNum, 0, -1]);
        t_lastB = t_tc; //to calculate beat after last
      }
      // if tempo is > 130bpm then draw half notes
      if (tempo > 130) {
        if ((i % (t_msPerBeat * 2)) == 0) {
          eventSet.push([t_tc, instNum, 7, -1]);
        }
      }
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
