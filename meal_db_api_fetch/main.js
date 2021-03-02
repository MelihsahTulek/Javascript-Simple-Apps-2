const items = document.querySelectorAll(".items")[0];
const inp = document.querySelector("#inp");
const searchBtn = document.querySelector("#searchBtn");
const noResult = document.querySelector("#noResult");

inp.addEventListener("keypress", (e) => {
  inp.value.trim().length !== 0 && e.keyCode === 13 && init();
});

searchBtn.addEventListener("click", () => {
  // * inp.value.trim()
  inp.value.trim().length !== 0 && init();
});

const init = () => {
  items.innerHTML = null;
  const reqToApi = async () => {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inp.value.trim()}`
    );
    let { meals } = await response.json();

    if (!meals) {
      items.innerHTML = null;
      noResult.style.display = "inline";
    } else {
      noResult.style.display = "none";

      meals.forEach((meal) => {
        items.innerHTML += `
          <div class="item">
            <div class="itemImage"> 
              <img src=${meal.strMealThumb} alt=${meal.idMeal} />
            </div>
           <div class="itemTitle">
            <h3> ${meal.strMeal} </h3>
           </div>
          </div>
        `;
      });
    }
  };

  reqToApi();
};
