// [ goTime, playerNum, eventType,  eventTypeSpecifics]

var eventSet = [];
var vf = 85/60;
var vi = 67/60;
var tf = 10.0;
var ti = 1.0;
var currV = vi;

var a = (vf -vi) / (tf - ti);

console.log(a);
console.log(a + " " + vi  + " " + vf);
for(var i=0;i<9;i++){
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
