import Complete from "../DOM/Complete.js";
import TodoController from "./TodoController.js";

class CompleteController {
    constructor(completeText){
        this.newCompleteTodo = new Complete(completeText);

        this.delBtnNode = this.newCompleteTodo.getDelBtn();
        this.restoreBtnNode = this.newCompleteTodo.getRestoreBtn();
        this.innerNode = this.newCompleteTodo.getInnerText();

        this.delBtnNode.addEventListener("click", () => {
            this.delTodo();
        });

        this.restoreBtnNode.addEventListener('click', () => {
            this.restoreTodo();
        });
    }

    delTodo() {
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newCompleteTodo.getRow());
    }

    addTodo(){
        // complete-list 아이디를 가진 dom을 todoList에 할당
        const completeList = document.getElementById("complete-list");
        // 새롭게생성한녀석을 todoList에 추가(addRow를 통해)
        completeList.appendChild(this.newCompleteTodo.addRow());
        //document.querySelector("input") => input에 해당하는 첫 번째 DOM 요소 하나 선택
        const input = document.querySelector("input");
        input.value = "";
    }


    restoreTodo() {
        this.newTodoController = new TodoController(this.innerNode.innerText);
        this.newTodoController.addTodo();

        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newCompleteTodo.getRow());
    }
}

export default CompleteController;