document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector("button");
  addButton.addEventListener("click", addRecipe);
  displayRecipes();
});

function addRecipe() {
  const nameInput = document.getElementById("recipe-name");
  const instructionsInput = document.getElementById("recipe-instructions");

  if (nameInput.value.trim() !== "" && instructionsInput.value.trim() !== "") {
    const recipe = {
      id: Date.now(),
      name: nameInput.value.trim(),
      instructions: instructionsInput.value.trim(),
    };

    let recipes = localStorage.getItem("recipes")
      ? JSON.parse(localStorage.getItem("recipes"))
      : [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    appendRecipeToList(recipe);

    nameInput.value = "";
    instructionsInput.value = "";
  }
}

function appendRecipeToList(recipe) {
  const recipesList = document.getElementById("recipes");
  const li = document.createElement("li");
  li.setAttribute("data-id", recipe.id);
  li.innerHTML = `${recipe.name}: ${recipe.instructions}
                    <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                    <button onclick="editRecipe(${recipe.id})">Edit</button>`;
  recipesList.appendChild(li);
}

function displayRecipes() {
  const recipes = localStorage.getItem("recipes")
    ? JSON.parse(localStorage.getItem("recipes"))
    : [];
  recipes.forEach((recipe) => {
    appendRecipeToList(recipe);
  });
}

function deleteRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  recipes = recipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  document.querySelector(`[data-id="${id}"]`).remove();
}

function editRecipe(id) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  const recipe = recipes.find((recipe) => recipe.id === id);
  const nameInput = document.getElementById("recipe-name");
  const instructionsInput = document.getElementById("recipe-instructions");

  nameInput.value = recipe.name;
  instructionsInput.value = recipe.instructions;

  deleteRecipe(id); // Remove the old recipe entry to avoid duplication on re-save
}
function appendRecipeToList(recipe) {
  const recipesList = document.getElementById("recipes");
  const li = document.createElement("li");
  li.setAttribute("data-id", recipe.id);
  li.innerHTML = `<div>${recipe.name}: ${recipe.instructions}</div>
                    <div class="buttons">
                        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                        <button onclick="editRecipe(${recipe.id})">Edit</button>
                    </div>`;
  recipesList.appendChild(li);
}
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector("button");
  addButton.addEventListener("click", addRecipe);
  document
    .getElementById("recipe-form")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the form from submitting
        addRecipe();
      }
    });
  displayRecipes();
});
