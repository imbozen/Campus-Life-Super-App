let meals = JSON.parse(localStorage.getItem("meals")) || [
  {name:"Pancakes", category:"breakfast", diet:"gluten", votes:0},
  {name:"Veggie Bowl", category:"lunch", diet:"vegan", votes:0},
  {name:"Chicken Alfredo", category:"dinner", diet:"", votes:0}
];

function saveMeals() {
  localStorage.setItem("meals", JSON.stringify(meals));
}

function displayMeals(filteredMeals = meals) {
  let container = document.getElementById("meal-container");
  container.innerHTML = "";

  filteredMeals.forEach((meal, index) => {
    let col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card p-3 mb-3">
        <h5>${meal.name}</h5>
        <p>${meal.category}</p>
        <button class="btn btn-sm btn-success" onclick="vote(${index})">👍</button>
        <span>${meal.votes}</span>
      </div>
    `;

    container.appendChild(col);
  });
}

function vote(index) {
  meals[index].votes++;
  saveMeals();
  displayMeals();
}

function addMeal() {
  let input = document.getElementById("mealInput").value;

  if (!input) return;

  meals.push({name: input, category:"lunch", diet:"", votes:0});
  saveMeals();
  displayMeals();
}

function showCategory(category) {
  let filtered = meals.filter(m => m.category === category);
  displayMeals(filtered);
}

function filterDiet(type) {
  let filtered = meals.filter(m => m.diet === type);
  displayMeals(filtered);
}

function showAll() {
  displayMeals();
}

// API
function loadMeals() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
    .then(res => res.json())
    .then(data => {
      let container = document.getElementById("api-meals");
      container.innerHTML = "";

      data.meals.slice(0,3).forEach(meal => {
        let col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card p-2">
            <h6>${meal.strMeal}</h6>
            <img src="${meal.strMealThumb}" class="img-fluid">
          </div>
        `;

        container.appendChild(col);
      });
    });
}

displayMeals();