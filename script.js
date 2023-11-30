
// Setting things up ///////////////////////////////////////////////////////
// Selecting elements
const inputBox = document.getElementById("todoInput");
const addButton = document.querySelector(".btn");
const todoList = document.getElementById("todoList");
const todoCount = document.querySelector(".todoCount span");
const doneCount = document.querySelector(".doneCount span");
const clearButton = document.querySelector(".clearBtn");

// Event listener for the add button
addButton.addEventListener("click", function(e){
  e.preventDefault();
  addTask();
});

// Event listener for the input box (pressing Enter)
inputBox.addEventListener("keypress", function(e){
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

// Event for checkbox and delete button
todoList.addEventListener("click", function(e){
  const target = e.target;

  // Check if the clicked element is a checkbox
  if (target.type === "checkbox"){
    toggleTaskStatus(target);
  }

  // Check if the clicked element is the delete button
  if (target.classList.contains("deleteTask")){
    deleteTask(target.parentElement);
  }
});

// Event listener for the clear button
clearButton.addEventListener("click", function(){
  clearAllTasks();
});

// Function to add a new task //////////////////////////////////////////////
function addTask(){
  const taskText = inputBox.value;
  if (taskText !== ""){
    // Create elements
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskTextSpan = document.createElement("span");
    const deleteButton = document.createElement("button");

    // Set attributes and content
    checkbox.type = "checkbox";
    taskTextSpan.textContent = taskText;
    deleteButton.textContent = "\u00d7";
    deleteButton.classList.add("deleteTask");

    // Append elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(deleteButton);

    // Append the list item to the todo list
    todoList.prepend(listItem);

    inputBox.value = "";
    
    updateTaskCount();
    saveList();
  }else{
    alert("                       ▓▓██\n                    ▓▓▓▓  ▓▓██▓▓▓▓\n               ▓▓████▓▓▓▓▓▓████▓▓\n             ██    ██▓▓██    ██\n                   ██▓▓██\n                         ██░░▓▓██\n                     ██▓▓░░░░▓▓██\n                 ██░░░░░░░░░░░░██\n             ██▒▒░░░░░░░░░░░░▒▒██\n         ██░░░░░░░░░░░░░░░░░░░░██\n     ██▒▒░░░░░░░░░░░░░░░░░░░░▒▒██\n   ██░░░░░░████░░░░████░░░░░░██\n   ██░░░░░░████░░░░████░░░░░░██\n   ██░░░░░░░░░░░░░░░░░░░░░░░░██\n   ██▒▒░░░░░░░░░░░░░░░░░░░░▒▒██\n     ██▒▒░░░░░░░░░░░░░░░░▒▒██\n         ████████████████████  \n\nOOPS! (ㅠ﹏ㅠ)\nThis onion's already been peeled!\nPlease enter a task to peel away at!");
    }
}

// Function to toggle the status of a task (checked or unchecked) //////////
function toggleTaskStatus(checkbox){
  const listItem = checkbox.parentElement;
  listItem.classList.toggle("completed");

  if (listItem.classList.contains("completed")){
    todoList.appendChild(listItem);
  }else{
    todoList.prepend(listItem, todoList.firstChild);
  }

  updateTaskCount();
  saveCheckbox();
  saveList();
}

// Following two functions are for keeping track of checkbox states when
// refreshing page. 
// Function to save checkboxes ////////////////////////////////////////////
// Used ChatGPT for this function
function saveCheckbox(){
  const checkboxStates = Array.from(todoList.querySelectorAll('input[type="checkbox"]')).map(checkbox => checkbox.checked);
  localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
  saveList();
}

// Function to load checkbox states on reload /////////////////////////////
// Used ChatGPT for this function
function LoadCheckbox(){
  const checkboxStates = JSON.parse(localStorage.getItem("checkboxStates")) || [];
  const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = checkboxStates[index] || false;
    if (checkboxStates[index]) {
      const listItem = checkbox.parentElement;
      listItem.classList.add("completed");
      todoList.appendChild(listItem);
    }
  });
}

// Function to delete a task //////////////////////////////////////////////
function deleteTask(listItem){
  listItem.remove();
  updateTaskCount();
}

// Function to clear all tasks ////////////////////////////////////////////
function clearAllTasks(){
  todoList.innerHTML = "";
  updateTaskCount();
}

// Function to update task count //////////////////////////////////////////
function updateTaskCount(){
  const totalTasks = todoList.children.length;
  const completedTasks = document.querySelectorAll(".completed").length;

  todoCount.textContent = totalTasks - completedTasks;
  doneCount.textContent = completedTasks;

  const noTaskIamge = document.getElementById("initial");
  if (totalTasks === 0){
    noTaskIamge.style.display = "block";
  }else{
    noTaskIamge.style.display = "none";
  }
}

// Function for memory ////////////////////////////////////////////////////
 function saveList(){
  localStorage.setItem("todoList", todoList.innerHTML);
}

function loadList(){
  todoList.innerHTML = localStorage.getItem("todoList");

  LoadCheckbox();
  updateTaskCount();
}


// Loading and saving for page startup and close //////////////////////////
// Load the list from memory
loadList();

// Save the list to memory when the window is closed
window.addEventListener("beforeunload", function(){
  saveList();
}); 

 