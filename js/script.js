// Load meals from localStorage or default data
let meals = JSON.parse(localStorage.getItem("meals")) || [
  { name: "Pancakes", category: "breakfast", diet: "gluten", votes: 0 },
  { name: "Veggie Bowl", category: "lunch", diet: "vegan", votes: 0 },
  { name: "Chicken Alfredo", category: "dinner", diet: "", votes: 0 }
];

// Save meals to localStorage
function saveMeals() {
  localStorage.setItem("meals", JSON.stringify(meals));
}

// Display meals (reusable function)
function displayMeals(mealList = meals) {
  const container = document.getElementById("meal-container");
  container.innerHTML = "";

  mealList.forEach((meal, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6";

    col.innerHTML = `
      <div class="card shadow-sm mb-4 h-100">
        <div class="card-body text-center">
          <h5 class="card-title">${meal.name}</h5>
          <p class="text-muted">${meal.category}</p>
          <button class="btn btn-outline-success btn-sm" onclick="vote(${index})">
            👍 Vote
          </button>
          <p class="mt-2 mb-0"><strong>${meal.votes}</strong> votes</p>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// Voting system (fixed persistence)
function vote(index) {
  meals[index].votes++;
  saveMeals();
  displayMeals();
}

// Add new meal (with validation)
function addMeal() {
  const input = document.getElementById("mealInput");
  const value = input.value.trim();

  if (!value) {
    alert("Please enter a meal name.");
    return;
  }

  meals.push({
    name: value,
    category: "lunch",
    diet: "",
    votes: 0
  });

  saveMeals();
  displayMeals();

  input.value = "";
}

// Filter by category
function showCategory(category) {
  const filtered = meals.filter(meal => meal.category === category);
  displayMeals(filtered);
}

// Filter by diet
function filterDiet(type) {
  const filtered = meals.filter(meal => meal.diet === type);
  displayMeals(filtered);
}

// Show all meals
function showAll() {
  displayMeals();
}

// Improved API with error handling
function loadMeals() {
  const container = document.getElementById("api-meals");
  container.innerHTML = "<p>Loading meals...</p>";

  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.meals.slice(0, 3).forEach(meal => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card shadow-sm">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h6>${meal.strMeal}</h6>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch(error => {
      container.innerHTML = "<p>Error loading meals. Try again later.</p>";
      console.error(error);
    });
}

// Initial render
displayMeals();