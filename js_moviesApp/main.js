window.addEventListener("load", () => {
  toReq = (param, x, size) => {
    fetch(`http://www.omdbapi.com/?${x}=${param}&plot=full&apikey=3b2aec24`)
      .then((result) => {
        return (result = result.json());
      })
      .then((result) => {
        if (result["Response"] == "False") {
          resultData(result);
        } else {
          resultData(result, param, size);
        }
      });
  };

  const inputS = document.querySelectorAll(".inputS")[0];
  const buttonS = document.querySelectorAll(".buttonS")[0];
  const alertRow = document.querySelectorAll(".alertRow")[0];
  const movieList = document.querySelectorAll(".movieList")[0];
  const renderMovies = document.querySelectorAll(".renderMovies")[0];
  movieList.style.visibility = "hidden";

  snip = () => {
    if (inputS.value != "" && inputS.value != null) {
      toReq(inputS.value.toLowerCase(), "s");
      inputS.value = "";
    }
  };
  inputS.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
      snip();
    }
  });

  buttonS.addEventListener("click", () => {
    snip();
  });

  resultData = (data, movieName, size) => {
    if (data["Response"] == "False") {
      clear();
      movieList.style.visibility = "hidden";
      alertRow.innerHTML = `
                    <div class="col-md-7 col-12">
                        <div class="alert alert-danger" role="alert">
                            ${data["Error"]}
                        </div>
                </div>
            `;
    } else {
      movieList.style.visibility = "visible";
      clear();
      if (size != "single") {
        movieList.innerHTML = `
            <select class="form-control">
                <option selected="${movieName.toUpperCase()}" value="${movieName.toUpperCase()}">ALL MOVIES FOR ${movieName.toUpperCase()} </option>
            </select>
            `;

        data["Search"].forEach((element) => {
          document.querySelectorAll("select")[0].innerHTML += `
                        <option value=${element["imdbID"]}>${element["Title"]}</option>
                    `;
        });
        data["Search"].forEach((element) => {
          renderMovies.innerHTML += `
                            <div class="card">
                                    <img src="${element["Poster"]}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${element["Title"]}</h5>
                                    <p class="card-text">
                                        Movie Year: ${element["Year"]}
                                    </p>
                                </div>
                            </div>
                `;
        });
      } else {
        renderMovies.innerHTML = `
                            <div class="card">
                                    <img src="${data["Poster"]}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data["Title"]}</h5>
                                    <p class="card-text">
                                        Movie Year: ${data["Year"]}
                                    </p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> <b>Released</b> ${data["Released"]} </li>
                                    <li class="list-group-item"> <b>Runtime</b>  ${data["Runtime"]} </li>
                                    <li class="list-group-item"> <b>Genre</b> ${data["Genre"]} </li>
                                    <li class="list-group-item"> <b>Director</b> ${data["Director"]} </li>
                                    <li class="list-group-item"> <b>Writer</b> ${data["Writer"]} </li>
                                    <li class="list-group-item"> <b>Actors</b> ${data["Actors"]} </li>
                                    <li class="list-group-item"> <b>Plot</b> ${data["Plot"]} </li>
                                    <li class="list-group-item"> <b>Country</b> ${data["Country"]} </li>
                                    <li class="list-group-item"> <b>Awards</b> ${data["Awards"]} </li>
                                    <li class="list-group-item"> <b>imdbRating</b> ${data["imdbRating"]} </li>
                                    <li class="list-group-item"> <b>Production</b> ${data["Production"]} </li>
                                </ul>
                            </div>
                `;
      }

      const select = document.querySelectorAll("select")[0];
      select.addEventListener("change", (event) => {
        if (event.target[0].selected) {
          toReq(event.target.options[0].value.toLowerCase(), "s");
        } else {
          toReq(event.target.value.toLowerCase(), "i", "single");
        }
      });
    }
  };

  clear = () => {
    alertRow.innerHTML = "";
    renderMovies.innerHTML = "";
  };
});
