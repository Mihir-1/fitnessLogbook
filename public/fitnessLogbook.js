/**
 * Mihir Joshi
 * Javascript
 */
"use strict";
(function() {

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let daysFromPresent = 0;

  window.addEventListener("load", init);

  function init() {
    dateToday();
    id("prevDayBtn").addEventListener("click", updateDate);
    id("nextDayBtn").addEventListener("click", updateDate);
    id("addWorkoutBtn").addEventListener("click", showAddWorkoutMenu);
  }

  function showAddWorkoutMenu() {
    id("addWorkoutMenu").classList.remove("hidden");
    id("nameWorkoutBtn").addEventListener("click", hideAddWorkoutMenu);
  }

  function hideAddWorkoutMenu() {
    //console.log(id("workoutInput").value);
    id("addWorkoutBtn").textContent = id("workoutInput").value;
    id("workoutInput").value = "";
    id("addWorkoutMenu").classList.add("hidden");
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

  function dateToday() {
    daysFromPresent = 0;
    setDate();
  }

  function setDate() {
    let d = new Date();
    d.setDate(d.getDate() + daysFromPresent);
    id("day").textContent = DAYS[d.getDay()];
    id("date").textContent = MONTHS[d.getMonth()] + " " + (d.getDate());
  }

  
  /**
   * Generates a new element with given tag name
   * @param {String} tagName DOM name of tag
   * @returns {Object} DOM Element
   */
   function gen(tagName) {
    return document.createElement(tagName);
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