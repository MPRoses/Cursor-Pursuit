import React from 'react';
import './App.css';
import anime from 'animejs';
import $ from 'jquery';
import sun from './sun.png';
import moon from './moon.png';
import start from './start.png';
import settings from './settings.png';
import settingsFull from './settingsFull.png';
import bg from './bg.png';
import bgsettings1 from './bgsettings1.png';
import bgsettings2 from './bgsettings2.png';
import crosshair from './crosshair.png';
import cursor1 from './cursor1.png';
import cursor2 from './cursor2.png';

import cursor_1 from './cursor_1.png';
import cursor_2 from './cursor_2.png';
import cursor_3 from './cursor_3.png';
import cursor_4 from './cursor_4.png';
import cursor_5 from './cursor_5.png';

import ball_1 from './ball_1.png';
import ball_2 from './ball_2.png';
import ball_3 from './ball_3.png';
import ball_4 from './ball_4.png';
import ball_5 from './ball_5.png';

import MESSAGE_1 from './MESSAGE_1.png';
import MESSAGE_2 from './MESSAGE_2.png';
import MESSAGE_3 from './MESSAGE_3.png';
import MESSAGE_4 from './MESSAGE_4.png';
import MESSAGE_5 from './MESSAGE_5.png';
import MESSAGE_6 from './MESSAGE_6.png';

import github from './github.png'

import orb from './orb.png';
import orb2 from './orb2.png';
import orb3 from './orb3.png';
import orb4 from './orb4.png';
import orb5 from './orb5.png';

