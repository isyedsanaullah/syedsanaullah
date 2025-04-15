'use strict';
window.addEventListener("DOMContentLoaded", () => {
  fetch("notification.html")
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const template = doc.getElementById("warningBox");
      const warningNode = template.content.cloneNode(true);
      document.getElementById("warning-container").appendChild(warningNode);

      const box = document.querySelector(".warning-box");

      // Animate in
      setTimeout(() => {
        box.classList.add("show");
      }, 100);

      // Auto-hide after 5 seconds
      setTimeout(() => {
        hideWarning();
      }, 25000);
    });
});

function hideWarning() {
  const box = document.querySelector(".warning-box");
  if (box) {
    box.classList.remove("show");
    // Optional: remove after animation
    setTimeout(() => box.remove(), 400);
  }
}
