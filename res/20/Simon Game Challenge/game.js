var buttonColours = ["red","blue","green","yellow"];
resetGame();

function resetGame () {
    gameInProgress = false;
    roundNumber = 0;
    gamePattern = [];
    userClickedPattern = [];
    activeColour = "";
    i = 0;
}

$(document).on("keydown", () => {
    if (gameInProgress !== true) {
        gameInProgress = true;
        nextSequence();
    } else {
        console.log("game has already started");
    }
    console.log("gameInProgress: " + gameInProgress);
});

function nextSequence () {
    setTimeout( () => {
        var roundNumber = gamePattern.length + 1;
            console.log("roundNumber: " + roundNumber);
        $("#level-title").text(`Round ${roundNumber}`);
        var randomNumber = Math.floor(Math.random()*4);
            console.log("randomNumber: " + randomNumber);
        var randomColour = buttonColours[randomNumber];
            console.log("randomColour: " + randomColour);
        gamePattern.push(randomColour);
            console.log("gamePattern: " + gamePattern);
        playSequence(gamePattern);
    },1000)
}

function playSequence (activePattern) {
    for (i = 0; i < activePattern.length; ++i) {
        console.log(activePattern);
        var activeColour = activePattern[i];
        pulse(activePattern, activeColour, i);
    }
}

$(".btn").on("click", function () {
        if (gameInProgress === true) {
            var userChosenColour = this.classList[1];
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            buttonAnimate(userChosenColour,150);
            validateSequence(userClickedPattern);
        } else {
            console.log("haven't started the game yet dummy!");
        }
    }
)

function validateSequence () {
    if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
        if (gamePattern.length === userClickedPattern.length) {
            userClickedPattern = [];
            nextSequence();
        } else {
            console.log("waiting for next click");
        }
    }
    else {
        $("#level-title").text(`GAME OVER. Score: ${gamePattern.length - 1}`);
        playSound("wrong");
        resetGame();
        setTimeout( () => {
                $("#level-title").text("Press A Key to Start");
            },3000
        );
    }        
}


function playSound (colour) {
    console.log(`chasing audio for ${colour}`);
    var activeAudio = new Audio(`./sounds/${colour}.mp3`);
    activeAudio.play();
}

function buttonAnimate (colour,dur) {
    $(`.${colour}`).addClass("pressed");
    setTimeout( () => {
            $(`.${colour}`).removeClass("pressed");
        },dur
    );
}

function pulse(pattern, colour, i) {
    setTimeout( () => {
        console.log("length: " + pattern.length);
        console.log("i: " + i);
        console.log("activeColour: " + colour);
        playSound(colour);
        buttonAnimate(colour,150);
    },i * 500);
}