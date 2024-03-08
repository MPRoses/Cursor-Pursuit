import React, { useState, useEffect } from 'react';
import './App.css';
import $, { event } from 'jquery';
import sun from './sun.png';
import moon from './moon.png';
import settings from './settings.png';
import settingsFull from './settingsFull.png';

function App() {

  $(() => {

    //preloader
    $(".darkmode-container, .settings").css("opacity", "1");
    setTimeout(() => {
      $(".darkmode-container, #darkmode-switch").css("pointer-events", "all");
    }, 2200);
    

    //darkmode
    if (localStorage.getItem("darkmode")) {
      $("body").css("background-color", "#0a0b1d");
      $("#darkmode-switch").prop("checked", true);
    }

    $("#darkmode-switch").on("change", () => {
      if ($("#darkmode-switch").is(":checked")) {
        $(".settings-bg").css(".background-color", "rgba(158, 128, 204, 0.795)");
        $(".settings-wheel").css("filter", "invert(1)");
        $("body").css("background-color", "#0a0b1d");
        localStorage.setItem("darkmode", "true");
      } else {
        $(".settings-bg").css(".background-color", "rgba(221, 201, 255, 0.493)");
        $(".settings-wheel").css("filter", "invert(0)");
        $("body").css("background-color", "white");
        localStorage.removeItem("darkmode");
      }
    });

    //settings
    $(".settings-wheel").on("click", () => {
      if ($(".settings").hasClass("active")) {
        //settings-icon
        $(".settings-wheel-fill").css("opacity", "0");
        $(".settings").removeClass("active");
        $(".settings-wheel").css("transform", "rotate(0deg)");
        //main
        $(".settings-bg").css("left", "100vw");
      } else {
        //settings-icon
        $(".settings-wheel-fill").css("opacity", ".2");
        $(".settings").addClass("active");
        $(".settings-wheel").css("transform", "rotate(27deg)");
        //main
        $(".settings-bg").css("left", "0");
      }
    });

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
      <div className="settings-bg"></div>
      <img alt="settings" className="settings-wheel" src={settings}/>
      <img alt="settings wheel filled" className="settings-wheel settings-wheel-fill" src={settingsFull}/>
    </div>


    </div>
  );
}

export default App;
