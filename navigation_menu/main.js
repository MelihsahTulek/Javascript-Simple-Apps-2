const menuMobileIcon = document.querySelector("#menuMobileIcon");
const menuItems = document.querySelector("#menuItems");

let isopen = false;

menuMobileIcon.addEventListener("click", () => {
  isopen = !isopen;
  if (isopen) {
    menuItems.style.display = "inline-block";
  } else {
    menuItems.style.display = "none";
  }
});
