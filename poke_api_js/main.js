window.addEventListener("load", (e) => {
  const init = () => {
    const loader = document.querySelector(".loader");

    fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let { results } = json;
        results.forEach((poke) => {
          fetchPoke(poke);
        });
      });

    const fetchPoke = (poke) => {
      let { url } = poke;
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          writePoke(result);
        });
    };

    const writePoke = (result) => {
      let { id, name, types } = result;
      const modal = document.querySelector(".modal");
      const pokeContainer = document.querySelector(".pokeContainer");
      const closeIcon = document.getElementsByTagName("i")[1];

      let pokeBox = document.createElement("div");
      pokeBox.classList.add("pokeBox");

      let poke = document.createElement("div");
      poke.classList.add("poke");
      poke.setAttribute("data-id", id);

      let imgContainer = document.createElement("div");
      imgContainer.classList.add("imgContainer");
      let imgElem = document.createElement("img");
      imgElem.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      imgElem.alt = `${id}`;
      imgContainer.appendChild(imgElem);

      let pokeTitleContainer = document.createElement("div");
      pokeTitleContainer.classList.add("pokeTitle");
      let pokeTitle = document.createElement("h2");
      pokeTitle.innerText = name;
      pokeTitleContainer.appendChild(pokeTitle);
      let pokeSubTitle = document.createElement("h4");
      pokeSubTitle.innerText = `${types[0].type.name}`;
      pokeTitleContainer.appendChild(pokeSubTitle);

      pokeContainer.appendChild(pokeBox);
      pokeBox.appendChild(poke);
      poke.appendChild(imgContainer);
      poke.appendChild(pokeTitleContainer);

      poke.addEventListener("click", (e) => {
        const pokeModalUl = document.querySelector(".pokeModalUl");
        pokeModalUl.innerHTML = null;
        modal.style.transform = "translateY(0px)";
        modal.classList.remove("modalHide");
        modal.classList.add("modalShow");

        let pokeID = poke.getAttribute("data-id");

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
          .then((response) => response.json())
          .then((result) => {
            let { name, weight, height, base_experience, stats, types, id } = result;

            const contentLeft = document.querySelector(".contentLeft");
            const modalHeaderTitle = document.querySelector(".modalHeaderTitle");
            let allType = [];
            contentLeft.innerHTML = ` <img src=https://pokeres.bastionbot.org/images/pokemon/${id}.png alt=${name}>`;
            modalHeaderTitle.innerText = name;
            for (const key in types) {
              allType.push(types[key].type.name);
            }
            pokeModalUl.innerHTML += `<li><span>Types : </span> ${allType.toString().split(",").join(" & ")}</li>`;
            pokeModalUl.innerHTML += `<li><span>Weight : </span> ${weight}</li>`;
            pokeModalUl.innerHTML += `<li><span>Height : </span> ${height}</li>`;
            pokeModalUl.innerHTML += `<li><span>Base Experience : </span> ${base_experience}</li>`;

            for (const key in stats) {
              for (const i in stats[key]) {
                if (i === "base_stat") {
                  pokeModalUl.innerHTML += `<li><span>${stats[key]["stat"].name} : </span> ${stats[key][i]}</li>`;
                }
              }
            }
          });

        closeIcon.addEventListener("click", () => {
          modal.classList.remove("modalShow");
          modal.classList.add("modalHide");
        });
      });
    };

    setTimeout(() => {
      loader.style.display = "none";
    }, e.timeStamp);
  };

  init();
});
