// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Button demo: change hero text
const btn = document.getElementById("clickMeBtn");
const hero = document.querySelector(".hero h1");

btn.addEventListener("click", () => {
  if (hero.textContent.includes("Hi, I’m")) {
    hero.textContent = "You clicked the button! 🎉";
  } else {
    hero.textContent = "Hi, I’m Your Name";
  }
});
