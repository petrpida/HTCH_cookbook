import React from "react";
import Recipe from "./Recipe";

function RecipesListSmall (props) {
    return props.recipesList.map((recipe) => {
        return <Recipe key={recipe.id} recipe={recipe} mode="basic"/>
    })
}

export default RecipesListSmall