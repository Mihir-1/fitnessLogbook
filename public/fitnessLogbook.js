/**
 * Mihir Joshi
 * Javascript
 */
"use strict";
(function() {

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let weightUnits = "lbs"
  let daysFromPresent = 0;

  window.addEventListener("load", init);

  function init() {
    dateToday();
    id("prevDayBtn").addEventListener("click", updateDate);
    id("nextDayBtn").addEventListener("click", updateDate);
    id("addWorkoutBtn").addEventListener("click", addWorkoutMenu);
    id("newExerciseBtn").addEventListener("click", newExercise);
  }

  function addWorkoutMenu() {
    id("addWorkoutMenu").classList.remove("hidden");
    id("cancelNameWorkoutBtn").addEventListener("click", cancelNameWorkout)
    id("nameWorkoutBtn").addEventListener("click", nameWorkout);
  }

  function nameWorkout() {
    id("addWorkoutBtn").textContent = id("workoutInput").value;
    id("workoutInput").value = "";
    id("addWorkoutMenu").classList.add("hidden");
  }

  function cancelNameWorkout() {
    id("workoutInput").value = "";
    id("addWorkoutMenu").classList.add("hidden");
  }

  function newExercise() {
    // Enables add workout button
    if (id("addWorkoutBtn").textContent !== "Add Workout") {
      id("newExerciseBtn").classList.remove("disabled");
    }

    // Name workout required before adding workout
    if (id("newExerciseBtn").classList.contains("disabled")) {
      alert("Name Your Workout");
    } else {
      id("addExerciseMenu").classList.remove("hidden");
      id("addExerciseBtn").addEventListener("click", addNewExercise);
    }
  }

  function addNewExercise() {
    let exerciseName = id("exerciseInput").value;
    let li = gen("li");
    let exercise = gen("button");
    exercise.textContent = exerciseName;
    exercise.classList.add("exercise");
    //exercise.addEventListener("click", renameExercise)

    let setBtn = gen("button");
    setBtn.textContent = "+ Set";
    setBtn.addEventListener("click", newSet)

    let ol = gen("ol");
    let setli = gen("li");

    setli.appendChild(setBtn);
    ol.appendChild(setli);
    li.appendChild(exercise);
    li.appendChild(ol);
    id("exerciseList").appendChild(li);
    id("exerciseInput").value = "";
    id("addExerciseMenu").classList.add("hidden");
  }

  function newSet() {
    let setList = this.parentNode;
    //console.log(setList);
    id("addSetMenu").classList.remove("hidden");
    id("addSetBtn").addEventListener("click", addNewSet);

    function addNewSet() {
      let repsLabel = gen("label");
      repsLabel.textContent = "reps";
      let repsSpan = gen("span");
      repsSpan.textContent = id("repsInput").value;
      let weightLabel = gen("label");
      weightLabel.textContent = weightUnits;
      let weightSpan = gen("span");
      weightSpan.textContent = id("weightInput").value;
      let rpeLabel = gen("label");
      rpeLabel.textContent = "RPE:"
      let rpeSpan = gen("span");
      rpeSpan.textContent = id("rpeInput").value;
      let notesSpan = gen("span");
      notesSpan.textContent = id("notesInput").value;

      setList.insertBefore(notesSpan, setList.firstChild);
      setList.insertBefore(rpeLabel, setList.firstChild);
      setList.insertBefore(rpeSpan, setList.firstChild);
      setList.insertBefore(weightSpan, setList.firstChild);
      setList.insertBefore(weightLabel, setList.firstChild);
      setList.insertBefore(repsSpan, setList.firstChild);
      setList.insertBefore(repsLabel, setList.firstChild);

      console.log(setList);
    }
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
   * Shortcut function for querySelector and returns dom element
   * @param {Setring} selector selector for dom element
   * @returns {Object} DOM Element
   */
   function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Shortcut function for querySelectorAll and returns dom element array
   * @param {String} selector selector for dom element
   * @returns {Array} DOM Element array
   */
   function qsa(selector) {
    return document.querySelectorAll(selector);
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