// [ goTime, playerNum, eventType,  eventTypeSpecifics]
// EVENT TYPES: 0-beat; 1-notation; 2-pitch; 3-stop; 4-cres, 5-playSamp;
var eventSet = [];
// GENERATE SOME TEST POLY RHYTHMS TO SEE WHAT RATIOS WORK
// FIGURE OUT SAMPLE PLAYBACK WITH EACH PARTIAL A SEPARATE SAMPLE
var tempoSet_001 = [123, 123, 123, 123, 123];
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
          } 
          else if (j % 8 == 4) {

            t_evtSet.push([t_nt, instset[i], 5, "/samples/bottle_p01.wav"]);
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
            t_evtSet.push([t_nt, instset[i], 5, "/samples/bassDrum.wav"]);
            t_nt = t_nt + t_dot8thDur;
            t_evtSet.push([t_nt, instset[i], 5, "/samples/bassDrum.wav"]);
            t_nt = t_nt + t_secPerBeat;
            t_evtSet.push([t_nt, instset[i], 5, "/samples/bassDrum.wav"]);
            t_nt = t_nt + t_16thDur;
            t_evtSet.push([t_nt, instset[i], 5, "/samples/bassDrum.wav"]);
          }
          break;
      }


      if (t_time > dur) break;
    }
  }
  return t_evtSet;
}

var testPoly = generatePolyrhythm(tempoSet_001, ogInstSet, 0, 80);
eventSet.push.apply(eventSet, testPoly);
console.log(eventSet);
// ACCEL/DECEL TO UNISON OVER TIME
var vf = 85 / 60;
var vi = 67 / 60;
var tf = 10.0;
var ti = 1.0;
var currV = vi;
var a = (vf - vi) / (tf - ti);
for (var i = 0; i < 9; i++) {
  currV = currV + a;
}

//each frame calculate the number of beats you moved that frame
//currAccel * currBeatsPerSecond(velocity) = currentVelocity; currVelocity * SECPERFRAME = beats This Frame
//IOW - find the current BPS by multiplying last BPS and accel for this frame
// this will be your current currBeatsPerSecond
// multiply the currBeatsPerSecond by the num sec transpired in one frame

//find closest whole num beats to draw beat marker


/*
find which down beat frame is closest to destination frame

*/


/*
accels and decels to different ratios use various tuning ratios from wiki page
make patch to test ratios
long accells and secels with metric modulation to accomodate slow tempi
fast accels and decels
ending lick on marimba and vibes
*/









2






//
