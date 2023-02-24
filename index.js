// fetching the data from API mealDb

const melaDb = (foodName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then((res) => res.json())
    .then((data) => {
      const theMeals = data.meals;
      theMeals.map((meal) => makeItems(meal));
    });
};

const searchHanlder = () => {
  const userSearchKeyword = document.getElementById("user-search-keyword");
  const userSearch = userSearchKeyword.value;
  melaDb(userSearch);
  userSearchKeyword.value = "";
  const AllItems = document.getElementById("itemsAll");
  AllItems.innerHTML = "";
};

const makeItems = (meal) => {
  console.log(meal);
  const { strMeal, strInstructions, strMealThumb, idMeal } = meal;
  const items = document.createElement("div");
  console.log(meal);
  items.innerHTML = `
    <div class="flex border-2 gap-4">
   <div class="">
    <img class="object-right-top w-80 h-72 " src=${strMealThumb} alt="Barger">
   </div> 
    <div class="flex flex-col space-y-3 justify-center">
        <h1 class="text-xl font-semibold text-gray-600">${strMeal}</h1>
        <p class=" text-gray-600">${
          strInstructions ? strInstructions.slice(0, 45) : "No content"
        }</p>
        <label onclick="setModal(${idMeal})" for="mealDBModal" class="btn text-yellow-400 btn font-semibold">open modal</label>
    </div>
</div>

    `;

  const AllItems = document.getElementById("itemsAll");
  AllItems.appendChild(items);
};

const setModal = async (mealId) => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId} `;
  const res = await fetch(url);
  const data = await res.json();
  
  mysingleModal(data.meals[0]);


};

const mysingleModal = (meal)=>{
    console.log(meal);
 const { strMeal, strInstructions, strMealThumb, idMeal }= meal;
 
const modalTitle = document.getElementById('meal-title');
const modalDesc = document.getElementById('meal-desc');

modalTitle.innerText = strMeal;
modalDesc.innerText =   strInstructions ? strInstructions.slice(0, 45) : "No content";
const myModalImg= document.getElementById('modalImg');
myModalImg.src =strMealThumb;
console.log(myModalImg);

}