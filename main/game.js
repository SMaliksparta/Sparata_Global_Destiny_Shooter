$(document).ready(function() {
  $('').on('', function(event) {
    event.preventDefault();
  });
})

//array to hold image names
var container = ["0", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"]
var stages = ["stage1", "stage2", "stage3", "stage4", "stage5"];
//generate random number for object, they are 0-8 for now
function generateRandomForArray() {
  var num = Math.floor(Math.random() * 23);
  return num;
}

//generate random position values for top
function generateRandom() {
  var num = Math.floor(Math.random() * (($(window).height();
  return num;
}

//generate random positions value for left.
  var num = Math.floor(Math.random() * (($(window).width();
  return num;
}



//i want the game to have an 30 sec cooldown and once the timer is over the core is recorded.

var timerId = 0;

function setResetInterval(bool) {

  if (bool) {
    timerId = setInterval(function() {
      setValue();
    }, 1000)
  } else {
    clearInterval(timerId);
  }
}
