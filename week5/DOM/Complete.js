import Button from "./Button.js";
import Div from "./Div.js";

class Complete{
    constructor(completeText){
        // complete 한개에 해당하는 뼈대 DIV 생성(텍스트공백인 className은 row인 div를 객체 row에 할당)
        this.row = new Div("", "row").node;
        // 할일에 대한 내용을 적는 텍스트
        this.innerText = new Div(completeText, "text-box");
        // 복구 버튼
        this.restoreBtn = new Button("", "restore-btn");
        // 복구 버튼 이미지
        this.restoreBtnImg = new Image(25, 25);
        this.restoreBtnImg.src = "../Image/restoreBtnImage.png";
        this.restoreBtn.node.appendChild(this.restoreBtnImg);


        // 삭제 버튼
        this.delBtn = new Button("", "del-btn");
        // 삭제 버튼 이미지
        this.delBtnImg = new Image(25, 25);
        this.delBtnImg.src = "../Image/delBtnImage2.png";
        this.delBtn.node.appendChild(this.delBtnImg);
    }

    // 만들어진 요소를 한 줄로 합쳐서 this.row.에 넣고 변환
    // row의 동적모드
    addRow() {
        [this.innerText, this.restoreBtn, this.delBtn].forEach((dom) => {
            this.row.appendChild(dom.node);
        });

        return this.row;
    }

    // 각 요소의 getter 메서드들
    getRow(){
        return this.row;
    }
    getRestoreBtn(){
        return this.restoreBtn.node;
    }
    getDelBtn(){
        return this.delBtn.node;
    }
    getInnerText(){
        return this.innerText.node;
    }
}

export default Complete;