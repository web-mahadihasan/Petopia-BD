
// Hamburger button functionality
document.getElementById("hamburger-btn").addEventListener("click", () => {
  const btn = document.getElementById("hamburger-menu");
  btn.classList.toggle("hidden")
  console.log(btn);
});

// gets all elements 
const petCardsContainer = document.getElementById("pet-cards-container");
const petsNotFoundContainer = document.getElementById("pets-not-found");



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

let lastCategoryBtnClick = null;
// Category btn functionality & show category pets
const categoriesPetsDisplay = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
  const data = await res.json();
  const categoryData = data.data;
  displayPetsData(categoryData);

  //category btn active color add & remove
  const allCategoryBtn = document.getElementsByClassName("category-btn");
  for(const btn of allCategoryBtn){
    btn.classList.add("border-gray-200", "rounded-xl");
    btn.classList.remove("rounded-full", "border-primary-color/50", "bg-primary-color/10");
  }
  
  const activeStyles = document.getElementById(`${category}`);
    activeStyles.classList.remove("border-gray-200", "rounded-xl");
    activeStyles.classList.add("rounded-full", "border-primary-color/50", "bg-primary-color/10");
}


// Display category btn
const displayCategoriesBtn = (categories) => {
  const categoriesContainer = document.getElementById("category-btn-container");

  categories.forEach(btnData => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="${btnData.category}" onclick="categoriesPetsDisplay('${btnData.category}')" class="category-btn flex items-center gap-1 py-3 px-16 border border-gray-200 rounded-xl justify-center ">
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
  
  if(allPets.length === 0){
    petsNotFoundContainer.classList.remove("hidden");
  }else{
    petsNotFoundContainer.classList.add("hidden");
  }

  sortedData(allPets);
  
  allPets.forEach(petsData => {
    const {petId, breed, image, pet_name, date_of_birth, gender, price } = petsData;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class=" bg-base-100 shadow border border-gray-100 p-4 gap-4 rounded-xl">
        <figure>
          <img src="${image}" alt="Shoes"
          class="rounded-xl h-[200px] w-full object-cover" />
        </figure>
        <div class="py-4 space-y-1">
          <h2 class="font-inter font-bold text-xl text-text-black">${
            pet_name || "Not found"
          }</h2>

          <div class="text-secondary-color font-lato">
            <span><i class="ri-function-add-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Breed: <span>${
              breed || "Not found"
            }</span></span>
          </div>
          <div class="text-secondary-color font-lato">
            <span><i class="ri-calendar-schedule-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Birth: <span>${
              date_of_birth || "Not found"
            }</span></span>
          </div>
          <div class="text-secondary-color font-lato">
            <span><i class="ri-share-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Gender: <span>${
              gender || "Not found"
            }</span></span>
          </div>
          <div class="pb-1 text-secondary-color font-lato">
            <span><i class="ri-money-dollar-circle-line text-xl font-medium align-middle"></i></span>
            <span class="ml-1">Price : <span>Price : ${
              price || "Not available"
            }</span></span>
          </div>

          <div class="border-t border-gray-200"></div>

          <div class="pt-3 flex justify-between items-center">
            <button onclick="likedPets(${petId})" class="flex flex-col py-1 px-4 rounded-md border border-primary-color/20 font-lato text-xl text-gray-500">
              <span id="normal-${petId}"><i class="ri-thumb-up-line"></i></span>
              <span id="liked-${petId}" class="hidden text-primary-color"><i class="ri-thumb-up-fill"></i></span>
            </button>
            <button class="py-1 px-4 rounded-md border border-primary-color/20 font-semibold font-lato text-lg text-primary-color">Adopt</button>
            <button onclick="showDetails(${petId})" class="py-1 px-4 rounded-md border border-primary-color/20 font-semibold font-lato text-lg text-primary-color">Details</button>
          </div>
        </div>
      </div>
    `;

    petCardsContainer.append(div);
  });
}


// Data sorted by price 
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


// Like button functionality
const likedPets = async (id) => {
  const likeUnClick = document.getElementById(`normal-${id}`);
  likeUnClick.classList.add("hidden");
  const likeClick = document.getElementById(`liked-${id}`);
  likeClick.classList.remove("hidden")

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  const data = await res.json();
  const petDataByID = data.petData;
  likePetsImageDisplay(petDataByID);
}

const likePetsImageDisplay = (petDataByID) => {
  const likedPetImagesContainer =document.getElementById("liked-pet-image-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <div>
      <img src="${petDataByID.image}" alt="" class="h-[120px] w-full rounded-lg object-cover">
    </div>
  `;
  likedPetImagesContainer.append(div);
};

// Show Details functionality 
const showDetails = async (detailsId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
  const data = await res.json();
  const detailsData = data.petData;
  petDetailsDisplay(detailsData);
} 

const petDetailsDisplay = (detailsData) => {
  const modalContainer = document.getElementById("modal-container");

  const {breed, image, pet_name, date_of_birth, gender, price, vaccinated_status, pet_details } = detailsData;
  modalContainer.innerHTML = `
            <dialog id="customModal" class="modal">
          <div class="modal-box p-8">
            <figure>
              <img src="${image}" alt="Shoes"
                class="rounded-xl h-full w-full" />
            </figure>
            <div class="py-4 space-y-1">
              <h2 class="font-inter font-bold text-xl py-2 text-text-black">${pet_name || "Not found"}</h2>
              <div class="flex justify-between pb-4">

                <div class="space-y-2">
                  <div class="text-secondary-color font-lato">
                    <span><i class="ri-function-add-line text-xl font-medium align-middle"></i></span>
                    <span class="ml-1">Breed: <span>${breed || "Not found"}</span></span>
                  </div>
                  <div class="text-secondary-color font-lato">
                    <span><i class="ri-share-line text-xl font-medium align-middle"></i></span>
                    <span class="ml-1">Gender: <span>${gender || "Not found"}</span></span>
                  </div>
                  <div class="text-secondary-color font-lato">
                    <span><i class="ri-share-line text-xl font-medium align-middle"></i></span>
                    <span class="ml-1">Vaccinated status: <span>${vaccinated_status || "Not found"}</span></span>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-secondary-color font-lato">
                    <span><i class="ri-calendar-schedule-line text-xl font-medium align-middle"></i></span>
                    <span class="ml-1">Birth: <span>${date_of_birth || "Not found"}</span></span>
                  </div>
                  <div class=" text-secondary-color font-lato">
                    <span><i class="ri-money-dollar-circle-line text-xl font-medium align-middle"></i></span>
                    <span class="ml-1">Price : <span>Price : ${price || "Not available"}</span></span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200"></div>
              <div class="pt-5">
                <h3 class="text-lg font-bold font-inter text-text-black font-inter">Details Information</h3>
                <p class="text-base py-3 font-normal font-inter text-secondary-color"> ${pet_details || "Not found"}
                </p>
              </div>
            </div>

            <div class="w-full">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn w-full bg-[#EFF2F2] border border-primary-color/20 hover:bg-primary-color hover:text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  `;

  customModal.showModal();

}



loadCategory();
loadPetsCard();