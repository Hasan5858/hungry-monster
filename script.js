
const loadItem = async (url) => {

    const promiseData = await fetch(url);
    const jsonData = await promiseData.json();
    return jsonData;
}


// search meal
document.getElementById('searchBtn').addEventListener('click', () => {
    const mealContainer = document.getElementById('meal-container');
    const notifyDiv = document.getElementById('notify');
    const mealName = document.getElementById('input-meal').value;
    // document.childNodes
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const rceiveData = loadItem(apiUrl);

    rceiveData.then(data => {
        if (data.meals) {
            const meal = data.meals[0];
            const div = document.createElement('div');
            div.setAttribute('class', 'col-md-3')
            div.innerHTML = `
            <div class="card meal-item" style="width: 17rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <input type="hidden" value="${meal.idMeal}">
                <h5 class="card-text"> ${meal.strMeal}</h5>
            </div>`;
            mealContainer.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.setAttribute('class', 'col-md-3')
            div.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Sorry! <strong>${mealName} </strong> not available.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            notifyDiv.appendChild(div);
        }
    });

});

// meal details
document.getElementById('meal-container').addEventListener('click', (event) => {
    const parentNode = event.target.parentNode;
    const mealId = parentNode.childNodes[3].value;
    if (mealId) {
        const mealDetailApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const receiveMealDetails = loadItem(mealDetailApi);
        receiveMealDetails.then(data => {
            const meal = data.meals[0];
            const ingredient = [];
            ingredient.push(meal.strIngredient1);
            ingredient.push(meal.strIngredient2);
            ingredient.push(meal.strIngredient3);
            ingredient.push(meal.strIngredient4);
            ingredient.push(meal.strIngredient5);

            const ingredientDiv = document.getElementById('ingredient')
            for (let i = 0; i < ingredient.length; i++) {
                const item = ingredient[i];
                const p = document.createElement('p');
                p.innerHTML = `
            <img class="ingresient-img" src="image/right-icon.png"> ${item}`;
                ingredientDiv.appendChild(p);
            }

            document.getElementById('meal-name').innerText = meal.strMeal;
            document.getElementById('meal-image').src = meal.strMealThumb;
        })
        const mealModal = new bootstrap.Modal(document.getElementById('mealModal'));
        mealModal.show();
    }
})
