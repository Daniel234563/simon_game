//deklarerer tomme errays for senere bruk.
let buttonColours = ["blue", "yellow", "green", "green"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

//lager en start funksjon, som aktiveres når bruker trykker på en knapp.
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

//eventlistener som observerer klikk på ".btn" klassen.
$(".btn").click(function () {
  randomChosenColour = $(this).attr("id"); //henter id-en til knappen som ble trykket på.
  userClickedPattern.push(randomChosenColour); //Knappen som ble presset, blir lagt til i gamePattern array.
  playSound(randomChosenColour); //legger til fargen som ble trykket på til playsound funksjon.
  animatePress(randomChosenColour); //legger til animasjon.
  checkAnwser(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //klassen "pressed" blir lagt til på knappen.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(sound) {
  let audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level" + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnwser(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}
