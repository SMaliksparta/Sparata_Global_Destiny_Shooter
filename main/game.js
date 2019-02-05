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
    //the countDown() Function looks at if there is time left
    //dont use -1 it doesnt count down the number
    //if the timer is not 0 it will then take away 1.
    if (timeLeft != 0) {
      timeLeft --;

    }
    // if time is 0 clear the page
    if (timeLeft == 0) { //remove image

      //i needed to find a way to remove the last image that was loaded in from the div. based on $('.img ...').remove();
      $(".img img:last-child").remove()

      playGame = false;
      // when the game isnt being played anymore
      clearInterval(timerId);
        //The setInterval() method will continue calling the function until clearInterval() is called so i create it here.
        //i reference the id on my html page and seeting up how the countdown will look like


      timer.html("<b class='timer'>Timer: " + timeLeft + " </b>");
      //the <b> lets me bold text
      //this if statement results in keeping the timer blank after the game ends

    } else {
      // this counts down the timer in intervals of 1's
      timer.html("<b>Timer: " + timeLeft + " </b>");
    }
  }, 1000);

  //found out JQuery is one of the better ways to assign the numbers to an container
  var container = ["0", "1", "2", "3", "4", "5", "6", "7", "8","9"]
  //i named them numbers for the gernetateRandomArray() function to pull out images much more easier
  //generate random number for name, as names are 0-8
  //NEW FUNCTION
  function generateRandomForArray() {
    //Math.random generates a number between 0 and 1, that isn't a whole number, and also isn't 1. To get a number, for example between 0 and 10, multiply your answer by 10:
   //Math.random() * 10
   //To get it to be a whole number, i.e. an integer, apply Math.floor, which rounds down to the nearest whole number:
   //Math.floor(Math.random() * 10)
//To get a whole number between 1 and 10, add 1 to the answer:
//Math.floor(Math.random() * 10 + 1)

    var num = Math.floor(Math.random() * 9 + 1);
    //this sets a random whole number into the var num
    return num;
  }

//NEW FUNCTION

  //generate random position values for top
  function generateRandomHeight() {
    var num = Math.floor(Math.random() *
    // $(window).height() gets you the height of the (browser) window aka viewport.
     (($(window).height() - 250) - 150 + 1) + 150);
    return num;
  }
//NEW FUNCTION
  //generate random positions value for Width
  function generateRandomWidth() {
    // $(window).weight() gets you the width of the (browser) window aka viewport.
    var num = Math.floor(Math.random() * (($(window).width() - 250) - 100 + 1) + 100);
    return num;
  }

//NEW FUNCTION
  //random number generator to set size of characters
  // i wanted to randomly generate the size of characters so i gave it a min but i wanted to generrate a size between 500 and 100 following the example of Math.floor(Math.random() * (max - min + 1) ) + min;
  function generateSize() {
    var num = Math.floor(Math.random() * (500 - 100 + 1) + 100);
    return num;
  }

  //sets value of imgaes and gos through them changing image file and position

  function setValue() {
    if (playGame == true) {

      $(".img img:last-child").remove()

      var num = container[generateRandomForArray()];
      // this looks at the number that was generated within the generateRandomForArray and puts it as the container number
      var size = generateSize();
      //for the size of the image call the generateSize function
      img.append("<img class='size' style='width:" + size + "px' src ='img/" + num + ".jpeg'>");
      //debugger;
      //this was the tricky bit i needed to call the image size with a randomly generated size
      var left = generateRandomWidth();
      //this generate the co ordinates on the within the page limits on the x -axis
      var top = generateRandomHeight();
      ////this generate the co ordinates on the within the page limits on the y -axis
      img.last().css({
        //im calling the last child afunction and assigning its postion
        "position": "absolute",
        //The element is positioned relative to its first positioned ancestor element
        "top": top + "px",
        "left": left + "px",
        "width": size + "px",
        "height": size + "px"
        //this takes the the vars returned from the specified functions and gets ready to print the image
      });

    }

  }

  //when clicking on image gets score and removes picture of enemy

  img.click(function() {
    if (timeLeft == 0) {
      playerScore = 0;
    }
// added +1 score to the intial value
    playerScore++;
    //this references the score html clss
    score.html("<b  class='score'> Score: " + playerScore + " </b>");

    $(".img img:last-child").remove()
    //this removes the iamge after click
  })


  //click function for modal to restart game
  restart.click(function() {
    location.reload(); //this reloads the current document
  })

//var timerId creates and set it to the 0 value.
  var timerId = 0;
//if the
  function setResetInterval(bool) {

    if (bool) {
      //this creates the timer and starts coutning down and calls a funciton that i hve created before
      timerId = setInterval(function() {
        //waits for the game to be played again
        setValue();
      }, 1000)
    } else {
      //this would reset the timer
      clearInterval(timerId);
    }
  }

  //play button
  // after clicking the play button i want to start the game up with these functions going off.

  play.click(function() {

    home.pause();
    //
    home.currentTime = 0;
    //at the homepage it gets the time and sets it to 0
    playerScore = 0;
    //resets the previous score to 0 if there was one and assigns it a 0

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
