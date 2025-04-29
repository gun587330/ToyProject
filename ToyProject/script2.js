// const guestbook = document.getElementById("guestbook");
// const inputTitle = document.getElementById("titleInput");
// const inputName = document.getElementById("nameInput");
// const inputContent = document.getElementById("contentInput");
// const inputPassword = document.getElementById("passwordInput");
// const submitBtn = document.getElementById("submitBtn");
// function checkInputs() {
//   submitBtn.disabled = !(inputTitle.value && inputName.value && inputContent.value && inputPassword.value);
// }

// [inputTitle, inputName, inputContent, inputPassword].forEach(input => {
//   input.addEventListener("input", checkInputs);
// });

// submitBtn.addEventListener("click", () => {
//   const title = inputTitle.value.trim();
//   const name = inputName.value.trim();
//   const content = inputContent.value.trim();
//   const password = inputPassword.value.trim();

//   if (title && name && content && password) {
//     submitBtn.classList.add("slide-out");

//     setTimeout(() => {
//       const wrap = document.createElement("div");
//       wrap.className = "guest-entry-wrap";

//       const entry = document.createElement("div");
//       entry.className = "guest-entry";

//       const contentWrap = document.createElement("div");
//       contentWrap.className = "entry-content-wrap";

//       const contentBox = document.createElement("div");
//       contentBox.className = "entry-content";

//       const lightbulb = document.createElement("div");
//       lightbulb.className = "lightbulb";
//       lightbulb.textContent = "💡";

//       contentWrap.appendChild(lightbulb);

//       contentBox.innerHTML += `
//         <div><strong>제목:</strong> ${title}</div>
//         <div><strong>이름:</strong> ${name}</div>
//         <div><strong>내용:</strong> ${content}</div>
//       `;

//       const buttonBox = document.createElement("div");
//       buttonBox.className = "entry-buttons";

//       const switchBox = document.createElement("div");
//       switchBox.className = "switch-box";
//       const switchToggle = document.createElement("div");
//       switchToggle.className = "switch-toggle";
//       const switchLabel = document.createElement("span");
//       switchLabel.className = "switch-label";
//       switchLabel.textContent = "=";

//       switchToggle.appendChild(switchLabel);
//       switchBox.appendChild(switchToggle);

//       const deleteBtn = document.createElement("button");
//       deleteBtn.className = "delete-btn";
//       deleteBtn.textContent = "퇴실";

//       buttonBox.appendChild(switchBox);
//       buttonBox.appendChild(deleteBtn);

//       entry.appendChild(contentWrap);
//       contentWrap.appendChild(contentBox);
//       entry.appendChild(buttonBox);

//       switchBox.addEventListener("click", () => {
//         switchBox.classList.toggle("on");
//         entry.classList.toggle("on");
//       });

//       deleteBtn.addEventListener("click", () => {
//         const inputPwd = prompt("비밀번호를 입력하세요:");
//         if (inputPwd === password) {
//           wrap.remove();
//         } else {
//           alert("비밀번호가 일치하지 않습니다.");
//         }
//       });

//       wrap.appendChild(entry);
//       guestbook.appendChild(wrap);

//       setTimeout(() => {
//         entry.classList.add("active");
//       }, 50);

//       inputTitle.value = "";
//       inputName.value = "";
//       inputContent.value = "";
//       inputPassword.value = "";
//       submitBtn.disabled = true;

//       submitBtn.classList.remove("slide-out");
//     }, 500);
//   }
// });

// 서버 주소 => http://13.125.150.49:8000/
const WRITE_URL = 'http://13.125.150.49:8000/post/';
const READ_URL = 'http://13.125.150.49:8000/post/';
const DELETE_URL = 'http://13.125.150.49:8000/guestbook/';

const guestbook = document.getElementById("guestbook");
const inputTitle = document.getElementById("titleInput");
const inputName = document.getElementById("nameInput");
const inputContent = document.getElementById("contentInput");
const inputPassword = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");

// 입력 확인해서 버튼 활성화
function checkInputs() {
  submitBtn.disabled = !(inputTitle.value && inputName.value && inputContent.value && inputPassword.value);
}

