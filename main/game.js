$(document).ready(function() {
  $('.img').on('dragstart', function(event) {
    //prevents any drag/drop on the page
    event.preventDefault();
  });

  var home = new Audio("start.mp3");
  setTimeout(  function(){$('body,html').addClass("load");
  home.play()

  var names = [];
  var storedNames;
  storedNames = JSON.parse(localStorage.getItem("names"));
  var highScore = 0; //highscore
  if (storedNames != null) {
    highScore = storedNames[storedNames.length - 1];
  }

  var start = document.getElementById("start");
  var kill = document.getElementById("kill");
  var audio = document.getElementById("audio");
  var playGame = false;
  //the var play links to the play class onthe html page.
  var play = $(".play");
  var playerScore = 0;
  debugger;
  //set selectors
  var timer = $(".timer");
  var score = $(".score");
  var img = $(".img");
  var imgSize = $(".size");
  var restart = $(".restart");
  var clearScore = $(".clearScore");

  //TIMER
  var timeLeft = 0; //30 seconds timer for player

  setInterval(function countDown() {
    //the countDown() Function looks at if there is time left
    //dont use -1 it doesnt count down the number.
    if (timeLeft != 0) {
      timeLeft --;

    }
    if (timeLeft == 0) { //remove image

      //push score to leaderboard
      //get the highest score and push it to leader board only if it's
      //higher than current score


      //if statement to update highscore
      if (playerScore > highScore) {
        //delete previous high score array text


        localStorage.setItem("names", JSON.stringify(names));
        names.push(playerScore) //add score
        // names[0]=playerScore;
        localStorage.setItem("names", JSON.stringify(names));
        storedNames = JSON.parse(localStorage.getItem("names"));

        highScore = playerScore;

        for (var i = 0; i < (storedNames.length); i++) {
          $('#test').append("<h1>" + storedNames[i] + "\n </h1>")
          //document.getElementById("test").innerHTML = storedNames[i];
        }


      }
      //end of add highscore function

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

  $('#bg').css("background-image", "url(img/stage.jpg)");
  $('#bg').fadeIn();

  //changes background image
  setInterval(function() {

    setTimeout(function(){

      $('#bg').css("background-image", "url(img/" + name + ".jpg)").fadeOut();

    }, 8950);

    var name = stages[generateRandomForBG()];
    $('#bg').css("background-image", "url(img/" + name + ".jpg)").fadeIn();

  }, 9000)

  //found out JQuery is one of the better ways to assign the numbers to an container
  var container = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16","17","18","19","20","21","22"]
  var stages = ["stage1", "stage2", "stage3", "stage4", "stage5"];
  //var backgrounds = ["back1", "back2" , "back3" , "back4" , "back5" ]
  //generate random number for name, as names are 0-8
  //NEW FUNCTION
  function generateRandomForArray() {
    //Math.random generates a number between 0 and 1, apply Math.floor, which rounds down to the nearest whole number:
    //Math.floor(Math.random() * 10 + 1)
    var num = Math.floor(Math.random() * 21 + 1);
    return num;
  }
  function generateRandomForBG() {
    var num = Math.floor(Math.random() * 5);
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

  //restart audio on click
  function audioPlay() {
    if (snd.paused) {
      snd.play();
    } else {
      snd.currentTime = 0
    }
  }

  var snd = new Audio("kill.mp3");
  //clearInterval(interval);

  //when clicking on image gets score and removes picture of enemy

  img.click(function() {
    audioPlay() //plays kill sound
    if (timeLeft == 0) {
      playerScore = 0;
    }

    playerScore++;
    score.html("<b  class='score'> Score: " + playerScore + " </b>");

    $(".img img:last-child").remove()
  })


  //click function for modal to restart game
  restart.click(function() {
    location.reload(); //reload page
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

  //set first highscore to 0
  storedNames = highScore;


  $('#test').append("<h1>" + storedNames + "</h1>")

  //play button

  play.click(function() {

    home.pause();
    home.currentTime = 0;
    playerScore = 0;

    score.html("<b  class='score'> Score: " + playerScore + " </b>");
    //play main audiom (overwatch win music)
    audio.play();
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

  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  //clears leaderboard scores
  clearScore.click(function() {
    localStorage.removeItem('names');
    $('#test').html("");

  })

  //if there are no scores stored in web browser memory. make sure null
  //is not displayed on screen

  if (storedNames === null) {
    $('#test').html("").empty();
  }
});
});
