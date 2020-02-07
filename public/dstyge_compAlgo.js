// INSTRUMENTS: 0-shaker 1-bottles 2-handclap 3-bassdrum 4-cowbells 5-snare
var eventSet = [];
// for (var i = 0; i < 6; i++) {
//   generateOneTempo(123, i, 1, 15);
// }
for (var i = 0; i < 6; i++) {
  generateAccel(30, 200, i, 0, 90);
}



// FUNCTION: findBeatAfterLast ------------------------------------------------------------- //
function findBeatAfterLast(iTempo, fTempo, pNum, stTi, dur) {
  var t_nextBeat;
  var t_iVms = (iTempo / 60000.0);
  var t_fVms = (fTempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTfloat = dur * 1000.0;
  var t_a = t_dV / t_dTfloat;
  var t_dT = Math.round(t_dTfloat);
  var t_bts = 0;
  var t_num16 = 0;
  for (var j = t_dT; j < (t_dT + 100000); j++) {
    var t_currT = stTi + (j / 1000.0);
    var t_nV = t_iVms + (t_a * j);
    var t_currbpm = t_nV * 60000;
    t_bts = t_bts + t_nV;
    if (t_bts >= 1) {
      t_nextBeat = t_currT;
      break;
    }
  }
  return t_nextBeat;
}
// FUNCTION: generateAccel ------------------------------------------------------------- //
function generateAccel(iTempo, fTempo, pNum, stTi, dur) {
  var t_nextBeat;
  var t_iVms = (iTempo / 60000.0);
  var t_fVms = (fTempo / 60000.0);
  var t_dV = t_fVms - t_iVms;
  var t_dTfloat = dur * 1000.0;
  var t_a = t_dV / t_dTfloat;
  var t_dT = Math.round(t_dTfloat);
  var t_bts = 0;
  var t_num16 = 0;
  //Add first beats
  eventSet.push([stTi, pNum, 0, -1]);
  motivePlayer(pNum, t_num16, stTi);
  //make array of 16th notes
  for (var j = 0; j < (t_dT + 100000); j++) {
    var t_currT = stTi + (j / 1000.0);
    var t_nV = t_iVms + (t_a * j);
    var t_currbpm = t_nV * 60000;
    t_bts = t_bts + t_nV;
    var t_fl16bts = floorByStep(t_bts, 0.25) - (t_num16 * 0.25);
    var t_lastB;
    //To calc beat after last at accel
    //stop adding beats etc after t_dTfloat
    if (j < t_dT) {
      t_lastB = t_bts;
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if ((t_num16 % 4) == 0 && t_num16 > 0) {
          eventSet.push([t_currT, pNum, 0, -1]);
          t_lastB = t_currT;
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
      var t_db = t_bts - t_lastB;
      if (t_db >= 1) {
        t_nextBeat = t_currT;
        break;
      }
    }
  }
  return t_nextBeat;
}
// FUNCTION: generateOneTempo ------------------------------------------------------------- //
function generateOneTempo(tempo, instNum, startTime, dur) {
  var t_nextBeat;
  var t_durMS = Math.round(dur * 1000.0);
  // var msPer16th = Math.round( ((60.0 / tempo) / 1000.0) / 4.0 );
  var t_tcSecPerBeat = 60.0 / tempo;
  var t_msPer16th = Math.round((t_tcSecPerBeat * 1000.0) / 4.0);
  var t_msPerBeat = t_msPer16th * 4;
  var t_lastB;
  var t_16ct = 0;
  // Generate Beat Markers and report beat after last
  //examine each millisecond
  for (var i = 0; i < t_durMS; i++) {
    //on the beat
    if ((i % t_msPerBeat) == 0) {
      var t_tcSec = (i / 1000.0) + startTime;
      eventSet.push([t_tcSec, instNum, 0, -1]);
      t_lastB = t_tcSec;
    }
    // if tempo is > 130bpm then draw half notes
    if (tempo > 130) {
      if ((i % (t_msPerBeat * 2)) == 0) {
        var t_tcSec = (i / 1000.0) + startTime;
        eventSet.push([t_tcSec, instNum, 7, -1]);
      }
    }
    // if tempo is < 45 then draw 16ths
    if (tempo < 60) {
      //don't draw on the beat just partials 2-4
      if ((i % t_msPer16th) == 0 && (i % t_msPerBeat) != 0) {
        var t_tcSec = (i / 1000.0) + startTime;
        eventSet.push([t_tcSec, instNum, 6, -1]);
      }
    }
    //Report next beat after last
    if (i == (t_durMS - 1)) {
      t_nextBeat = t_lastB + t_tcSecPerBeat;
    }
    //Play samples
    if ((i % t_msPer16th) == 0) {
      var t_tcSec = (i / 1000.0) + startTime;
      motivePlayer(instNum, t_16ct, t_tcSec);
      t_16ct++;
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
