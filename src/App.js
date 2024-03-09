import React from 'react';
import './App.css';
import anime from 'animejs';
import $ from 'jquery';
import sun from './sun.png';
import moon from './moon.png';
import settings from './settings.png';
import settingsFull from './settingsFull.png';
import bg from './bg.png';

function App() {

  $(() => {

    //difficulty
    if (!localStorage.getItem("difficulty")) {
      localStorage.setItem("difficulty", "easy");
      $(".option-easy").addClass("option-selected");
    } else {
      $(".option").removeClass("option-selected");
      if (localStorage.getItem("difficulty") === "less easy") {
        $(".option-medium").addClass("option-selected");
      } else if (localStorage.getItem("difficulty") === "kinda hard") {
        $(".option-hard").addClass("option-selected");
      } else if (localStorage.getItem("difficulty") === "why are we here") {
        $(".option-help").addClass("option-selected");
      } else {
        $(".option-easy").addClass("option-selected");
      }
    }

    //preloader
    $(".darkmode-container, .settings, .bg-container, .title").css("opacity", "1");
    setTimeout(function() {
      $(".darkmode-container, #darkmode-switch").css("pointer-events", "all");
    }, 2200);
    

    //darkmode
    if (localStorage.getItem("darkmode")) {
      $("body").css("background-color", "#0a0b1d");
      $(".settings-wheel").css("filter", "invert(1)");
      $("#darkmode-switch").prop("checked", true);
      $(".title").css("color", "white");
    }

    $("#darkmode-switch").on("change", function() {
      if ($("#darkmode-switch").is(":checked")) {
        $(".title").css("color", "white");
        $(".settings-bg").css(".background-color", "rgba(158, 128, 204, 0.795)");
        $(".settings-wheel").css("filter", "invert(1)");
        $("body").css("background-color", "#0a0b1d");
        localStorage.setItem("darkmode", "true");
      } else {
        $(".title").css("color", "black");
        $(".settings-bg").css(".background-color", "rgba(221, 201, 255, 0.493)");
        $(".settings-wheel").css("filter", "invert(0)");
        $("body").css("background-color", "white");
        localStorage.removeItem("darkmode");
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
        $(".option").css("transform", "translateY(-200px)");
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
      $(".option").removeClass("option-selected");
      $(this).addClass("option-selected");

      localStorage.setItem("difficulty", `${$(this).text()}`)
    })

    //main title jumping animation
    $(".title-jump").on("mouseenter", function() {
      $(this).css("animation", "jumpItem 1s ease-in-out 1");
      setTimeout(() => {
        $(this).css("animation", "");
      }, 1000);
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
            <label htmlFor="darkmode-switch">
              <div className="darkmode-toggle"></div>
              <div className="darkmode-labels">
                <img alt="sun" className="darkmode-label-sun" src={sun}/>
                <img alt="moon" className="darkmode-label-moon" src={moon}/>
              </div>
            </label>
          </div>
        </div>
    </div>

    <div className="settings">
      <p className="anime-container">difficulty</p>
      <div className="settings-content">
        <div className="option option-easy option-selected">easy</div>
        <div className="option option-medium">less easy</div>
        <div className="option option-hard">kinda hard</div>
        <div className="option option-help">why are we here</div>
      </div>
      <div className="settings-bg"></div>
      <img alt="settings" className="settings-wheel" src={settings}/>
      <img alt="settings wheel filled" className="settings-wheel settings-wheel-fill" src={settingsFull}/>
    </div>

    <div className="bg-container">
      <img alt="blurred circles" className="bg" src={bg}/>
    </div>


    <div className="main">
      <div className="title anime-container2">
      <span className="word">
        <div className="title-jump">C</div>
        <div className="title-jump">U</div>
        <div className="title-jump">R</div>
        <div className="title-jump">S</div>
        <div className="title-jump">O</div>
        <div className="title-jump">R</div>
      </span>
      <br></br>
      <span className="word">
        <div className="title-jump">P</div>
        <div className="title-jump">U</div>
        <div className="title-jump">R</div>
        <div className="title-jump">S</div>
        <div className="title-jump">U</div>
        <div className="title-jump">I</div>
        <div className="title-jump">T</div>
      </span>
      </div>
    </div>
  </div>
  );
}

export default App;
