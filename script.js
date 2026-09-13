const successButton = document.querySelector("#success-button");
const successMessage = document.querySelector("#success-message");
const year = document.querySelector("#year");

successButton?.addEventListener("click", () => {
  successMessage.hidden = false;
  successButton.textContent = "测试成功 ✓";
});

if (year) {
  year.textContent = new Date().getFullYear();
}
