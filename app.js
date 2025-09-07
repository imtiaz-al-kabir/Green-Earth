const categoryContainer = document.getElementById("catContainer");

const cardContainer = document.getElementById("cardContainer");

const cartContainer = document.getElementById("cartContainer");
let totalPrice = Number(document.getElementById("totalPrice").innerText);
let carts = [];

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cardContainer").classList.remove("hidden");
  } else {
    document.getElementById("cardContainer").classList.add("hidden");
    document.getElementById("spinner").classList.remove("hidden");
  }
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

         

     <button onclick="loadCategoryId('${element.id}','${element.category_name}') " id="${element.id}"
              class="btn rounded-xl  hover:bg-green-700 hover:text-white catbtn"
            >
            ${element.category_name}
            
            </button>
    `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const catButton = document.querySelectorAll(".catbtn");
    catButton.forEach((btn) => {
      //   console.log(btn);

      btn.classList.remove("bg-green-700", "text-white");
    });

    // console.log(catButton);
    if (e.target.localName === "button") {
      e.target.classList.add("bg-green-700", "text-white");
    }
  });
};

const loadAllPlats = async () => {
  manageSpinner(false);
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  const allPlants = data.plants;
  displayLoadAllPlats(allPlants);
};

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
                <h2 onclick="loadPlantDetails(${plant.id})" class="card-title cursor-pointer">${plant.name}</h2>
                <p>
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge text-[#15803d] bg-[#cff0dc]">${plant.category}</div>
                  <div class="badge badge-outline"><span>${plant.price}</span> </div>
                </div>
                <button   class="btn bg-[#15803d] hover:bg-green-950 text-white">Add To Cart</button>
              </div>
            </div>

    `;
  });
  manageSpinner(true);
};

const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayLoadPlantDetails(data.plants);
};

const displayLoadPlantDetails = (details) => {
  console.log(details);
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `<h2 class="card-title my-3 text-2xl font-bold ">${details.name}</h2>
          <div class="card bg-base-100 shadow-sm">
            <figure>
              <img
                class="h-[190px] w-full object-cover"
                src="${details.image}"
                alt="Shoes"
              />
            </figure>
            <div id="" class="card-body">
              <div>
                <h2 class="font-bold">Category: ${details.category}</h2>
                <h3 class="font-bold">Price: ৳ ${details.price}</h3>

                <p class="font-bold">Description: ${details.description}</p>
              </div>
            </div>
          </div>`;

  document.getElementById("modalContainer").showModal();
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
  console.log(price);
  // console.log(id);
  const existingItem = carts.find((cart) => cart.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    carts.push({
      title: title,
      price: price,
      id: id,
      quantity: 1,
    });
  }
  alert(`${title} has been added to the cart`);
  showCartHandle(carts);
};

const showCartHandle = (carts) => {
  cartContainer.innerHTML = "";
  totalPrice = 0;
  // console.log(carts);
  carts.forEach((cart) => {
    cartContainer.innerHTML += `
    
    <div
              class="flex justify-between items-center p-3 bg-[#f0fdf4] rounded-lg"
            >
              <div>
                <h1>${cart.title}</h1>
                <p>৳${cart.price} x ${cart.quantity}</p>
              </div>
              <button onclick="deleteCart('${cart.id}')" class="btn btn-xs">❌</button>
            </div>


    `;

    const price = Number(cart.price);
    const quantity = Number(cart.quantity);
    console.log(price);
    totalPrice = (totalPrice + price) * quantity;
  });
  document.getElementById("totalPrice").innerText = totalPrice;
};

const deleteCart = (cartId) => {
  const item = carts.find((cart) => cart.id === cartId);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      carts = carts.filter((cart) => cart.id !== cartId);
    }
  }

  showCartHandle(carts);
};

const loadCategoryId = async (id, category) => {
  console.log(id, category);
  // console.log(category);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const data1 = await res.json();
  // console.log(data);
  const plants = data1.plants;
  // console.log(plants);
  displayLoadCategoryId(plants, category);
};

const displayLoadCategoryId = (data, category) => {
  const filteredCategory = data.filter((el) => el.category === category);
  displayLoadAllPlats(filteredCategory);
  // manageSpinner(false)
};

loadCategory();
loadAllPlats();
