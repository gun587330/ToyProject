import TodoController from "./controller/TodoController.js";

const addBtn = document.getElementById("input-button");
const input = document.querySelector("input");

const allCompleteBtn = document.getElementById("all-complete-button");

addBtn.addEventListener("click", () => {
    const todoController = new TodoController(input.value);
    todoController.addTodo();
});

allCompleteBtn.addEventListener("click", () => {
    const todoController = new TodoController(input.value);
    todoController.allComplete();
});