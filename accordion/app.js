const ul = document.querySelector(".ul");

for (let i = 0; i < ul.children.length; i++) {
  ul.children[i].children[0].addEventListener("click", () => {
    if (ul.children[i].children[1].getAttribute("class").includes("active")) {
      ul.children[i].children[1].classList.remove("active");
      ul.children[i].children[0].children[1].classList.remove("active");
    } else {
      for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].children[1].classList.remove("active");
        ul.children[i].children[0].children[1].classList.remove("active");
      }
      ul.children[i].children[1].classList.add("active");
      ul.children[i].children[0].children[1].classList.add("active");
    }
  });
}