function App() {

  $(() => {
    
    // highscore
    if (!localStorage.getItem("highscore")) {
      localStorage.setItem("highscore", "");
      $(".scoreboard p").css("opacity", "0");
    } else {
      $(".scoreboard p").eq(0).text(`HIGHSCORE: ${localStorage.getItem("highscore")}`);
      $(".scoreboard p").eq(0).css("opacity", "1");
    }
    //cursor
    var cursorDisabled = false;

    if (localStorage.getItem("cursor")) {
      $(".circle-item-right").removeClass("circle-item-active");
      $(".circle-item-right").eq(localStorage.getItem("cursor")).addClass("circle-item-active");

      changeCursor(localStorage.getItem("cursor"));
      $("html").attr("style", "cursor: none !important");
      cursorDisabled = true;
    }

    //ball
    if (localStorage.getItem("ball")) {
      $(".circle-item-left").removeClass("circle-item-active");
      $(".circle-item-left").eq(localStorage.getItem("ball")).addClass("circle-item-active");
      changeBall(localStorage.getItem("ball"));
    }

    //difficulty
    var difficultyIndex = 0;

    if (!localStorage.getItem("difficulty")) {
      localStorage.setItem("difficulty", "easy");
      $(".option-easy").addClass("option-selected");
      difficultyIndex = 1;
    } else {
      $(".option").removeClass("option-selected");
      if (localStorage.getItem("difficulty") === "less easy") {
        difficultyIndex = 2;
        $(".option-medium").addClass("option-selected");
      } else if (localStorage.getItem("difficulty") === "kinda hard") {
        difficultyIndex = 3;
        $(".option-hard").addClass("option-selected");
      } else if (localStorage.getItem("difficulty") === "why are we here") {
        difficultyIndex = 4;
        $(".option-help").addClass("option-selected");
      } else {
        difficultyIndex = 1;
        $(".option-easy").addClass("option-selected");
      }
    } 

    // easy to hard
    var diff1 = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.25];
    var diff2 = [2, 3, 4, 4.5, 5, 5.5, 6.5, 7.25, 7.75, 8];
    var diff3 = [5, 6, 7, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5];
    var diff4 = [8, 9, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5];

    var currentDiff;
    var iterations = 0;
    var movingSpeedOfCrosshair;
    var speedOfWhichOrbsSpawn;

    function changeDiff(difficultyIndex) {
      switch(difficultyIndex) {
        case 2:
          currentDiff = diff2;
          break;
        case 3:
          currentDiff = diff3;
            break;
        case 4:
          currentDiff = diff4;
          break;
        default:
          currentDiff = diff1;
      }

      if (iterations < 10) {
        // 1-10 -> 1 / ((here) * 3) with 10 being harder than 1
        movingSpeedOfCrosshair = 1 / ((currentDiff[Math.floor(iterations / 2)]) * 3);
        // 1-10 -> (1000 / (here)) with 10 being harder than 1
        speedOfWhichOrbsSpawn = 100 + (1000 / (currentDiff[Math.floor(iterations / 2)]));
      } else {

        if  (movingSpeedOfCrosshair > 0.02) {
            movingSpeedOfCrosshair -= .01;
        }

        if (speedOfWhichOrbsSpawn > 100) {
          speedOfWhichOrbsSpawn -= 20;
        }
      }

    }

    changeDiff(difficultyIndex);

    //preloader
    $(".darkmode-container, .settings, .bg-container, .title").css("opacity", "1");
    $(".made-by-github").css("opacity", "0.2");
    setTimeout(function() {
      $(".darkmode-container, #darkmode-switch").css("pointer-events", "all");
      $(".word-top .title-jump").css("clip-path", "polygon(0 0, 100% 0, 100% 100%, 0 100%)");
      setTimeout(() => {
        $(".word-bottom .title-jump").css("clip-path", "polygon(0 0, 100% 0, 100% 100%, 0 100%)");
      }, 500);
      setTimeout(() => {
        $(".start-button").css("opacity", "1");
      }, 2000);
    }, 2200);

    // github made by
    $(".made-by-github").on("click", () => {
      window.open('https://www.github.com/MPRoses', '_blank');
    })
    

    //darkmode
    if (localStorage.getItem("darkmode")) {
      $("body").css("background-color", "#0a0b1d");
      $(".indicator-seperator").css("background-color", "white");
      $(".game-indicator").css("border", "1px solid white");
      $(".game-indicator p").css("color", "white");
      $(".settings-wheel, .start-button, .orb, .made-by-github").css("filter", "invert(1)");
      $("#darkmode-switch").prop("checked", true);
      $(".title").css("color", "white");
      $(".scoreboard p").css("color", "white");
      if (localStorage.getItem("cursor") === "2") {
        $(".custom-cursor").css("filter", "invert(1)");
      }
    }

    $("#darkmode-switch").on("change", function() {
      if ($("#darkmode-switch").is(":checked")) {
        if (localStorage.getItem("cursor") === "2") {
          $(".custom-cursor").css("filter", "invert(1)");
        }
        $(".indicator-seperator").css("background-color", "white");
        $(".game-indicator").css("border", "1px solid white");
        $(".game-indicator p").css("color", "white");
        $(".title").css("color", "white");
        $(".scoreboard p").css("color", "white");
        $(".settings-bg").css(".background-color", "rgba(158, 128, 204, 0.795)");
        $(".settings-wheel, .start-button, .orb, .made-by-github").css("filter", "invert(1)");
        $("body").css("background-color", "#0a0b1d");
        localStorage.setItem("darkmode", "true");
      } else {
        $(".indicator-seperator").css("background-color", "black");
        $(".game-indicator").css("border", "1px solid black");
        $(".game-indicator p").css("color", "black");
        $(".custom-cursor").css("filter", "invert(0)");
        $(".title").css("color", "black");
        $(".scoreboard p").css("color", "black");
        $(".settings-bg").css(".background-color", "rgba(221, 201, 255, 0.493)");
        $(".settings-wheel, .start-button, .orb, .made-by-github").css("filter", "invert(0)");
        $("body").css("background-color", "white");
        localStorage.removeItem("darkmode");
      }
    });

    //disable bg

    if (localStorage.getItem("background")) {
      $("#custom-switch").prop("checked", true);
      $(".bg-container").css("transition", "opacity 1s var(--amazing-cubic)");
      $(".bg-container").css("opacity", "0");
    }

    $("#custom-switch").on("change", function() {
      if ($("#custom-switch").is(":checked")) {
        $(".bg-container").css("transition", "opacity 1s var(--amazing-cubic)");
        $(".bg-container").css("opacity", "0");
        localStorage.setItem("background", "false");
      } else {
        $(".bg-container").css("opacity", "1");
        localStorage.removeItem("background");
      }
    });

    // cursor mode

    if (localStorage.getItem("cursorModeClick")) {
      $("#custom2-switch").prop("checked", true);
    }

    $("#custom2-switch").on("change", function() {
      if ($("#custom2-switch").is(":checked")) {
        localStorage.setItem("cursorModeClick", "true");
      } else {
        localStorage.removeItem("cursorModeClick");
      }
    });

    
    //settings
    $(".settings-wheel").on("click", function() {
      if ($(".settings").hasClass("active")) {
        $(".settings").removeClass("active");
        //settings-icon
        $(".settings-wheel-fill").css("opacity", "0");
        $(".settings-wheel").css("transform", "rotate(0deg)");
        //main
        $(".main").css("opacity", "1");
        $(".settings-bg").css("left", "100vw");
        $(".settings-content, .anime-container").css({
          "opacity": "0",
          "top": "0",
          "pointer-events": "none"
        });
        $(".circle-selector").css("transition", "transform 1s var(--amazing-cubic), filter 1s var(--amazing-cubic)");

        $(".circle-selector").css("transform", "translateX(10vw)");
        $(".selector-left").css("transform", "translateX(-10vw)");
        $(".circle-selector").css("filter", "opacity(0)");
        $(".option").css("transform", "translateY(-200px)");
        $(".circle-item").css("transform", "translateX(5vw)");
        $(".circle-item-left").css("transform", "translateX(-5vw)");



        $(".custom-container").attr("style", "transition: opacity .5s cubic-bezier(.2,.9,.45,1), bottom 1s cubic-bezier(.2,.9,.45,1) .3s; opacity: 0; pointer-events: none; bottom: -3vh");
        $(".custom2-container").attr("style", "transition: opacity .5s cubic-bezier(.2,.9,.45,1), bottom 1s cubic-bezier(.2,.9,.45,1) .3s; opacity: 0; pointer-events: none; bottom: -6vh");
      } else {
        $(".settings").addClass("active");
        //settings-icon
        $(".settings-wheel-fill").css("opacity", ".2");
        $(".settings-wheel").css("transform", "rotate(27deg)");
        //main
        $(".main").css("opacity", "0");
        $(".settings-bg").css("left", "0");
        $(".settings-content, .anime-container").css({
          "opacity": "1",
          "top": "20vh",
          "pointer-events": "all"
        });
        $(".option").css("transform", "translateY(0)");
        $(".circle-selector").css("transition", "transform 1s var(--amazing-cubic) .8s, filter 1s var(--amazing-cubic) .8s");
        $(".circle-selector, .selector-left").css("transform", "translateX(0)");
        $(".circle-selector").css("filter", "opacity(1)");

        setTimeout(() => {
          $(".circle-item-left, .circle-item").css("transform", "translateX(0)")
        }, 800);
        

        $(".custom-container").attr("style", "transition: opacity .5s cubic-bezier(.2,.9,.45,1) 1s, bottom 1s cubic-bezier(.2,.9,.45,1) .5s; opacity: 1 !important; pointer-events: all !important; bottom: calc(6vh + 25px)");
        $(".custom2-container").attr("style", "transition: opacity .5s cubic-bezier(.2,.9,.45,1) 1s, bottom 1s cubic-bezier(.2,.9,.45,1) .5s; opacity: 1 !important; pointer-events: all !important; bottom: calc(12vh + 25px)");
      }
    });

    //bg
    var initialRotationDuration = 4000;
    
    function rotateElement() {
      $(".bg").css({
        "transition-duration": "0ms",
        "transform": `rotate(0deg)`
      });

      setTimeout(function() {
        $(".bg").css({
          "transition-duration": initialRotationDuration + "ms",
          "transform": `rotate(360deg)`
        });
      }, 5);

      setTimeout(rotateElement, initialRotationDuration);
    }
    
    rotateElement();
    
    $(".settings").on("click", function() {
      if ($(".settings").hasClass("active")) {
        $(".bg").css("top", "calc(50vh - 0.5 * 80vw)");
      } else {
        $(".bg").css("top", "0");
      }
    });

    //options
    $(".option").on("click", function() {
      if (activeGame) {
        return;
      }
      $(".option").removeClass("option-selected");
      $(this).addClass("option-selected");
      localStorage.setItem("difficulty", `${$(this).text()}`);
      difficultyIndex = ($(this).index() + 1);
      changeDiff(difficultyIndex);
    });

    $(".circle-item-left").on("click", function() {
      if (activeGame) {
        return;
      }
      $(".circle-item-left").removeClass("circle-item-active");
      $(this).addClass("circle-item-active");
      changeBall($(this).index(".circle-item-left"));
    })

    function changeBall(index) {
      $(".orb-container").empty();

      if (index === 0) {
        if (localStorage.getItem("ball")) {
          localStorage.removeItem("ball");
        }
      } else {
        localStorage.setItem("ball", `${index}`);
      }

      var ball = $(".orb-hold-container").children().eq(index).clone();
      ball.addClass("orb hoverable");
      $(".orb-container").prepend(ball);
    }

    $(".circle-item-right").on("click", function() {
      $(".circle-item-right").removeClass("circle-item-active");
      $(this).addClass("circle-item-active");
      changeCursor($(this).index(".circle-item-right"));
    })

    function changeCursor(index) {
      
      if (index === 0) {
        $("html").attr("style", "cursor: unset !important");
        cursorDisabled = false;
        if (localStorage.getItem("cursor")) {
          localStorage.removeItem("cursor");
        }
      } else {
        $("html").attr("style", "cursor: none !important");
        cursorDisabled = true;
        localStorage.setItem("cursor", `${index}`);
      }
    
      $(".custom-cursor").removeClass("cursor-active");
      $(".custom-cursor").eq(index).addClass("cursor-active");
    }

    let lastExecutionTime = 0;

    function debounce(callback, delay) {
      return function(event) {
        const currentTime = Date.now();
        if (currentTime - lastExecutionTime >= delay) {
          lastExecutionTime = currentTime;
          callback(event);
        }
      };
    }

    var lastMouseX = 0;
    var lastMouseY = 0;
    var angle = 0;
    var isDebounceRunning = false;

    $(window).on("mousemove", (e) => {
      var mouseX = e.clientX;
      var mouseY = e.clientY; 
      var index = localStorage.getItem("cursor");
      if (index === "2") {
        $(".custom-cursor").css("transform", `translate(-50%, -50%) rotate(0deg)`);
      } else if (index !== "3") {
       $(".custom-cursor").css("transform", `rotate(0deg)`);
      }

      if(localStorage.getItem("cursor") === "3" && !isDebounceRunning) {

        isDebounceRunning = true;
        setTimeout(() => {
          isDebounceRunning = false;
        }, 300);


        debounce((e) => {
          var deltaX = mouseX - lastMouseX;
          var deltaY = mouseY - lastMouseY;

          angle = ((Math.atan2(deltaY, deltaX)) * 180 / Math.PI + 360) % 360;

          $(".custom-cursor").css("transform", `rotate(${angle}deg) translate(-50%, -50%)`);

          $(".custom-cursor").css({
            "left": `${mouseX}px`,
            "top": `${mouseY}px`
          });

        }, 300)(e);
      }

      $(".custom-cursor").css({
        "left": `${mouseX}px`,
        "top": `${mouseY}px`
      });
      
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });

    $(".hoverable").on("mouseenter", function() {
      if (!cursorDisabled) {
        $(this).css("cursor", "pointer");
      } else {
        $(this).css("cursor", "none");
      }
    })

    $(".hoverable").on("mouseleave", function() {
      if (!cursorDisabled) {
        $(this).css("cursor", "unset");
      } else {
        $(this).css("cursor", "none");
      }
    })

    $(".defaultcursor").on("mouseenter", function() {
      if (!cursorDisabled) {
        $(this).css("cursor", "default");
      }
    })

    $(".defaultcursor").on("mouseleave", function() {
      if (!cursorDisabled) {
        $(this).css("cursor", "unset");
      }
    })

    var centralGameInterval;

     //start button
     $(".start-button").on(("click"), function() {
      $(".scoreboard p").eq(1).text(`POINTS:`);
      $(".scoreboard p").eq(2).text(`ORBS LOST:`);
      $(".scoreboard p").eq(3).text(`ORBS COLLECTED:`);

      $(".game-indicator").css("left", "3vw");
      $(".game-indicator").css("opacity", "1");

      $(".scoreboard p").css("opacity", "1");

      $(".word").css("transition", "transform 2s var(--amazing-cubic)")
      $(".word").eq(0).css("transform", "translateX(-100vw)");
      $(".word").eq(1).css("transform", "translateX(100vw)");
      $(".start-button").css({
        "transform": "translateY(30vh)",
        "opacity": "0",
        "pointer-events": "none"
      });
       
      totalScore = 0;
      totalWon = 0;
      totalLost = 0;
      avgReactionSpeed = 0;

      flag = true;
      iterations = 0;
      centralGameLoop();
      centralGameInterval = setInterval(centralGameLoop, 15000);
    })
    // message
    function enterMessage(index) {
      var item = $(".message-container").children().eq(index);

      if (index === 5) {
        $(".message-container p").css("opacity", "1");
      } else {
        $(".message-container p").css("opacity", "0");
      }

      item.css("opacity", "1");
      $(".message-container").css("top", "0");

      setTimeout(() => {
        item.css("opacity", "0");
        $(".message-container").css("top", "calc(-20vw - 120px)");
      }, 3300);
    }


    //.game-indicator code (edit, commented out, maybe another time? it felt rather not needed)
    /*
    const $gameIndicator = $('.game-indicator');
    var initialGradient;
    var finalGradient;
  

    function updateGradient(step) {
      if (localStorage.getItem("darkmode")) {
        initialGradient = 'linear-gradient(to bottom, #00000000 49%, #ffffff33 50%, #00000000 ';
      } else {
        initialGradient = 'linear-gradient(to bottom, #ffffff00 49%, #00000033 50%, #ffffff00 ';
      }

      $gameIndicator.css('background', initialGradient + step + "%)");
    }

    function startIndicator() {
      let step = 51;
      var runs = 0;
      const indicatorInterval = setInterval(() => {
        runs++;
        step++;
        if (step >= 99) {
          clearInterval(indicatorInterval);
          if (localStorage.getItem("darkmode")) {
            finalGradient = 'linear-gradient(to bottom, #00000000 49%, #00000033 50%, #00000000 100%)';
          } else {
            finalGradient = 'linear-gradient(to bottom, #ffffff00 49%, #00000033 50%, #ffffff00 100%)';
          }

          $gameIndicator.css('background', finalGradient);
        } else {
          updateGradient(step);
        }
      }, 271);
      var color = localStorage.getItem("darkmode") ? "white" : "black";

      setTimeout(() => {
        $(".game-indicator").css("border", "1px solid green");
        $(".game-seperator").css("background-color", "green");
        setTimeout(() => {
          $(".game-indicator").css("border", "1px solid " + color);
          $(".game-seperator").css("background-color", color);
          setTimeout(() => {
            $(".game-indicator").css("border", "1px solid green");
            $(".game-seperator").css("background-color", "green");
            setTimeout(() => {
              $(".game-indicator").css("border", "1px solid " + color);
              $(".game-seperator").css("background-color", color);
            }, 600);
          }, 300);
        }, 300);
      }, 13000);
    }
    */

    var evadeDisabled = true;
    
    function stopGame() {
      activeGame = false;
    }
    function restartGame() {
      activeGame = true;
      evadeDisabled = true;
      startGame();
    }

    var evadePointIncreaserInterval;
    
    function evadePointIncreaser() {
      totalScore++;
      $(".scoreboard p").eq(1).text(`POINTS: ${totalScore}`);
    }

    function startEvade() {
      evadeDisabled = true;
      $(".evade-ball").css({
        "top": "20px",
        "left": "calc(50vw - 0.5 * 40px)"
      })
      $(".evade-ball").css("transition", "top 1s var(--amazing-cubic), left 1s var(--amazing-cubic)");
      $(".evade-ball").css("display", "block");
      setTimeout(() => {
        evadeDisabled = false;
        updateBallPosition();
        evadePointIncreaserInterval = setInterval(evadePointIncreaser, 500);
        setTimeout(() => {
          clearInterval(evadePointIncreaserInterval);
        }, 14000);
        
        
        var speed = movingSpeedOfCrosshair; //difficulty
        console.log("currentspeed " + speed);
        $(".evade-ball").css("transition", "top " + speed + "s var(--amazing-cubic), left " + speed + "s var(--amazing-cubic)");
      }, 1000);
    }

    $(".evade-ball").on("mouseenter", function() {
      enterMessage(2);

      if (localStorage.getItem("highscore") < totalScore) {
        enterMessage(4);
        localStorage.setItem("highscore", `${totalScore}`);
        $(".scoreboard p").eq(0).text(`HIGHSCORE: ${totalScore}`);
      }

      clearInterval(evadePointIncreaserInterval);
      clearInterval(centralGameInterval);
      resetToStart();
      activeGame = false;
      gameIsLost = false;
      stopEvade();
    })

    function stopEvade() {
      $(".evade-ball").css("transition", "top 1s var(--amazing-cubic), left 1s var(--amazing-cubic)");
      $(".evade-ball").css("display", "none");
    }

    var flag = true;

    function centralGameLoop() {
      if (flag) {
        enterMessage(0);
        stopGame();
        stopEvade();
        restartGame();
      } else {
        enterMessage(1);
        stopGame();
        startEvade();
      }
      flag = !flag;
      
      if (iterations % 2 === 0) {
        changeDiff(difficultyIndex);
        $(".message-container p").text(Math.floor(iterations / 2) + 1);
        setTimeout(() => {
          enterMessage(5);
        }, 4000);
      }
      iterations++;
    }

    //startGame() and game functionality    
    var activeGame = false;
    var gameIsLost = false;
    var totalScore = 0;
    var totalWon = 0;
    var totalLost = 0;
    var avgReactionSpeed = 0;
    var margin = 0;

    function startGame() {
      $(".orb").css("display", "block");
      var orb = $(".orb");
      var tempOrb = orb.clone();
      $(".orb").css("display", "none");
      var AmountOfOrbs = 0;
    
      function gameLoop() {
        if (!activeGame) {
          if (gameIsLost) {
            resetToStart();
          }
          return;
        }
    
        AmountOfOrbs++;
    
        var newOrb = tempOrb.clone();
        newOrb.addClass(`orb_${AmountOfOrbs}`);
        var newPoint = generatePoint();
        newOrb.css({ left: newPoint.left, top: newPoint.top });
    
        if (!localStorage.getItem("darkmode")) {
          newOrb.css("filter", "invert(0)");
        } else {
          newOrb.css("filter", "invert(1)");
        }
    
        $(".orb-container").prepend(newOrb);
        
        var startTime = Date.now();
        var marginOfError = Date.now();
    
        var wasTriggered = false;

        var cursorMode = "";

        if ($("#custom2-switch").is(":checked")) {
          cursorMode = "click";
        } else {
          cursorMode = "mouseenter";
        }

        newOrb.on(cursorMode, function() {
          wasTriggered = true;
          this.remove();
          totalScore++;
          totalWon++;

          var endTime = Date.now();
          var reactionSpeed = endTime - startTime - 200 - margin;
          avgReactionSpeed += reactionSpeed; 

          $(".scoreboard p").eq(1).text(`POINTS: ${totalScore}`);
          $(".scoreboard p").eq(3).text(`ORBS COLLECTED: ${totalWon}`);
          $(".scoreboard p").eq(4).text(`AVG REACTION SPEED: ${Math.round(avgReactionSpeed / (totalWon + totalLost))}ms`);

        });
    
        setTimeout(() => {
          newOrb.css("transform", "scale(0) rotate(360deg)");
          newOrb.css("opacity", "1");
          
          var marginOfErrorExit = Date.now();

          var margin = marginOfErrorExit - marginOfError - 200;

          setTimeout(() => {
            newOrb.off("mouseenter");
            newOrb.remove();
            if (!wasTriggered && activeGame) {
              totalLost++;
              totalScore -= 2;

              var endTime = Date.now();
              var reactionSpeed = endTime - startTime - 200 - margin;
              avgReactionSpeed += reactionSpeed;

              $(".scoreboard p").eq(1).text(`POINTS: ${totalScore}`);
              $(".scoreboard p").eq(2).text(`ORBS LOST: ${totalLost}/5`);
              $(".scoreboard p").eq(4).text(`AVG REACTION SPEED: ${Math.round(avgReactionSpeed / (totalWon + totalLost))}ms`);

              $("body").css("background-color", "red");

              setTimeout(() => {
                if (!localStorage.getItem("darkmode")) {
                  $("body").css("background-color", "white");
                } else {
                  $("body").css("background-color", "#0a0b1d");
                }
              }, 200);


              if (totalLost === 5) { // game is lost
                setTimeout(() => {
                  enterMessage(3);
                }, 4000);


                activeGame = false;
                gameIsLost = false;
                clearInterval(centralGameInterval);
                resetToStart();

                if (localStorage.getItem("highscore") < totalScore) {
                  enterMessage(4);

                  localStorage.setItem("highscore", `${totalScore}`);
                  $(".scoreboard p").eq(0).text(`HIGHSCORE: ${totalScore}`);
                }
                
                $(".orb").off("mouseenter");
              }
            }
          }, 4000);
        }, 200);
        
        console.log("orbs spawn speed" + speedOfWhichOrbsSpawn);
        setTimeout(gameLoop, speedOfWhichOrbsSpawn);//difficulty
      }
    
      // Start the initial game loop
      gameLoop();
    }

    function resetToStart() {
      $(".word").eq(0).css("transform", "");
      $(".word").eq(1).css("transform", "");

      setTimeout(() => {
        if ($(window).width() < 1200) {
          $(".scoreboard p").css("opacity", "0");
          $(".scoreboard p").eq(0).css("opacity", "1");
        }
      }, 500);


      
      $(".game-indicator").css("left", "-15vw");
      $(".game-indicator").css("opacity", "0");

      $(".start-button").css({
        "transform": "",
        "opacity": "1",
        "pointer-events": "all"
      });
      $(".word").css("transition", "transform .73s var(--amazing-cubic)");
      
    }

    function generatePoint() {
      const left = Math.floor(Math.random() * 80) + 10;
      const top = Math.floor(Math.random() * 80) + 10;
 
      return { left: left + "vw", top: top + "vh" }
    }

    //main title jumping animation

    $(".title-jump").on("mouseenter", function() {
      if ($(this).css("animation") === "none 0s ease 0s 1 normal none running" || $(this).css("animation") === "") {
        $(this).css("animation", "jumpItem 1s ease-in-out 1");
        setTimeout(() => {
          $(this).css("animation", "");
        }, 1000);
      }      
    })

    //anime animations
    // settings text
    var textWrapper = document.querySelector('.anime-container');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      
    anime.timeline({loop: true})
      .add({
        targets: '.anime-container .letter',
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
      }).add({
        targets: '.anime-container .letter',
        translateY: [0,-100],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
      });

    // main screen text
    anime.timeline()
      .add({
        duration: 2500
      }).add({
        targets: '.anime-container2 .word',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
      })

    // evade ball
    const orb = $('.evade-ball');

    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position
    $(document).on("mousemove", function(e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    // Update ball position with a delay
    function updateBallPosition() {
      if (evadeDisabled) {
        return;
      }
      
      const currentX = parseFloat(orb.css('left')) || 0;
      const currentY = parseFloat(orb.css('top')) || 0;

      const targetX = mouseX - orb.width() / 2;
      const targetY = mouseY - orb.height() / 2;

      const newX = currentX + (targetX - currentX) * 0.1; // Adjust the factor for smoother movement
      const newY = currentY + (targetY - currentY) * 0.1;
      
      orb.css({ left: `${newX}px`, top: `${newY}px` });
      requestAnimationFrame(updateBallPosition);
    }

  })

    
  return (
    <div className="App">
      <div className="preloader">
        <div className="preloader-circle preloader-circle1"></div>
        <div className="preloader-circle preloader-circle2"></div>
      </div>


    <input type="checkbox" id="darkmode-switch" />
      <div className="darkmode-container">
        <div className="darkmode-body">
          <div className="darkmode-content">
            <label htmlFor="darkmode-switch" className="hoverable">
              <div className="darkmode-toggle"></div>
              <div className="darkmode-labels">
                <img alt="sun" className="darkmode-label-sun" src={sun} />
                <img alt="moon" className="darkmode-label-moon" src={moon} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="custom-switch" /> 
      <div className="custom-container"> 
        <div className="custom-body">
          <div className="custom-content">
            <label htmlFor="custom-switch" className="hoverable">
              <div className="custom-toggle"></div>
              <div className="custom-labels">
                <img alt="sun" className="custom-label-sun" src={bgsettings1} />
                <img alt="moon" className="custom-label-moon" src={bgsettings2} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="custom2-switch" /> 
      <div className="custom2-container"> 
        <div className="custom2-body">
          <div className="custom2-content">
            <label htmlFor="custom2-switch" className="hoverable">
              <div className="custom2-toggle"></div>
              <div className="custom2-labels">
                <img alt="sun" className="custom2-label-sun" src={cursor1} />
                <img alt="moon" className="custom2-label-moon" src={cursor2} />
              </div>
            </label>
          </div>
        </div>
      </div>
     

     <div className="settings-maincontainer">
     <div className="settings">
      <p className="anime-container">difficulty</p>
      <div className="settings-content">
        <div className="option hoverable option-easy option-selected">easy</div>
        <div className="option hoverable option-medium">less easy</div>
        <div className="option hoverable option-hard">kinda hard</div>
        <div className="option hoverable option-help">why are we here</div>
      </div>
      <div className="settings-bg"></div>
      <img alt="settings" className="settings-wheel hoverable" src={settings}/>
      <img alt="settings wheel filled" className="settings-wheel settings-wheel-fill" src={settingsFull}/>
    </div>


    <div className="circle-selector selector-right">
      <div className="circle-item hoverable circle-item-right circle-item-active">
        <img alt="cursor" className="circle-item-cursor" src={cursor_1}/>
      </div>
      <div className="circle-item hoverable circle-item-right ">
        <img alt="cursor" className="circle-item-cursor" src={cursor_2}/>
      </div>
      <div className="circle-item hoverable circle-item-right">
        <img alt="cursor" className="circle-item-cursor" src={cursor_3}/> 
      </div>
      <div className="circle-item hoverable  circle-item-right">
        <img alt="cursor" className="circle-item-cursor" src={cursor_4}/>
      </div>
      <div className="circle-item hoverable circle-item-right">
        <img alt="cursor" className="circle-item-cursor" src={cursor_5}/>
      </div>
    </div>

    <div className="circle-selector selector-left">
      <div className="circle-item hoverable circle-item-left circle-item-active">
        <img alt="ball" className="circle-item-ball" src={ball_1}/>
      </div>
      <div className="circle-item hoverable circle-item-left" >
        <img alt="ball" className="circle-item-ball" src={ball_2}/>
      </div>
      <div className="circle-item hoverable circle-item-left">
        <img alt="ball" className="circle-item-ball small-ball" src={ball_3}/>
      </div>
      <div className="circle-item hoverable circle-item-left" >
        <img alt="ball" className="circle-item-ball small-ball" src={ball_4}/>
      </div>
      <div className="circle-item hoverable circle-item-left">
        <img alt="ball" className="circle-item-ball" src={ball_5}/>
      </div>
    </div>
     </div>

    

    <div className="cursor">
      <img alt="cursor" className="custom-cursor empty-cursor" src={cursor_1} />
      <img alt="cursor" className="custom-cursor" src={cursor_2} />
      <img alt="cursor" className="custom-cursor" src={cursor_3} />
      <img alt="cursor" className="custom-cursor" src={cursor_4} />
      <img alt="cursor" className="custom-cursor" src={cursor_5} />
    </div>

    <div className="bg-container">
      <img alt="blurred circles" className="bg" src={bg}/>
    </div>

    <div className="made-by-github hoverable">
      <img alt="github" src={github} />
    </div>


    <div className="main">
      <div className="title defaultcursor anime-container2">
      <span className="word word-top">
        <div className="title-jump">C</div>
        <div className="title-jump">U</div>
        <div className="title-jump">R</div>
        <div className="title-jump">S</div>
        <div className="title-jump">O</div>
        <div className="title-jump">R</div>
      </span>
      <br></br>
      <span className="word word-bottom">
        <div className="title-jump">P</div>
        <div className="title-jump">U</div>
        <div className="title-jump">R</div>
        <div className="title-jump">S</div>
        <div className="title-jump">U</div>
        <div className="title-jump">I</div>
        <div className="title-jump">T</div>
      </span>
      </div>


      <div className="start-container">
        <img alt="start button" className="start-button hoverable" src={start} />
      </div>

      <div className="game-indicator">
        <div className="indicator-seperator"></div>
        <p>EVADE</p>
        <p>PURSUIT</p>
      </div>

      <div className="evade-ball hoverable">
        <img alt="orb" src={crosshair}/>
      </div>


      <div className="orb-container">
        <img alt="spherical object" className="orb hoverable" src={orb}/>
      </div>

      <div className="orb-hold-container">
        <img alt="spherical object" src={orb}/>
        <img alt="spherical object" src={orb2}/>
        <img alt="spherical object" src={orb3}/>
        <img alt="spherical object" src={orb4}/>
        <img alt="spherical object" src={orb5}/>
      </div>

      <div className="message-container">
        <img alt="message" src={MESSAGE_1}/>
        <img alt="message" src={MESSAGE_2}/>
        <img alt="message" src={MESSAGE_3}/>
        <img alt="message" src={MESSAGE_4}/>
        <img alt="message" src={MESSAGE_5}/>
        <img alt="message" src={MESSAGE_6}/>
        <p>1</p>
      </div>


      <div className="scoreboard">
        <p>HIGHSCORE: </p>
        <br></br>
        <br></br>
        <p>POINTS: </p>
        <br></br>
        <p>ORBS LOST: </p>
        <br></br>
        <p>ORBS COLLECTED: </p>
        <br></br>
        <p>AVG REACTION SPEED: </p>
      </div>
    </div>





  </div>
  );
}

export default App;
