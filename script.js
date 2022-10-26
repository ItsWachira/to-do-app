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
    if(todos){
        let isCompleted  = todos.status == "completed" ? "checked" : "";
        todos.forEach((todo, id) =>{
            console.log(todo.taskName);
            li += `<li class="task">
                    <label for="${id}">
                        <input onClick = "updataStatus(this)"  type="checkbox" id="${id}"  ${isCompleted}>
                        <p class= "${isCompleted}"> ${todo.taskName}</p>
                    </label>
                    <div class="settings">
                    <i onClick="showMenu(this)" class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        <ul class="task-menu">
                            <li><i class="fa fa-edit"></i>Edit</li>
                            <li><i onClick = "updataStatus(this)" class="fa fa-trash"></i>Delete</li>
                        </ul>
                     </div>
                    </li>`;
            
    });
    }


taskBox.innerHTML = li;

} showToDo();

//function to show settings menu
function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        //remving the show class from the task menu on 
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }


    });
}

//function to update the status of a task
function updataStatus(selectedTask){
    let task = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        task.classList.add("checked");
        todos[selectedTask.id].status = "completed"; // if task checked then set the status to completed in the todos array
    }else{  
        task.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    
    localStorage.setItem("todo-list", JSON.stringify(todos)); 
}
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
        status: "pending"
       };
        todos.push(taskInfo); //adding new task to the array
        localStorage.setItem("todo-list", JSON.stringify(todos)); //saving the new task to localstorage;  
        showToDo(); //calling the function to show the tasks
;
    }

 



});