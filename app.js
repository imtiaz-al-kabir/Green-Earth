const categoryContainer = document.getElementById("catContainer");

const cardContainer = document.getElementById("cardContainer");

const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);
  const data = await res.json();
  const categories = data.categories;
  displayLoadCategory(categories);
};

const displayLoadCategory = (data) => {
  //   console.log(data);
  data.forEach((element) => {
    // console.log(element);
    categoryContainer.innerHTML += `
     <button id="${element.id}"
              class="btn rounded-xl bg-[#f0fdf4]  hover:bg-[#15803d] hover:text-white"
            >
            ${element.category_name}
            
            </button>
    `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const catButton = document.querySelectorAll("button");
    catButton.forEach((btn) => {
      btn.classList.remove("bg-green-700", "text-white");
    });
    // console.log(catButton);
    if (e.target.localName === "button") {
      e.target.classList.add("bg-green-700", "text-white");
    }
  });
};

// const catButton = document.querySelectorAll(".catbtn");
// console.log(catButton);

// const active = () => {
//   catButton.innerHTML.classList.add("bg-red-500");
// };

const loadAllPlats = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  const allPlants = data.plants;
  displayLoadAllPlats(allPlants);
};

const displayLoadAllPlats = (allPlants) => {
  allPlants.forEach((plant) => {
    cardContainer.innerHTML += `
    
    <div class="card bg-base-100 sm:w-90 shadow-sm">
              <figure>
                <img class="h-[190px] w-full object-cover"
                  src="${plant.image}"
                  alt="Shoes"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${plant.name}</h2>
                <p>
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge text-[#15803d] bg-[#cff0dc]">${plant.category}</div>
                  <div class="badge badge-outline">৳ ${plant.price}</div>
                </div>
                <button class="btn bg-[#15803d] text-white">Add To Cart</button>
              </div>
            </div>

    `;
  });
};

loadCategory();
loadAllPlats();
