const categoryContainer = document.getElementById("catContainer");

const cardContainer = document.getElementById("cardContainer");

const cartContainer = document.getElementById("cartContainer");

let carts = [];
const loadCategoryId = async (id) => {
  //   id.forEach((el) => {
  //     console.log(el.categories);
  //   });
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  //   console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  const plants = data.plants.id;
  displayLoadCategoryId(plants);
};

const displayLoadCategoryId = (data) => {
  //   data.forEach((e) => {
  //     console.log(e);
  //   });

  for (const d of data) {
    console.log(d);
  }
  // console.log(data.category);
  // console.log(data.cacategory);
  // data.forEach((d) => console.log(d.category));
  // data.filter((data) => data.category===);
};

const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);
  const data = await res.json();
  const categories = data.categories;
  displayLoadCategory(categories);
};

const displayLoadCategory = (data) => {
  categoryContainer.innerHTML = "";
  //   console.log(data);
  data.forEach((element) => {
    // console.log(element.id);
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
      //   console.log(btn);

      btn.classList.remove("bg-green-700", "text-white");
      //
      loadCategoryId(btn.id);
      console.log(btn.id);
    });

    // console.log(catButton);
    if (e.target.localName === "button") {
      e.target.classList.add("bg-green-700", "text-white");
    }
  });
};

const loadAllPlats = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  const allPlants = data.plants;
  displayLoadAllPlats(allPlants);
};

// const addtocart = (id) => {
//   id.forEach((id) => {
//     id.addEventListener("click", (e) => {
//       console.log(e);
//     });
//   });
// };

const displayLoadAllPlats = (allPlants) => {
  cardContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    cardContainer.innerHTML += `
    
    <div  class="card bg-base-100 sm:w-90 shadow-sm">
              <figure>
                <img class="h-[190px] w-full object-cover"
                  src="${plant.image}"
                  alt="Shoes"
                />
              </figure>
              <div id="${plant.id}" class="card-body">
                <h2 class="card-title">${plant.name}</h2>
                <p>
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge text-[#15803d] bg-[#cff0dc]">${plant.category}</div>
                  <div class="badge badge-outline">৳ ${plant.price}</div>
                </div>
                <button   class="btn bg-[#15803d] text-white">Add To Cart</button>
              </div>
            </div>

    `;
    // addtocart(plant.id);
    // console.log(plant.id);
  });
};

cardContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.innerText === "Add To Cart") {
    cartHandle(e);
  }
});

const cartHandle = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const price = e.target.parentNode.children[2].children[1].innerText;
  const id = e.target.parentNode.id;
  // console.log(title);
  // console.log(price);
  // console.log(id);
  carts.push({
    title: title,
    price: price,
    id: id,
  });
  showCartHandle(carts);
};

const showCartHandle = (carts) => {
  cartContainer.innerHTML = "";
  // console.log(carts);
  carts.forEach((cart) => {
    cartContainer.innerHTML += `
    
    <div
              class="flex justify-between items-center p-3 bg-[#f0fdf4] rounded-lg"
            >
              <div>
                <h1>${cart.title}</h1>
                <p>৳${cart.price} x 1</p>
              </div>
              <div>x</div>
            </div>
            <hr class="text-gray-300 mt-2" />
            <div class="flex justify-between">
              <div>Total:</div>
              <div>tk <span>1000</span></div>
            </div>


    `;
  });
};

loadCategory();
loadAllPlats();
