import React from "react";
import Recipe from "./Recipe";

function RecipesListDetail (props) {
    const ingredientsList = props.ingredientsList

    return props.recipesList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} mode="detail" ingredientsList={ingredientsList}/>
    })
}

export default RecipesListDetail
