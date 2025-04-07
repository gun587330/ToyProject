class DOM {
    constructor(tagName, innerText, className){
        // tagName이라는 녀석을 document에 올려주는 함수 => tagName(ex div)으로 HTML 요소 생성해서 node에!
        this.node = document.createElement(tagName);

        // 만든 노드에 innerText에 해당하는 텍스트를 바인딩
        this.node.innerText = innerText;

        // if(className)은 오류 선별을 위해서 씀 => className에 값이 있을 때만 추가함
        if(className) this.node.classList.add(className);
    }
}

export default DOM;