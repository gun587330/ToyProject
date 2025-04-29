const guestbook = document.getElementById("guestbook");
const inputTitle = document.getElementById("titleInput");
const inputName = document.getElementById("nameInput");
const inputContent = document.getElementById("contentInput");
const inputPassword = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");
function checkInputs() {
  submitBtn.disabled = !(inputTitle.value && inputName.value && inputContent.value && inputPassword.value);
}

[inputTitle, inputName, inputContent, inputPassword].forEach(input => {
  input.addEventListener("input", checkInputs);
});

submitBtn.addEventListener("click", () => {
  const title = inputTitle.value.trim();
  const name = inputName.value.trim();
  const content = inputContent.value.trim();
  const password = inputPassword.value.trim();

  if (title && name && content && password) {
    submitBtn.classList.add("slide-out");

    setTimeout(() => {
      const wrap = document.createElement("div");
      wrap.className = "guest-entry-wrap";

      const entry = document.createElement("div");
      entry.className = "guest-entry";

      const contentWrap = document.createElement("div");
      contentWrap.className = "entry-content-wrap";

      const contentBox = document.createElement("div");
      contentBox.className = "entry-content";

      const lightbulb = document.createElement("div");
      lightbulb.className = "lightbulb";
      lightbulb.textContent = "💡";

      contentWrap.appendChild(lightbulb);

      contentBox.innerHTML += `
        <div><strong>제목:</strong> ${title}</div>
        <div><strong>이름:</strong> ${name}</div>
        <div><strong>내용:</strong> ${content}</div>
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

      buttonBox.appendChild(switchBox);
      buttonBox.appendChild(deleteBtn);

      entry.appendChild(contentWrap);
      contentWrap.appendChild(contentBox);
      entry.appendChild(buttonBox);

      switchBox.addEventListener("click", () => {
        switchBox.classList.toggle("on");
        entry.classList.toggle("on");
      });

      deleteBtn.addEventListener("click", () => {
        const inputPwd = prompt("비밀번호를 입력하세요:");
        if (inputPwd === password) {
          wrap.remove();
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      });

      wrap.appendChild(entry);
      guestbook.appendChild(wrap);

      setTimeout(() => {
        entry.classList.add("active");
      }, 50);

      inputTitle.value = "";
      inputName.value = "";
      inputContent.value = "";
      inputPassword.value = "";
      submitBtn.disabled = true;

      submitBtn.classList.remove("slide-out");
    }, 500);
  }
});
