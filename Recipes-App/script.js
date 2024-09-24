document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '50d10e8fe75846ecb335fdaefac6f6f2';  // Ersetze dies durch deinen Spoonacular-API-Schlüssel
    const searchField = document.getElementById('search-field');

    // Funktion zum Holen von Rezeptdaten
    async function fetchRecipes(query) {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`);
        const data = await response.json();
        return data.results;
    }

    // Funktion zum Holen der Rezeptdetails
    async function fetchRecipeDetails(recipeId) {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const data = await response.json();
        return data;
    }

    // Funktion zum Verarbeiten der Rezeptdaten
    async function displayRecipes(recipes) {
        // Entferne vorhandene Ergebnisse
        let resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.remove();
        }

        // Neue Ergebnisse hinzufügen
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'results';
        document.body.appendChild(resultsContainer);

        // Iteriere über die Rezepte und zeige sie an
        for (const recipe of recipes) {
            const recipeDetails = await fetchRecipeDetails(recipe.id);

            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            const recipeTitle = document.createElement('h2');
            recipeTitle.textContent = recipe.title;

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;

            const recipeIngredients = document.createElement('ul');
            recipeDetails.extendedIngredients.forEach(ingredient => {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = ingredient.original;
                recipeIngredients.appendChild(ingredientItem);
            });

            const recipeInstructions = document.createElement('p');
            recipeInstructions.textContent = recipeDetails.instructions;

            recipeDiv.appendChild(recipeTitle);
            recipeDiv.appendChild(recipeImage);
            recipeDiv.appendChild(recipeIngredients);
            recipeDiv.appendChild(recipeInstructions);
            resultsContainer.appendChild(recipeDiv);
        }
    }

    // Event-Listener für das Suchfeld
    searchField.addEventListener('input', async (event) => {
        const query = event.target.value;
        if (query.length > 2) {  // Suche erst ab einer Mindestanzahl von Zeichen
            const recipes = await fetchRecipes(query);
            displayRecipes(recipes);
        }
    });
});
