window.addEventListener("load", () => {
  const inpFile = document.querySelector("#inpFile");
  const imagesArea = document.querySelectorAll(".imagesArea")[0];

  inpFile.addEventListener("change", (e) => {
    Array.from(e.target.files).forEach((element) => {
      if (
        element.type == "image/jpeg" ||
        element.type == "image/jpg" ||
        element.type == "image/png"
      ) {
        let reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (e) => {
          imagesArea.innerHTML += `
            <div class="img">
              <img src=${e.target.result} alt=""/>
              <small> ${element.name} </small>
            </div>
          `;
        };
      } else {
        return false;
      }
    });
  });
});
