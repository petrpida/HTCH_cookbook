import React from "react";
import Recipe from "./Recipe";

function RecipesListSmall (props) {
    const ingredientsList = props.ingredientsList
    const recipesList = props.recipesList

    return recipesList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} mode="basic" ingredientsList={ingredientsList}/>
    })
}

export default RecipesListSmall