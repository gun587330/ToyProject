const checkbox = document.getElementById("pullSwitch");
const input = document.getElementById("guestInput");
const guestbook = document.getElementById("guestbook");

checkbox.addEventListener("change", () => {
  console.log("Checkbox 상태:", checkbox.checked);
  console.log("입력된 내용:", input.value);

if (checkbox.checked && input.value.trim() !== "") {
  const entry = document.createElement("div");
  entry.classList.add("guest-entry");
  entry.textContent = input.value.trim();
  guestbook.appendChild(entry);

  // activate entry
  setTimeout(() => {
    entry.classList.add("active");
  }, 50);

  input.value = "";
  checkbox.checked = false;
}
});

