export default function displayAlert(alertType, alertMessage, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `<div class="alert ${alertType}">${alertMessage}</div>`;
}
