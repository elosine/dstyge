function generateOneTempo(tempo, instNum, startTime, dur) {
  var durMS = Math.round(dur/1000.0);
  var msPer16th = Math.round( ((60.0 / tempo) / 1000.0) / 4.0 );
  var msPer8th = msPer16th * 2;
  var msPerBeat = msPer16th * 4;
  // Generate Beat Markers and report beat after last

}
/*
  case 2: //HandClap
    if (((j - 1) % 2) == 0) {
      t_evtSet.push([t_tc, instset[i], 5, "/samples/handClap.wav"]);
    }



  // [ goTime, playerNum, eventType,  eventTypeSpecifics]
  // EVENT TYPES: 0-beat; 1-notation; 2-pitch; 3-stop; 4-cres, 5-playSamp;
  var eventSet = [];
  // GENERATE SOME TEST POLY RHYTHMS TO SEE WHAT RATIOS WORK
  // FIGURE OUT SAMPLE PLAYBACK WITH EACH PARTIAL A SE];
  var tempoSet_001 = [123, 123, 123, 123, 123, 123];
  var tempos = [71.325, 71.75, 76.42, 78.272, 81.514, 86.1, 91.704, 95.667, 101.893, 107.625, 112.081, 114.8, 122.272, 123];
  var tb6 = [71.325, 71.75, 76.42, 78.272, 81.514, 86.1];
  var tsp = [71.325, 123, 112.081, 78.272, 86.1, 101.893];
  var tt6 = [101.893, 107.625, 112.081, 114.8, 122.272, 123];
  var t17 = 123 / 7;
  var t1_7 = [t17, (t17 * 4), (t17 * 2), (t17 * 6), (t17 * 3), (t17 * 5)];
  var t1u = [];
  for (var i = 0; i < 6; i++) {
    t1u.push(tempos[0]);
  }

  // [shaker, bottles, handclaps, cowbells, kit]
  var ogInstSet = [0, 1, 2, 3, 4, 5];

  function generatePolyrhythm(temposet, instset, startTime, dur) {
    var t_evtSet = [];
    for (var i = 0; i < temposet.length; i++) {
      //convert to seconds per beat
      var t_secPerBeat = 60 / temposet[i];
      var t_8thDur = t_secPerBeat / 2;
      var t_16thDur = t_8thDur / 2;
      var t_dot8thDur = t_8thDur + t_16thDur;
      for (var j = 0; j < 999; j++) {
        var t_time = t_secPerBeat * j;
        var t_tc = t_time + startTime;
        t_evtSet.push([t_tc, instset[i], 0, -1]);
        // Generate Sample Play Events based on Motives
        switch (i) {
          case 0: //Shaker
            for (var k = 0; k < 4; k++) {
              var t_partialTime = t_time + (t_16thDur * k) + startTime;
              var t_snum = k + 1;
              t_evtSet.push([t_partialTime, instset[i], 5, "/samples/shaker_p" + t_snum + ".wav"]);
            }
            break;
          case 1: //bottles
            if (j % 8 == 0) {
              var t_nt = t_tc;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p02.wav"]);
              t_nt = t_nt + t_8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p02.wav"]);
            } else if (j % 8 == 4) {
              var t_nt = t_tc;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p02.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p02.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_16thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
              t_nt = t_nt + t_8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p02.wav"]);
            }
            break;
          case 2: //HandClap
            if (((j - 1) % 2) == 0) {
              t_evtSet.push([t_tc, instset[i], 5, "/samples/handClap.wav"]);
            }
            break;
          case 3: //kit
            if ((j % 4) == 0) {
              var t_nt = t_tc;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bd.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bd.wav"]);
              t_nt = t_nt + t_secPerBeat;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bd.wav"]);
              t_nt = t_nt + t_16thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/bd.wav"]);
            }
            break;
          case 4: //cowbell
            if (j % 4 == 0) {
              var t_nt = t_tc + t_secPerBeat + t_8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s1.wav"]);
              t_nt = t_nt + t_8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s1.wav"]);
              t_nt = t_nt + t_dot8thDur;
              t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s1.wav"]);
              // t_nt = t_nt + t_dot8thDur + t_secPerBeat;
              // t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s1.wav"]);
              // t_nt = t_nt + t_8thDur;
              // t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s2.wav"]);
              // t_nt = t_nt + t_8thDur;
              // t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s1.wav"]);
              // t_nt = t_nt + t_16thDur;
              // t_evtSet.push([t_nt, instset[i], 5, "/samples/cowBell_s2.wav"]);
            }
            break;
          case 5:
            // sn
            if (((j - 1) % 2) == 0) {
              t_evtSet.push([t_tc, instset[i], 5, "/samples/sn.wav"]);
            }
            break;
        }
        if (t_time > dur) break;
      }
    }
    return t_evtSet;
  }

  function generateAccel(iTempo, fTempo, pNum, stTi, dur) {
    var t_16_bt = [];
    var t_iVms = (iTempo / 60000.0);
    var t_fVms = (fTempo / 60000.0);
    var t_dV = t_fVms - t_iVms;
    var t_dT = dur * 1000;
    var t_a = t_dV / t_dT;
    var t_bts = 0;
    var t_num16 = 0;
    var t_tc16th = [stTi];
    var t_tcBt = [stTi];
    //make array of 16th notes
    for (var j = 0; j < t_dT; j++) {
      var t_currT = stTi + (j / 1000.0);
      var t_nV = t_iVms + (t_a * j);
      t_bts = t_bts + t_nV;
      var t_fl16bts = floorByStep(t_bts, 0.25) - (t_num16 * 0.25);
      if (t_fl16bts == 0.25) {
        t_num16++;
        //whole beats
        if (t_num16 % 4 == 0 && t_num16 > 0) {
          t_tcBt.push(t_currT);
        }
        //16ths
        t_tc16th.push(t_currT);
      }
    }
    t_16_bt.push(t_tc16th);
    t_16_bt.push(t_tcBt);

    return t_16_bt;
  }

  var t2 = [123, 123, 123, 123, 123, 123];
  // var t2 = [180, 180, 180, 180, 180, 180];
  var t3 = [10, 12, 15, 17, 20, 23];
  var testPoly = generatePolyrhythm(t2, ogInstSet, 0, 16);
  // eventSet.push.apply(eventSet, testPoly);

  //ACCEL/DECEL TO NEW TEMPOS
  var t_inst = [0, 1, 2, 3, 4, 5];
  // accelToTempo(t2, t3, t_inst, 0, 60);

  var tt1 = [60];
  var tt2 = [5];
  var tt3 = [2];
  accelToTempo(tt1, tt2, tt3, 0, 60);

  function accelToTempo(tiSet, tfSet, instSet, stTi, dur) {
    for (var i = 0; i < instSet.length; i++) {
      var t_btA = generateAccel(tiSet[instSet[i]], tfSet[instSet[i]], instSet[i], stTi, dur);
      // Make Beat Frets
      for (var j = 0; j < t_btA[1].length; j++) {
        eventSet.push([t_btA[1][j], instSet[i], 0, -1]);
      }
      for (var j = 0; j < t_btA[0].length; j++) {
        switch (instSet[i]) {
          case 0: //Shaker
            var t_snum = (j % 2) + 1;
            eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/shaker_p" + t_snum + ".wav"]);
            break;
          case 1: //bottles
            if ((j % 32) == 0) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 3) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 6) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p02.wav"]);
            if ((j % 32) == 8) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 11) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 14) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p02.wav"]);
            if ((j % 32) == 16) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 19) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p02.wav"]);
            if ((j % 32) == 22) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p02.wav"]);
            if ((j % 32) == 25) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 27) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 28) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p01.wav"]);
            if ((j % 32) == 30) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bottle_p02.wav"]);
            break;
          case 2: //HandClap
            if ((j % 8) == 4) {
              eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/handClap.wav"]);
            }
            break;
          case 3: //bass drum
            if ((j % 16) == 0) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bd.wav"]);
            if ((j % 16) == 3) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bd.wav"]);
            if ((j % 16) == 7) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bd.wav"]);
            if ((j % 16) == 8) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/bd.wav"]);
            break;
          case 4: //cowbell
            if ((j % 16) == 6) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/cowBell_s1.wav"]);
            if ((j % 16) == 8) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/cowBell_s1.wav"]);
            if ((j % 16) == 11) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/cowBell_s1.wav"]);
            break;
          case 5:
            // sn
            if ((j % 8) == 4) eventSet.push([t_btA[0][j], instSet[i], 5, "/samples/sn.wav"]);
            break;
        }
      }
    }
  }

  /*
  accels and decels to different ratios use various tuning ratios from wiki page
  make patch to test ratios
  long accells and secels with metric modulation to accomodate slow tempi
  fast accels and decels
  ending lick on marimba and vibes
  */





*/



  //