//saving tasks to local storage
const taskInput = document.querySelector('.task-input input');
taskBox= document.querySelector('.task-box');
clearAll = document.querySelector(".clear-btn");



//getting localstorage do list
let editId;
isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));   
// let todos = localStorage.getItem("todo-list");   


function showToDo(){
    let li = "";
    todos.forEach((todo, id) =>{
        console.log(todo.taskName);
        li += `<li class="task">
                <label for="${id}">
                    <input " type="checkbox" id="${id}">
                    <p>${todo.taskName}</p>
                </label>
                <div class="settings">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    <ul class="task-menu">
                        <li><i class="fa fa-edit"></i>Edit</li>
                        <li><i class="fa fa-trash"></i>Delete</li>
                    </ul>
                 </div>
                </li>`;
        
});

taskBox.innerHTML = li;

} showToDo();

//fucntion to clear all tasks in local storage

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {

    let UserTask=taskInput.value.trim();
    if(e.key == "Enter"){
    //getting localstroage todo list 
     if(!todos){ // if todos doesnt exist, pass an empty array
        todos = [];
      }
      //else create an object of todos and push them to the empty array
      taskInput.value = "";
      let taskInfo =
       {
        taskName: UserTask, 
        taskStatus: "pending"
       };
        todos.push(taskInfo); //adding new task to the array
        localStorage.setItem("todo-list", JSON.stringify(todos)); //saving the new task to localstorage;  
        showToDo(); //calling the function to show the tasks
;
    }

 



});