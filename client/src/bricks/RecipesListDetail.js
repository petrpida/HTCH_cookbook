import React from "react";
import Recipe from "./Recipe";

function RecipesListDetail (props) {
    return props.recipesList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} mode="detail" ingredientsList={props.ingredientsList}/>
    })
}

export default RecipesListDetail