[inputTitle, inputName, inputContent, inputPassword].forEach(input => {
  input.addEventListener("input", checkInputs);
});

// 방명록 작성하기
submitBtn.addEventListener("click", async () => {
  const title = inputTitle.value.trim();
  const name = inputName.value.trim();
  const content = inputContent.value.trim();
  const password = inputPassword.value.trim();

  if (title && name && content && password) {
    submitBtn.classList.add("slide-out");

    try {
      const response = await fetch(WRITE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          name,
          content,
          password
        })
      });

      const result = await response.json();

      if (result.status === 200) {
        alert("방명록 작성 성공!");
        inputTitle.value = "";
        inputName.value = "";
        inputContent.value = "";
        inputPassword.value = "";
        submitBtn.disabled = true;
        fetchGuestbook(); // 새로고침
      } else {
        alert("작성 실패: " + result.message);
      }
    } catch (error) {
      console.error("작성 오류:", error);
      alert("서버 통신 실패");
    }

    submitBtn.classList.remove("slide-out");
  }
});

// 방명록 가져오기
async function fetchGuestbook() {
  try {
    const response = await fetch(READ_URL, {
      method: "GET"
    });

    const result = await response.json();

    if (result.status === 200) {
      renderGuestbook(result.data);
    } else {
      alert("불러오기 실패: " + result.message);
    }
  } catch (error) {
    console.error("불러오기 오류:", error);
    alert("방명록을 불러오지 못했습니다.");
  }
}

// 방명록 화면에 그리기
function renderGuestbook(entries) {
  guestbook.innerHTML = "";

  // 최신순 정렬
  entries.sort((a, b) => new Date(b.created) - new Date(a.created));

  entries.forEach((entry, index) => {
    const wrap = document.createElement("div");
    wrap.className = "guest-entry-wrap";

    const entryDiv = document.createElement("div");
    entryDiv.className = "guest-entry active";

    const contentWrap = document.createElement("div");
    contentWrap.className = "entry-content-wrap";

    const contentBox = document.createElement("div");
    contentBox.className = "entry-content";

    const lightbulb = document.createElement("div");
    lightbulb.className = "lightbulb";
    lightbulb.textContent = "💡";

    contentWrap.appendChild(lightbulb);

    contentBox.innerHTML += `
      <div><strong>제목:</strong> ${entry.title}</div>
      <div><strong>이름:</strong> ${entry.name}</div>
      <div><strong>내용:</strong> ${entry.content}</div>
    `;

    const buttonBox = document.createElement("div");
    buttonBox.className = "entry-buttons";

    const switchBox = document.createElement("div");
    switchBox.className = "switch-box";
    const switchToggle = document.createElement("div");
    switchToggle.className = "switch-toggle";
    const switchLabel = document.createElement("span");
    switchLabel.className = "switch-label";
    switchLabel.textContent = "=";

    switchToggle.appendChild(switchLabel);
    switchBox.appendChild(switchToggle);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "퇴실";

    switchBox.addEventListener("click", () => {
      switchBox.classList.toggle("on");
      entryDiv.classList.toggle("on");
    });

    deleteBtn.addEventListener("click", () => {
      const inputPwd = prompt("비밀번호를 입력하세요:");
      if (!inputPwd) return;

      deleteGuestbook(entry.id, inputPwd);
    });

    buttonBox.appendChild(switchBox);
    buttonBox.appendChild(deleteBtn);

    entryDiv.appendChild(contentWrap);
    contentWrap.appendChild(contentBox);
    entryDiv.appendChild(buttonBox);
    wrap.appendChild(entryDiv);
    guestbook.appendChild(wrap);
  });
}

// 방명록 삭제하기
async function deleteGuestbook(id, password) {
  try {
    const response = await fetch(DELETE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        password: password
      })
    });

    const result = await response.json();

    if (result.status === 200) {
      alert("삭제 성공!");
      fetchGuestbook();
    } else if (result.status === 404) {
      alert("비밀번호가 틀렸습니다!");
    } else {
      alert("삭제 실패: " + result.message);
    }
  } catch (error) {
    console.error("삭제 오류:", error);
    alert("서버 통신 실패");
  }
}

// 페이지 로딩되자마자 방명록 불러오기
fetchGuestbook();
