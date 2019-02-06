$(document).ready(function() {
  $('.img').on('dragstart', function(event) {
//prevents any drag/drop on the page
    event.preventDefault();
  });

  var start = document.getElementById("start");
  var playGame = false;
  //the var play links to the play class onthe html page.
  var play = $(".play");
  var playerScore = 0;

  //set selectors
  var timer = $(".timer");
  var score = $(".score");
  var img = $(".img");
  var imgSize = $(".size");
  var restart = $(".restart");

  //TIMER
  var timeLeft = 0; //30 seconds timer for player

    setInterval(function countDown() {
    //the countDown() Function looks at if there is time left
    //dont use -1 it doesnt count down the number.
    if (timeLeft != 0) {
      timeLeft --;

    }
    if (timeLeft == 0) { //remove image

      //remove image of last enemy
      $(".img img:last-child").remove()

      playGame = false;
      clearInterval(pictureTimer);

      modal.style.display = "block";
      timer.html("<b class='timer'>Timer: " + timeLeft + " </b>");
    } else {
      timer.html("<b>Timer: " + timeLeft + " </b>");
    }
  }, 1000);

  $('#bg').css("background-image", "url(img/back1.jpg)");

  //found out JQuery is one of the better ways to assign the numbers to an container
  var container = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
  //var backgrounds = ["back1", "back2" , "back3" , "back4" , "back5" ]
  //generate random number for name, as names are 0-8
  //NEW FUNCTION
  function generateRandomForArray() {
    //Math.random generates a number between 0 and 1, apply Math.floor, which rounds down to the nearest whole number:
    //Math.floor(Math.random() * 10 + 1)
    var num = Math.floor(Math.random() * 16 + 1);
    return num;
  }

//NEW FUNCTION

  //generate random position values for top
  function generateRandomHeight() {
    var num = Math.floor(Math.random() *
    // the height of the window.
     (($(window).height() - 250) - 150 + 1) + 150);
    return num;
  }
//NEW FUNCTION
  //generate random positions value for Width
  function generateRandomWidth() {
    //the width of the window.
    var num = Math.floor(Math.random() * (($(window).width() - 250) - 100 + 1) + 100);
    return num;
  }

//NEW FUNCTION
  //random number generator to set size of characters
  // Math.floor(Math.random() * (max - min + 1) ) + min;
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
      img.append("<img class='size' style='width:" + size + "px' src ='img/" + num + ".png'>");
      //debugger;
      var left = generateRandomWidth();
      //co ordinates on the x -axis
      var top = generateRandomHeight();
      //co ordinates on the y -axis
      img.last().css({
        "position": "absolute",
        "top": top + "px",
        "left": left + "px",
        "width": size + "px",
        "height": size + "px"
      });

    }

  }

  //when clicking on image gets score and removes picture of enemy

  img.click(function() {
// added +1 score to the intial value
    playerScore++;
    score.html("<b  class='score'> Score: " + playerScore + " </b>");

    $(".img img:last-child").remove()
    //this removes the iamge after click
  })


  //click function to restart game
  restart.click(function() {
    location.reload();
  })

  //image to vanish
  var pictureTimer = 0;
  function setResetInterval(bool) {
// causes the images to vanish after a sec
    if (bool) {
      pictureTimer = setInterval(function() {
        setValue();
      }, 1000)
    } else {
      //this would reset the timer
      clearInterval(pictureTimer);
    }
  }

  //play button

  play.click(function() {

    playerScore = 0;
    timeLeft = 30;


    score.html("<b  class='score'> Score: " + playerScore + " </b>");

    if (playGame == false) {
//reset the timer & then start the game
      setResetInterval(true);

      playGame = true;

    } else {
      setResetInterval(false);
      playGame = false;
    }

    //close modal
  modal.style.display = "none";
  });
  //Modal
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("myBtn");

    btn.onclick = function() {
    modal.style.display = "block";
  }

});
