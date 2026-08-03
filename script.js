const modal = document.querySelector("#course-program");
const openButton = document.querySelector("[data-program-open]");
const closeButtons = document.querySelectorAll("[data-program-close]");
const closeButton = document.querySelector(".program-panel__close");

function openProgram() {
  if (!modal) return;
  modal.hidden = false;
  modal.removeAttribute("inert");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton?.focus();
}

function closeProgram() {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("inert", "");
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  openButton?.focus();
}

openButton?.addEventListener("click", openProgram);
closeButtons.forEach((button) => button.addEventListener("click", closeProgram));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) closeProgram();
});
