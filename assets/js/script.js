// Retrieve tasks and nextId from localStorage and uses the or operator to set  taskList to an empty array and nextId to 1 if the local storage is empty
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;


// Todo: create a function to generate a unique task id
function generateTaskId() {
  // Increases the value of nextId by one
  nextId++
  // Uptdates the local storage to the new value
  localStorage.setItem('nextId',nextId);
  // Returns the value of nextId in a string form to ensure consistency in data type when dealing with localStorage
  return nextId.toString()
}

// Todo: create a function to create a task card
function createTaskCard(task) {
// Creates a div using jquery
  const taskCard = $('<div>')
  // Adds the Bootstrap card class to make it a flexible container, the task-class for css, the draggable class for the draggable method and Bootstrap margin in the y axis 
  .addClass('card task-card draggable my-3')
  // Sets the card id
  .attr('data-task-id', task.id);
  // Creates a div with the Bootstrap classes card-header and h4 to be applied to the text that would be the current task title
const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
// Creates a div with the class card-body that is the common bootstrap class to contain the primary contents of a card
const cardBody = $('<div>').addClass('card-body');
//  Creates a p element containing the value of the current task description
const cardDescription = $('<p>').addClass('card-text').text(task.Description);
// Creates another p element with the value of the current dueDate
const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
// Creates a button with Bootstrap btn class and btn-danger makes it red, text saying delete and assigns it the id of the current task
const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger')
  .text('Delete')
  .attr('data-task-id', task.id);
cardDeleteBtn.on('click', handleDeleteTask);

// If the done status is not done applies the following logic
if (task.statusbar !== 'done') {
  // Sets the curent date in now using dayjs 
  const now = dayjs();
  // Sets the due date as days and month in two digits and year in four
  const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

// If now is the same date as the due date adds the classes bg-warning and text-white for a yellow background and withe text
  if (now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
    // If now is after the due date it add the classes bg-danger and text-white for a red background, withe text and changes the border of the delete btn to a light gray color
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
}

// Appends the contents to the body
cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
// Appends the header and body to the main card div
taskCard.append(cardHeader, cardBody);
// Returns the complete task card
return taskCard;
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
