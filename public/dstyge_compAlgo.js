// [ goTime, playerNum, eventType,  eventTypeSpecifics]
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
    for (var j = 0; j < 999; j++) {
      t_evtSet.push([(t_secPerBeat * 1) + startTime, instset[i], 0, -1]);
      if ((t_secPerBeat * i) > dur) break;
    }
  }
  return t_evtSet;
}


// ACCEL/DECEL TO UNISON OVER TIME
var vf = 85 / 60;
var vi = 67 / 60;
var tf = 10.0;
var ti = 1.0;
var currV = vi;

var a = (vf - vi) / (tf - ti);

console.log(a);
console.log(a + " " + vi + " " + vf);
for (var i = 0; i < 9; i++) {
  currV = currV + a;
  console.log(currV);
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
