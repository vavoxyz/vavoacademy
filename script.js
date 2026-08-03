const hero = document.querySelector("#hero");
const heroImage = document.querySelector(".hero__image");

if (hero && heroImage && matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 6;
    heroImage.style.transform = `scale(1.045) translate3d(${x * -0.32}px, ${y * -0.32}px, 0)`;
  });

  hero.addEventListener("pointerleave", () => {
    heroImage.style.transform = "scale(1.035) translate3d(0, 0, 0)";
  });
}

document.querySelectorAll("[data-checkout]").forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("aria-label", "Przejdź do bezpiecznej płatności Stripe");
  });
});
