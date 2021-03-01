window.onload = () => {
  const btn = document.querySelector("#btn");
  const myInput = document.querySelector("#myInput");
  const ul = document.querySelector("#ul");

  btn.addEventListener("click", () => {
    let todoTxt = myInput.value.trim();
    if (todoTxt.length !== 0) {
      localStorage.setItem(
        localStorage.length + parseInt(Math.random() * 100),
        JSON.stringify({ todo: todoTxt })
      );
      myInput.value = null;
      writeAllTodo();
    } else {
      return false;
    }
  });

  const writeAllTodo = () => {
    ul.innerHTML = null;
    if (localStorage.length === 0) {
      ul.innerHTML += `<center>localStorage is null</center>`;
    }
    for (let i = 0; i < localStorage.length; i++) {
      ul.innerHTML += `
        <li>
          <p>
            ${JSON.parse(localStorage.getItem(localStorage.key(i))).todo}
          </p>
          <button class="btnDelete" data-id=${JSON.parse(localStorage.key(i))}>X</button>
        </li>
        <hr/>
      `;
    }
    deleteF();
  };

  const deleteF = () => {
    setTimeout(() => {
      const btnDelete = document.querySelectorAll(".btnDelete");
      btnDelete?.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          console.log("object");
          localStorage.removeItem(e.target.getAttribute("data-id"));
          writeAllTodo();
        });
      });
    }, 10);
  };
  deleteF();
  writeAllTodo();
};
