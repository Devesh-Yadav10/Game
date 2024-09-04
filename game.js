var userclickedpattern=[];
var gamecolors=["red","blue","green","yellow"];
var gamepattern=[];
var level=0;
var started=false;
$(document).keypress(function(){
    if(!started){
        nextsequence();
        started=true;
        
        $("#level-title").text("Level: "+level);
    }

})
function animatepress(currentcolor){
    $("#"+ currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentcolor).removeClass("pressed");
    },200);
}
$(".btn").click(function(){
    var idofpressed=$(this).attr("id")
    playsound(idofpressed);
    animatepress(idofpressed);
    userclickedpattern.push(idofpressed);
    
    console.log(userclickedpattern);
    checkanswer(userclickedpattern.length-1);


})
function playsound(currentcolor){
    var audio= new Audio("sounds/"+currentcolor+".mp3");
    audio.play();
}
function nextsequence() {
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = gamecolors[randomNumber];
    gamepattern.push(randomChosenColour);
    console.log(gamepattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
  }
function checkanswer(currentcolor){
    if(gamepattern[currentcolor]===userclickedpattern[currentcolor]){
        console.log("success");
        if(gamepattern.length==userclickedpattern.length){
            setTimeout(function(){
                nextsequence();
                
            },1000);
        }
    } else{
        playsound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over! Press any key to restart!");
        startover();
    }
}
function startover(){
    started=false;
    
    gamepattern=[];
    level=0;
}