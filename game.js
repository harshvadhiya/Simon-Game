var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level = 0;

$(".start").click(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
        $(this).text("Start");
        $(this).addClass("none");
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level = 0;
    gamePattern = [];
    started=false;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length){  
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        // console.log("wrong");
        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout( () => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Below Button to Restart");
        $(".start").text("Restart");
        $(".start").removeClass("none");
        startOver();
      }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
