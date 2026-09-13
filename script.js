const successButton = document.querySelector("#success-button");
const successMessage = document.querySelector("#success-message");

successButton.addEventListener("click", () => {
  successMessage.hidden = false;
});
