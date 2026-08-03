const modal = document.querySelector("#course-program");
const openButton = document.querySelector("[data-program-open]");
const closeButtons = document.querySelectorAll("[data-program-close]");
const closeButton = document.querySelector(".program-panel__close");

function openProgram() {
  if (!modal) return;
  modal.removeAttribute("inert");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => closeButton?.focus(), 120);
}

function closeProgram() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("inert", "");
  document.body.classList.remove("modal-open");
  openButton?.focus();
}

openButton?.addEventListener("click", openProgram);
closeButtons.forEach((button) => button.addEventListener("click", closeProgram));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) closeProgram();
});
