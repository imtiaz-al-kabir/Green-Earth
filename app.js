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
  data.forEach((element) => {
    categoryContainer.innerHTML += `
     <button
              class="btn rounded-xl bg-[#f0fdf4]  hover:bg-[#15803d] hover:text-white"
            >
            ${element.category_name}
            
            </button>
    `;
  });
};

const loadAllPlats = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  const allPlants = data.plants;
  displayLoadAllPlats(allPlants);
};

const displayLoadAllPlats = (allPlants) => {
  allPlants.forEach((plant) => {
    console.log(plant);
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
