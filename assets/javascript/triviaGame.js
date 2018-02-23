/*
  Tech Trivia Game

Optional Homework Assignment  - html, javascript, and jquery game 
              Answer multiple choice tech trivia questions within the time limit per question

Al Curry  February 22, 2018

GWU full stack development program  

this module invoked by index.html 

pseudo code for this module: 

    start game
    display first question and 4 possible answers
    set timer with 15 seconds to answer
    select answer
    declare answer right or wrong
    track score

    while this is not complete, the skeleton is in place
    i plan to move the questions and answers out to a separate file,
     possibly in json format, that would be read in at the start of the game
    and improve the ui

  */

var intervalId;
var timeAllowed = 10;
var time = timeAllowed;
var clockRunning = false;

var questions = [
    "What does the Turing Test test?",
    "When was the first iPhone released ?",
    "What is CLI ?"];
 
var numQuestions = 3;
var answers = [
    ["human intelligence in a computer", 
    "travel stamina",
    "computer processing speed",
    "algorithmic efficiency"],
    ["September 2005",
        "June 2007",
        "June 2006",
        "January 2007"],
    ["Computer Language Interactivity",
        "Short for Client",
        "Command Line Interface",
        "C level internals"],
   
];
    
var correctAnswers = [1, 2, 3];

$(document).ready(function () {
     
    var win = 0, lose = 0;
    var goalScore = 0
    var userScore = 0;
    var qCount = 1;
    var btnValues = [];
    $("#display,#timer,#result").hide();

    console.log(questions);

    for (var i = 0; i < 4; i++) {
        selStr = "#ans" + (i + 1);
        // $(selStr).html(answers[i]);
        $(selStr).hide();
    }

    function start() {
        time = timeAllowed;
        console.log("start" + time);

        $("#countDisplay").html(time);
        if (qCount > numQuestions) {
            gameDone();
        } else {
            if (qCount > 1) {
                // $("#result").html("OK");
                //$("#gameOver").html("Next question");
                //setTimeout(gameBounceIn, 2000);
                setTimeout(function(){
                    $("#gameOver").html("Next question");
                    gameBounceIn();
                  }, 3000);
                setTimeout(showQuestion, 4000);
            } else {
                showQuestion();
            }
            $("#start").hide();
        }
    }
 
    function showQuestion() {
        // $("#outArea1").hide();
        $("#outArea1").css("background-color", "#00AEFF");
        $("#outArea1").css("border", "none");
        $("#timer").show();
        $("#qNum").html(qCount + ".");
        $("#qNum").show();
        $("#qText").html(questions[qCount - 1]);
        $("#qText").show();
        for (var i = 0; i < 4; i++) {
            selStr = "#ans" + (i + 1);
            $("#result").empty();
            $(selStr).html(answers[qCount - 1][i]);
            $(selStr).show();
        }
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }
    
    function stop() {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        console.log("STOP");
        clearInterval(intervalId);
        clockRunning = false;
        setTimeout(function(){
            $("#gameOver").html("Time has run out");
            gameBounceIn();
          }, 1000);

        nextQuestion();
    }

    function count() {

        time--;
    
        var converted = timeConverter(time);
        console.log(converted);

        $("#countDisplay").text(converted);

        if (time === 0) {
            stop();
        }
    }
    
    function timeConverter(t) {
    
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
    
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return seconds;
    }
    
    function nextQuestion() {
        console.log("nextQuest");
 
        qCount++;
        if (qCount <= numQuestions) {
            // reset();
            start();
        } else {
            gameDone();
        }

    }

    function gameDone() {
        clearInterval(intervalId);
        console.log("gameDone");
        setTimeout(function(){
            $("#gameOver").html("Game Over");
            gameBounceIn();
          }, 2000);
        $("#countDisplay").text("00");
    }

    function checkAnswer(value) {
        var resultStr = "";
        console.log("in check Answer function selected " + value);
        $(".answer").hide();
        $("#outArea1").show();
        $("#outArea1").css("background-color", "#A3F56D");
        $("#outArea1").css("border", "1px solid black");
        if (correctAnswers[qCount - 1] === value) {
            resultStr = "CORRECT";
        } else {
            resultStr = "WRONG";
        }
        $("#result").html(resultStr);
        $("#result").show();

        console.log(resultStr);
        clearInterval(intervalId);
        qCount++;
        clockRunning = false;

        // reset();
        start();
    }


    
    // $("#reset").on("click", reset());
    // var inputBtn = $(this).attr("value"); 
    $("#start").click(function () {
        console.log("start button clicked");
        start();
    });
    $("#stop").click(function () {
        console.log("stop button clicked");
        stop();
    });
    $("#reset").click(function () {
        console.log("reset");
        reset();
    });
    $(".answer").click(function () {
        console.log("answer clicked");
        var answer = $(this).attr("id");
        var ansValue = parseInt(answer.substr(3, 1));
        console.log(" answer selected was " + ansValue);
        checkAnswer(ansValue);
    });

});

    var animationend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd MSanimationEnd';
    $(window).on("load", function () {
        $("#hdr").addClass("animated bounceInRight").one(animationend, function () {
            $(this).removeClass("animated bounceInRight");
        });
    });
    $(window).on("load", function () {
        gameBounceIn();
    });
  
    $("#start").on('click', function () {
        hdrFadeDown();
    });

    $("#start").on('click', function () {
        gameFadeUp();
    });

    function gameBounceIn() {
        $("#gameOver").addClass("animated bounceInLeft").one(animationend, function () {
            $(this).removeClass("animated bounceInLeft");
        });
    }
    function gameFadeUp() {
        $("#gameOver").addClass("animated fadeInUp").one(animationend, function () {
            $(this).removeClass("animated fadeInUp");
        });
    }
    function hdrFadeDown() {
        $("#hdr").addClass("animated fadeInDown").one(animationend, function () {
            $(this).removeClass("animated fadeInDown");
        });
    }
 
  


  
