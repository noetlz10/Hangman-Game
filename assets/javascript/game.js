
  // variables I will be using
  var guessesLeft = 8;
  var wins = 0;
  var losses = 0;
  var lettersGuessed = [];
  var correctLetters = [];
  var wordBank = ["zeke", "prescott", "bailey", "bryant", "beasley", "witten"];
  var winImg = "../images/touchdown-img.jpg";
  var lossImg = "../images/sad-coach.jpg";

  //randomly select index out of wordBank array
  var targetWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();
      //console.log(targetWord);

  // make chosenWord display as underscores _ _ _ _
  var chosenWord = [];
  for (var i = 0; i < targetWord.length; i++) {
    chosenWord[i] = "_ ";
  }

  document.querySelector('#currentWord').innerHTML = chosenWord.join(" ");

  // track current word
  var letterCount = targetWord.length;

  // display stats
  document.querySelector('#winCounter').innerHTML = "Wins: " + wins;
  document.querySelector('#lossCounter').innerHTML = "Losses: " + losses;
  document.querySelector('#guessesLeft').innerHTML = "Guesses Left: " + guessesLeft;

  // resets the game
  function resetHangman() {
    guessesLeft = 8;
    lettersGuessed = [];
    correctLetters = [];
    targetWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();

    chosenWord = [];
    for (var i = 0; i < targetWord.length; i++) {
            chosenWord[i] = "_";
        }

    letterCount = targetWord.length;


    //document.querySelector('h1').innerHTML = "GUESS THE COWBOYS PLAYER!";

    document.querySelector("#currentWord").innerHTML = chosenWord.join(" ");

    // display reset stats
    document.querySelector("#winCounter").innerHTML = "Wins: " + wins;
    document.querySelector("#lossCounter").innerHTML = "Losses: " + losses;

    document.querySelector("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;

    document.querySelector("#wrongGuess").innerHTML = "Letters Guessed: ";

    //document.querySelector('#resetWrapper').style.display = "block";

  }

  // starts hangman game on key up
  document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

    // make sure user pressed a letter key
    if (event.keyCode > 64 && event.keyCode < 91) {

      // see if letter is already there
      if ((chosenWord.indexOf(userGuess) !== -1)) {
                return;
      }

      // update array with userGuess
      for (var i = 0; i < targetWord.length; i++) {
                if (targetWord.charAt(i) === userGuess) {
                    chosenWord[i] = userGuess;
                    letterCount--;
                    document.querySelector("#currentWord").innerHTML = chosenWord.join(" ");
                }
      }

      // see if userGuess is not in chosenWord and letter is in lettersGuessed array so no duplication occurs
      if ((targetWord.indexOf(userGuess) === -1) && (lettersGuessed.indexOf(userGuess) !== -1)) {
              document.querySelector("#wrongGuess").innerHTML = "Letters Guessed: " + lettersGuessed.join(", ");
              return;
      }

      for (var j = 0; j < targetWord.length; j++) {
                if (targetWord.indexOf(userGuess) === -1) {
                    lettersGuessed.push(userGuess);
                    guessesLeft--;
                    break;
                }
      }

      // see if game is over, user guessed word or ran out of guesses
      if (letterCount === 0) {
        wins++;
        document.querySelector("h2").innerHTML = "You Got It!"; //display image instead of text
        document.querySelector("#test1").innerHTML = "The Player was " + targetWord.toUpperCase() + ", Play again...";
        //todo show winner image if have time in the image box instead of in the jumbotron
        //document.querySelector("#resetWrapper").style.display = "none";
        setTimeout(resetHangman, 2700);
      } else if (guessesLeft === 0) {
          losses++;
          document.querySelector("h2").innerHTML = "You Lost! Try harder next time.";
          document.querySelector("#test1").innerHTML = "The Player was " + targetWord.toUpperCase() + ", Play again...";
          //todo show loser image here if you have time
          //document.querySelector("#hintImages").style.display ="none";
          //setTimeout(resetHangman, event.keyCode);
          setTimeout(resetHangman, 2700);
      }


        document.querySelector('#guessesLeft').innerHTML = "Guesses Left: " + guessesLeft;

        document.querySelector('#wrongGuess').innerHTML = "Letters Already Guessed: " + lettersGuessed.join(", ");
    }



  };
