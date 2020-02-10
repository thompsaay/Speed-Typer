const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originDiv = document.querySelector("#origin-text p");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var sampleTexts = [
    "Hello mate try type this",
    "Here's another sentence for you lad",
    "One more with a spellling mistake haha."
];

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if(time <= 9){
        time = "0" + time; 
    }

    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){

    var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;

    timer[3]++;

    //Define minutes (Math.floor removes decimals)
    timer[0] = Math.floor((timer[3]/100)/60);
    //Define seconds 
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    //Define milliseconds
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if(textEntered == originText){

        //Sentence complete
        testWrapper.style.borderColor = "#429890";
        clearInterval(interval);
    }
    else {
        if(textEntered == originTextMatch){
            //Word complete
            testWrapper.style.borderColor = "#65CCF3";

        }
        else {
            //Word incomplete
            testWrapper.style.borderColor = "#E95D0F";
        }
    } 

}

// Start the timer:
function start(){
    let inputLength = testArea.value.length;
    if(inputLength === 0 && !timerRunning){

        timerRunning = true;

        //Execute runtimer function every 1000th of a second
        interval = setInterval(runTimer, 10);
    } 
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    //Change Origin text
    let randomNumber = Math.floor(Math.random() * sampleTexts.length);
    originDiv.innerHTML = sampleTexts[randomNumber];
    originText = document.querySelector("#origin-text p").innerHTML;

}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);