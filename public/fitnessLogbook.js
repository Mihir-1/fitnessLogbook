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
    id("nameWorkoutBtn").addEventListener("click", nameWorkout);
    id("cancelNameWorkoutBtn").addEventListener("click", cancelNameWorkout);

    function nameWorkout() {
      id("addWorkoutBtn").textContent = id("workoutInput").value;
      id("workoutInput").value = "";
      id("addWorkoutMenu").classList.add("hidden");
      id("nameWorkoutBtn").removeEventListener("click", nameWorkout);
      id("cancelNameWorkoutBtn").removeEventListener("click", cancelNameWorkout);
    }

    function cancelNameWorkout() {
      id("workoutInput").value = "";
      id("addWorkoutMenu").classList.add("hidden");
      id("cancelNameWorkoutBtn").removeEventListener("click", cancelNameWorkout);
      id("nameWorkoutBtn").removeEventListener("click", nameWorkout);
    }
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

    function addNewExercise() {
      let exerciseName = id("exerciseInput").value;
      let li = gen("li");
      let exercise = gen("button");
      exercise.textContent = exerciseName;
      exercise.classList.add("exercise");
  
      let setBtn = gen("button");
      setBtn.textContent = "+ Set";
      setBtn.addEventListener("click", newSet)
  
      let ol = gen("ol");
  
      li.appendChild(exercise);
      li.appendChild(ol);
      li.appendChild(setBtn);
      id("exerciseList").appendChild(li);
      id("exerciseInput").value = "";
      id("addExerciseMenu").classList.add("hidden");
      id("addExerciseBtn").removeEventListener("click", addNewExercise);
    }
  }

  function newSet() {
    let setList = this.previousSibling;
    id("addSetMenu").classList.remove("hidden");
    id("addSetBtn").addEventListener("click", addNewSet);

    function addNewSet() {
      let curSet = gen("li");
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
      curSet.insertBefore(notesSpan, curSet.firstChild);
      curSet.insertBefore(rpeSpan, curSet.firstChild);
      curSet.insertBefore(rpeLabel, curSet.firstChild);
      curSet.insertBefore(weightLabel, curSet.firstChild);
      curSet.insertBefore(weightSpan, curSet.firstChild);
      curSet.insertBefore(repsLabel, curSet.firstChild);
      curSet.insertBefore(repsSpan, curSet.firstChild);
      setList.appendChild(curSet);
      id("repsInput").value = "";
      id("weightInput").value = "";
      id("rpeInput").value = "";
      id("notesInput").value = "";
      id("addSetMenu").classList.add("hidden");
      id("addSetBtn").removeEventListener("click", addNewSet);
      updateDb();
    }
  }

  function updateDb() {
    let wktData = {};
    let d = new Date();
    d.setDate(d.getDate() + daysFromPresent);
    let date = (d.getMonth() + 1) + "-" + (d.getDate() + 1) + "-" + (d.getFullYear());
    wktData.date = date;
    wktData.workout = id("addWorkoutBtn").textContent;
    wktData.exercises = {};
    let exercises = qsa("#exerciseList > li > .exercise");
    for (let i = 0; i < exercises.length; i++) {
      let exercise = exercises[i].textContent;
      wktData.exercises[exercise] = {};
      let sets = exercises[i].nextSibling.querySelectorAll("li");
      for (let j = 0; j < sets.length; j++) {
        let set = sets[j];
        let spans = set.querySelectorAll("span");
        let setN = j + 1;
        let reps = spans[0].textContent;
        let weight = spans[1].textContent;
        let rpe = spans[2].textContent;
        let notes = spans[3].textContent;
        wktData.exercises[exercise][setN] = {};
        wktData.exercises[exercise][setN].weight = weight;
        wktData.exercises[exercise][setN].reps = reps;
        wktData.exercises[exercise][setN].rpe = rpe;
        wktData.exercises[exercise][setN].notes = notes;
      }
    }
    console.log(wktData);
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