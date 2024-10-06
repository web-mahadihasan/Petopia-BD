
// Hamburger button functionality
document.getElementById("hamburger-btn").addEventListener("click", () => {
  const btn = document.getElementById("hamburger-menu");
  btn.classList.toggle("hidden")
  console.log(btn);
});



// Load category btn 
const loadCategory = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await res.json();
  const categories = data.categories;
  // console.log(categories)
  displayCategoriesBtn(categories);
}

// Load all pets card 
const loadPetsCard = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await res.json();
  const petsData = data.pets;
  // console.log(petsData)
  displayPetsData(petsData);
}

// Display category btn
const displayCategoriesBtn = (categories) => {
  const categoriesContainer = document.getElementById("category-btn-container");

  categories.forEach(btnData => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button class="flex items-center gap-1 py-3 px-16 border border-gray-200 rounded-xl justify-center ">
        <span><img src="${btnData.category_icon}" alt="" class="w-12"></span>
        <span class="font-bold text-text-black font-inter text-2xl">${btnData.category}</span>
      </button>
    `;

  categoriesContainer.append(div);
  });
};


// Display pets data card
const displayPetsData = (petsData) => {
  // console.log(petsData);
  
}











loadCategory();
loadPetsCard();