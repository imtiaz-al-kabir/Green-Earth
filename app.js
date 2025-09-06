const categoryContainer = document.getElementById("catContainer");

const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
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

loadCategory();
