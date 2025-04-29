const WRITE_URL = 'http://13.125.150.49:8000/post/';
const READ_URL = 'http://13.125.150.49:8000/post/';
const DELETE_URL = 'http://13.125.150.49:8000/post/';

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
        body: JSON.stringify({ title, name, content, password })
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
    const response = await fetch(READ_URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const result = await response.json();
    console.log("📦 서버에서 받은 방명록 데이터:", result.data);

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

  entries.sort((a, b) => new Date(b.created) - new Date(a.created));

  entries.forEach((entry) => {
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

      if (!entry.id) {
        alert("❌ 이 항목에는 ID가 없어 삭제할 수 없습니다.");
        return;
      }

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
    const bodyData = {
      id: Number(id),
      password: password
    };

    console.log("🧾 삭제 요청 보냄 →", bodyData);

    const response = await fetch(DELETE_URL, {
      method: "POST", // 서버 명세에 따라 DELETE 아님!
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
      throw new Error(`서버 응답 실패: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === 200) {
      alert("삭제 성공!");
      fetchGuestbook(); // 새로고침
    } else if (result.status === 404) {
      alert("비밀번호가 틀렸습니다!");
    } else {
      alert("삭제 실패: " + result.message);
    }
  } catch (error) {
    console.error("삭제 오류:", error);
    alert("방명록 삭제 실패. 서버 연결을 확인해주세요.");
  }
}

// 페이지 로딩 시 방명록 불러오기
fetchGuestbook();
