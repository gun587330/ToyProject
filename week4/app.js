// 1. js파일에서 접근해야하는 html dom 요소
const myHandText = document.getElementById("my-hand-text");
const myHandIcon = document.getElementById("my-hand-icon");

// 점수판의 점수를 기록하기 위한 전역변수
let myScore = 0;
let computerScore = 0;

const rockBtn = document.getElementById("rock");
const scissorsBtn = document.getElementById("scissors");
const paperBtn = document.getElementById("paper");

const computerText = document.getElementById("computer-hand-text");
const computerIcon = document.getElementById("computer-hand-icon");

resetBtn = document.getElementById("reset-button");

// 2. 이벤트 설정
rockBtn.addEventListener("click", displayMyChoice);
scissorsBtn.addEventListener("click", displayMyChoice);
paperBtn.addEventListener("click", displayMyChoice);
resetBtn.addEventListener("click", reset);

// 3. displayMyChoice 함수 작성
function displayMyChoice(e) {
    let clickedBtn = e.currentTarget.id;
    // Q) 왜 className으로 해야만 작동하는지?? => fontawesome에서 로드해와서 고유 class로 구분해야함
    let clickedIcon = e.target.className;

    myHandText.innerText = clickedBtn;
    myHandIcon.className = clickedIcon;

    Start(clickedBtn);
}
// 랜덤결과를 반환하는 컴퓨터
function getComChoice(){
    const randomValue = {
        0 : ["rock", "fa-regular fa-hand-back-fist change"],
        1 : ["scissors", "fa-regular fa-hand-scissors fa-rotate-90 change"],
        2 : ["paper", "fa-regular fa-hand-scissors fa-rotate-90 change"]
    };
    const randomIndex = Math.floor(Math.random() * 3);
    return randomValue[randomIndex];
}

// 5. 컴퓨터의 결과를 화면에 출력하기 위한 함숫 선언
function displayComChoice(result) {
    computerText.innerText = result[0];
    computerIcon.className = result[1];
}

// 1. 점수판 기능 구현하기
function countScore(){
    // 동점인 경우
    if (myHandText.innerText === computerText.innerText) {
        document.getElementById("display-result").innerText = "draw";
    }
    // 내가 이긴 경우
    else if (myHandText.innerText === "rock" && computerText.innerText === "scissors" 
        || myHandText.innerText === "scissors" && computerText.innerText === "paper"
        || myHandText.innerText === "paper" && computerText.innerText === "rock") {
        myScore += 1;
        document.getElementById("display-result").innerText = "win";
    }
    // 컴퓨터가 이긴 경우
    else {
        computerScore += 1;
        document.getElementById("display-result").innerText = "lose";
    }
    document.getElementById("score my-score").innerText = myScore;
    document.getElementById("score computer-score").innerText = computerScore;
}

function Start(myChoice) {
    let resultArray = getComChoice();
    // let comChoice = resultArray[0];
    displayComChoice(resultArray);
    // 컴퓨터의 점수까지 보여진 후 점수 업데이트
    countScore();
}

// 리셋 버튼 만들어서 게임 초기화시키기
function reset(){
    // 점수 초기화
    myScore = 0;
    computerScore = 0;
    // 화면에 적용
    document.getElementById("score my-score").innerText = myScore;
    document.getElementById("score computer-score").innerText = computerScore;

    // TEXT, ICON 초기화
    document.getElementById("my-hand-text").innerText = "";
    document.getElementById("my-hand-icon").className = "";

    document.getElementById("computer-hand-text").innerText = "";
    document.getElementById("computer-hand-icon").className = "";
}

// 다크모드를 토글하는 함수
const darkModeBtn = document.querySelector('.darkModeBtn')

// 나름 숏코딩ㅋ > 다크모드 관련 코드는 하나로 모아서 보는게 가독이 좋을 것 같아서!
darkModeBtn.addEventListener('click', () => {
  if (document.body.dataset.theme === 'light-mode') {
    document.body.dataset.theme = 'dark-mode'
    document.getElementById("darkModeBtn").innerText = "day";
  } else {
    document.body.dataset.theme = 'light-mode'
    document.getElementById("darkModeBtn").innerText = "night";
  }
})