import Todo from "../DOM/Todo.js";
import CompleteController from "./CompleteController.js";

class TodoController {
    constructor(todoText){
        this.newTodo = new Todo(todoText);

        this.delBtnNode = this.newTodo.getDelBtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        this.innerNode = this.newTodo.getInnerText();

        this.delBtnNode.addEventListener("click", () => {
            this.delTodo();
        });

        this.comBtnNode.addEventListener('click', () => {
            this.doneTodo();
        });
    }
    allComplete(){
        const todoList = document.getElementById("to-do-list");
        todoList.querySelectorAll('.row').forEach((row) => {
            const textBox = row.querySelector('.text-box');
            this.newCompleteTodo = new CompleteController(textBox.innerText);
            this.newCompleteTodo.addTodo();
            todoList.removeChild(row);
        });
    }
    delTodo() {
        const todoList = document.getElementById("to-do-list");
        todoList.removeChild(this.newTodo.getRow());
    }

    addTodo(){
        // to-do-list 아이디를 가진 dom을 todoList에 할당
        const todoList = document.getElementById("to-do-list");
        // 새롭게생성한녀석을 todoList에 추가(addRow를 통해)
        todoList.appendChild(this.newTodo.addRow());
        //document.querySelector("input") => input에 해당하는 첫 번째 DOM 요소 하나 선택
        const input = document.querySelector("input");
        input.value = "";
    }

    doneTodo() {
        // 초기화 관련해서 궁금증: 왜 const 선언은 안되는가? => class 내부여서?? 해결 필요
        this.newCompleteController = new CompleteController(this.innerNode.innerText);
        this.newCompleteController.addTodo();

        // // todoList에서 삭제
        const todoList = document.getElementById("to-do-list");
        todoList.removeChild(this.newTodo.getRow());

        // toggle() => 클래스가 없으면 추가, 있으면 제거(on/off스위치)
        this.innerNode.classList.toggle("done-text");
        this.comBtnNode.classList.toggle("done-btn");

        if (this.comBtnNode.innerText === "미완") {
            this.comBtnNode.innerText = "완료";

        } else {
            this.comBtnNode.innerText = "미완";
        }
    }
}

export default TodoController;