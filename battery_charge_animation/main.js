const box = document.querySelector("#box");
const status = document.querySelector("#status");
const refresh = document.querySelector("#refresh");

let counter = 25;

const battery = () => {
  counter += 25;
  if (counter === 50) {
    box.style.height = `${counter}%`;
    box.style.backgroundColor = `orange`;
    status.innerText = "Sarj Oluyor... %" + counter;
  } else if (counter === 75) {
    box.style.height = `${counter}%`;
    box.style.backgroundColor = `yellow`;
    status.innerText = "Sarj Oluyor... %" + counter;
  } else {
    box.style.height = `${counter}%`;
    box.style.backgroundColor = `green`;
    status.innerText = "Pil Doldu! %" + counter;
  }
};

const time = setInterval(() => {
  if (counter === 100) {
    clearInterval(time);
  } else {
    battery();
  }
}, 2500);

refresh.addEventListener("click", () => window.location.reload());
