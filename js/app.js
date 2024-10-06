
// Hamburger button functionality
document.getElementById("hamburger-btn").addEventListener("click", () => {
  const btn = document.getElementById("hamburger-menu");
  btn.classList.toggle("hidden")
  console.log(btn);
});

// gets all elements 
const petCardsContainer = document.getElementById("pet-cards-container");

// Load category btn 
const loadCategory = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await res.json();
  const categories = data.categories;
  displayCategoriesBtn(categories);
}

// Load all pets card 
const loadPetsCard = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await res.json();
  const allPets = data.pets;
  displayPetsData(allPets);
}

// Category btn functionality & show category pets
const categoriesPetsDisplay = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
  const data = await res.json();
  const categoryData = data.data;
  displayPetsData(categoryData);
}

// Display category btn
const displayCategoriesBtn = (categories) => {
  const categoriesContainer = document.getElementById("category-btn-container");

  categories.forEach(btnData => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="categoriesPetsDisplay('${btnData.category}')" class="flex items-center gap-1 py-3 px-16 border border-gray-200 rounded-xl justify-center ">
        <span><img src="${btnData.category_icon}" alt="" class="w-12"></span>
        <span class="font-bold text-text-black font-inter text-2xl">${btnData.category}</span>
      </button>
    `;
  categoriesContainer.append(div);
  });
};


// Display pets data card
const displayPetsData = (allPets) => {
  petCardsContainer.innerHTML = "";
  
  sortedData(allPets);
  
  allPets.forEach(petsData => {
    const { breed, image, pet_name, date_of_birth, gender, price } = petsData;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class=" bg-base-100 shadow border border-gray-100 p-4 gap-4 rounded-xl">
        <figure>
          <img src="${image}" alt="Shoes"
          class="rounded-xl h-[200px] w-full" />
        </figure>
        <div class="py-4 space-y-1">
          <h2 class="font-inter font-bold text-xl text-text-black">${pet_name || "Not found"}</h2>

          <div class="text-secondary-color font-lato">
            <span><i class="ri-function-add-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Breed: <span>${breed || "Not found"}</span></span>
          </div>
          <div class="text-secondary-color font-lato">
            <span><i class="ri-calendar-schedule-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Birth: <span>${date_of_birth || "Not found"}</span></span>
          </div>
          <div class="text-secondary-color font-lato">
            <span><i class="ri-share-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Gender: <span>${gender || "Not found"}</span></span>
          </div>
          <div class="pb-1 text-secondary-color font-lato">
            <span><i class="ri-money-dollar-circle-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Price : <span>Price : ${price || "Not available"}</span></span>
          </div>

          <div class="border-t border-gray-200"></div>

          <div class="pt-3 flex justify-between items-center">
            <button class="flex flex-col py-1 px-4 rounded-md border border-primary-color/20 font-lato text-xl text-gray-500">
              <span><i class="ri-thumb-up-line"></i></span>
              <span class="hidden"><i class="ri-thumb-up-fill"></i></span>
            </button>
            <button class="py-1 px-4 rounded-md border border-primary-color/20 font-semibold font-lato text-lg text-primary-color">Adopt</button>
            <button class="py-1 px-4 rounded-md border border-primary-color/20 font-semibold font-lato text-lg text-primary-color">Details</button>
          </div>
        </div>
      </div>
    `;

    petCardsContainer.append(div);
  });
}



const sortedData = (sortData) => {
  const sortBtn = document.getElementById("sort-btn");
  sortBtn.addEventListener("click", () => {
    sortData.sort(function(first, second){
      const price1 = first.price;
      const price2 = second.price;

      if(price1 > price2){
        return -1
      }else if(price1 < price2){
        return 1
      } 
      return 0
      
    })
    displayPetsData(sortData);
  });
};



loadCategory();
loadPetsCard();