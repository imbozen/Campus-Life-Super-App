// CATEGORY FILTER
function showCategory(category) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// SHOW ALL
function showAll() {
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = "block";
  });
}

// DIET FILTER
function filterDiet(type) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (card.dataset.diet === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// VOTING SYSTEM
function vote(button) {
  let voteSpan = button.nextElementSibling;
  let count = parseInt(voteSpan.innerText);
  count++;
  voteSpan.innerText = count;
}

// ADD MEAL (USER INPUT)
function addMeal() {
  let input = document.getElementById("mealInput");
  let value = input.value;

  if (value === "") return;

  let container = document.getElementById("meal-container");

  let newCard = document.createElement("div");
  newCard.classList.add("card");

  newCard.innerHTML = `
    ${value}
    <button onclick="vote(this)">👍</button>
    <span class="votes">0</span>
  `;

  container.appendChild(newCard);

  input.value = "";
}

// API FETCH (TheMealDB)
function loadMeals() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
    .then(res => res.json())
    .then(data => {
      let container = document.getElementById("api-meals");
      container.innerHTML = "";

      data.meals.forEach(meal => {
        let div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
          <h4>${meal.strMeal}</h4>
          <img src="${meal.strMealThumb}" width="100">
        `;

        container.appendChild(div);
      });
    });
}