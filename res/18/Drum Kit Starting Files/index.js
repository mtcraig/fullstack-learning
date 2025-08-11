
for (i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click",function () {
        var buttonHit = this.getAttribute("class")[0];
        handleHit(buttonHit);
    });
}

document.addEventListener("keydown",function(e) {
    var keyHit = e.key;
    handleHit(keyHit);
});

function handleHit(key) {
    try {
        var whichHit = document.querySelector('.' + key);
        buttonAnimation(whichHit);
    } catch (error) {
        console.log("No associated drum")
    }
    switch (key) {
        case "w":
            var audio = new Audio('./sounds/tom-1.mp3');
            audio.play();
            break;
        case "a":
            var audio = new Audio('./sounds/tom-2.mp3');
            audio.play();
            break;
        case "s":
            var audio = new Audio('./sounds/tom-3.mp3');
            audio.play();
            break;
        case "d":
            var audio = new Audio('./sounds/tom-4.mp3');
            audio.play();
            break;
        case "j":
            var audio = new Audio('./sounds/kick-bass.mp3');
            audio.play();
            break;
        case "l":
            var audio = new Audio('./sounds/snare.mp3');
            audio.play();
            break;
        case "k":
            var audio = new Audio('./sounds/crash.mp3');
            audio.play();
            break;
        default:
            break;
    }
}

function buttonAnimation(whichHit) {
    whichHit.style.color = "white";
    whichHit.classList.add("pressed");
    setTimeout(function () {
        whichHit.style.color = "#DA0463";
        whichHit.classList.remove("pressed");
        }
        ,100);
}