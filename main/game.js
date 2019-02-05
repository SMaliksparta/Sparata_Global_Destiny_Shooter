//You call jQuery's $ function, passing to it the document object. The $ function returns an enhanced version of the document object. This enhanced object has a ready() function you can call, to which you pass a JavaScript function
$(document).ready(function() {
  $('.img').on('dragstart', function(event) {
//I am attempting to prevent any drag/drop on my page utilizing the following Javascript:
    event.preventDefault();
  });

//i want the game to have intro music
//need to add this
var home = new Audio("...");
setTimeout(
  //the setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds
function(){$('body,html').addClass("load");
//This will add the load class to an element with id on the body and when the dom is ready on page load.
home.play()
//this starts the game with a sound effect eventually
//and the game start in 500 milliseconds
}, 500);

  //this points to the html div start
  var start = document.getElementById("start");

  //these are the variables for the game that are active only when the game is active using boolean
  //only true when game is playing
  var playGame = false;
  //the var play links to the play class onthe html page.
  var play = $(".play");
  //creating the player variable and assigning it 0
  var playerScore = 0;

  //set selectors
//im refrenceing a class
  var timer = $(".timer");
  //the .timer variable is set here so it can be called later
  var score = $(".score");
  //the .score variable is set here so it can be called later
  var img = $(".img");
  //setting up the img var
  var imgSize = $(".size");
  //i want the images to change based on img size var
  var restart = $(".restart");
  // refreshes the instance with null evaluates

  //TIMER
  // i wanted to create a timer that would count down.
  var timeLeft = 0; //30 seconds timer for player

  //timer
  //The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).

  setInterval(function countDown() {
    //the countDown() Function looks at if there is no time left
    if (timeLeft != 0) {
      timeLeft--;

    }

    if (timeLeft == 0) { //remove image

      //remove image of last enemy
      $(".img img:last-child").remove()

      playGame = false;
      clearInterval(timerId);
        //The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.

      modal.style.display = "block";
      timer.html("<b class='timer'>Timer: " + timeLeft + " </b>");

    } else {
      timer.html("<b>Timer: " + timeLeft + " </b>");
    }
  }, 1000);

  //array to hold image names
  var container = ["0", "1", "2", "3", "4", "5", "6", "7", "8"]
  //generate random number for name, as names are 0-8
  function generateRandomForArray() {
    var num = Math.floor(Math.random() * 9);
    return num;
  }


  //generate random position values for top
  function generateRandom() {
    var num = Math.floor(Math.random() * (($(window).height() - 250) - 150 + 1) + 150);
    return num;
  }

  //generate random positions value for left
  function generateRandomLeft() {
    var num = Math.floor(Math.random() * (($(window).width() - 250) - 100 + 1) + 100);
    return num;
  }

  //random number generator to set size of characters
  function generateSize() {
    var num = Math.floor(Math.random() * (500 - 100 + 1) + 100);
    return num;
  }

  //sets value of imgaes and gos through them changing image file and position
  function setValue() {
    if (playGame == true) {

      $(".img img:last-child").remove()
      var num = container[generateRandomForArray()];
      var size = generateSize();
      img.append("<img class='size' style='width:" + size + "px' src ='img/" + num + ".jpeg'>");
      var left = generateRandomLeft();
      var top = generateRandom();
      img.last().css({
        "position": "absolute",
        "top": top + "px",
        "left": left + "px",
        "width": size + "px",
        "height": size + "px"
      });

    }

  }

  //clicking on image gets score and removes picture of enemy
  img.click(function() {
    if (timeLeft == 0) {
      playerScore = 0;
    }

    playerScore++;
    score.html("<b  class='score'> SCORE: " + playerScore + " </b>");

    $(".img img:last-child").remove()
  })


  //click function for modal to restart game
  restart.click(function() {
    location.reload(); //reload page
  })

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



  //play button
  play.click(function() {

    home.pause();
    home.currentTime = 0;
    playerScore = 0;

    score.html("<b  class='score'> Score: " + playerScore + " </b>");



    if (playGame == false) {


      setResetInterval(true);


      playGame = true;

    } else {
      setResetInterval(false);
      playGame = false;

    }
    playerScore = 0;
    timeLeft = 30;
    //does my main function for popping image up in interval
    var a = true;

    //close modal
    modal.style.display = "none";

  });
  //Modal

  var modal = document.getElementById('myModal');


});
