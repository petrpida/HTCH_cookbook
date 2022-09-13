import React from "react";
import Recipe from "./Recipe";
import styles from '../css/recipesList.module.css'

function RecipesList (props) {
    function getRecipesList(recipesList) {
        return recipesList.map ((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe} />
        })
    }
    return <div className={styles.recipesList}>{getRecipesList(props.recipesList)}</div>
}

export default RecipesList