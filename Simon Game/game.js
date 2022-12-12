let gamePattern=[];
let userPattern=[];
let levelCounter = 0;
let started = false;
let buttonColor=["red", "blue", "green", "yellow"];

// functions
function startOver() {
    started = false;  
}
function gameOver() {
    levelCounter = 0;
    gamePattern = [];
    $(`#level-title`).text(`Game Over, Press Any Key To Restart`); 
    playAudio(`wrong`);
    $(`body`).addClass(`game-over`);
    setTimeout(function() {
        $(`body `).removeClass('game-over');
    }, 200);
}
$(document).keydown(function(){
    if (started != true)
    nextSequence();
});

function playAudio(color) {
    let audiPlay=new Audio(`sounds\\${color}.mp3`);
    audiPlay.play();
}

function animatedPress(userChosenColour){
    $(`#${userChosenColour}`).fadeOut(50).fadeIn(50);
    $(`div #${userChosenColour} `).addClass(`pressed`);
    setTimeout(function() {
        $(`div #${userChosenColour} `).removeClass('pressed');
    }, 100);
}
function checkAnswer(currentLevel) {
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        
        if(userPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();    
            }, 1000);
        } 
   }
   else{
    gameOver();
    $(document).keydown(function(){
        startOver();
    })
   }
}


function nextSequence() {
    userPattern=[];
    let randomNumber=Math.floor((Math.random()*4));
    let randomChoosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    playAudio(randomChoosenColor)
    $(`#${randomChoosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    levelCounter++;
    $(`#level-title`).text(`Level ${levelCounter}`);    
}

$(`.btn`).click(function() {
    let userChosenColour=this.id;
    userPattern.push(userChosenColour);
    animatedPress(userChosenColour);
    playAudio(userChosenColour);
    checkAnswer(userPattern.length-1);
});




