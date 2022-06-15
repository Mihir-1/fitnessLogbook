/**
 * Mihir Joshi
 * Javascript
 */
"use strict";
(function() {

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let daysFromPresent = 0;

  window.addEventListener("load", init);

  function init() {
    dateToday();
    id("prevDayBtn").addEventListener("click", updateDate)
    id("nextDayBtn").addEventListener("click", updateDate)
  }
  
  function dateToday() {
    daysFromPresent = 0;
    setDate();
  }

  function updateDate() {
    console.log(this.id)
    if(this.id === "nextDayBtn") {
      daysFromPresent++;
    } else if (this.id === "prevDayBtn") {
      daysFromPresent--;
    }
    setDate();
  }

  function setDate() {
    let d = new Date();
    d.setDate(d.getDate() + daysFromPresent);
                        // console.log("dfp:" + daysFromPresent);
                        // console.log("date:" + d);
    id("day").textContent = days[d.getDay()];
    id("date").textContent = months[d.getMonth()] + " " + (d.getDate());
  }

  /**
   * DOM object with a given id.
   * @param {String} id id attribute for DOM element
   * @returns {Object} DOM object for a given id
   */
  function id(id) {
    return document.getElementById(id);
  }
})();