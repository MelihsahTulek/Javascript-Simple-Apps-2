const images = document.querySelectorAll(".images")[0].children;
const imagesArray = Array.from(images);
const maxIndex = imagesArray.length - 1;
let index = 0;
//
const controlsRight = document.querySelectorAll(".controlsRight")[0];
const controlsLeft = document.querySelectorAll(".controlsLeft")[0];

controlsRight.addEventListener("click", () => {
  if (index !== maxIndex) {
    index++;
    imagesArray[index].style.transform = `translateX(${-100 * index}%)`;
  }
});

controlsLeft.addEventListener("click", () => {
  if (index !== 0) {
    imagesArray[index].style.transform = `translateX(${100 * index}%)`;
    index--;
  }
});
