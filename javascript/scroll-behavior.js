// document.body.style.overflow = "hidden";

const leftBox = document.querySelector(".left");
const rightBox = document.querySelector(".right");

// Enable scroll behavior based on cursor position
leftBox.addEventListener("mouseenter", () => {
  leftBox.style.overflowY = "scroll";
  rightBox.style.overflowY = "hidden";
});

rightBox.addEventListener("mouseenter", () => {
  rightBox.style.overflowY = "scroll";
  leftBox.style.overflowY = "hidden";
});

// Reset scroll behaviors when mouse leaves both boxes
document.querySelector(".container").addEventListener("mouseleave", () => {
  leftBox.style.overflowY = "hidden";
  rightBox.style.overflowY = "hidden";
});
