// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  // If no id is retrieved from local storage it initialize a counter from 1
  if(!nextId){
    localStorage.setItem('nextId', '1')
  };
  // Turns the nextId into a number and stores it in the counter variable
  let counter = parseInt(localStorage.getItem('nextId'));
  // turns the value of the counter variable into a string and stores it in the id variable
  const id = counter.toString();
  // Sets the local storage item "netId" to the value of counter plus one and sets it back into a string 
  localStorage.setItem('nextId', (counter + 1).toString());
  // returns the value of the id 
  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  //Render task list when the page loads
  renderTaskList();

  // Presents a caledar to pick the date
  $('#TaskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });

  // Makes lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  })
});
