import Recipe from "./Recipe";

function RecipesListDetail (props) {

    const handleDeletedRecipe = (id) => {
        props.onDelete(id)
    }

    return props.recipesList.map((recipe) => {
        return <Recipe key={recipe.id}
                       recipe={recipe}
                       mode={props.view === "detail" ? "detail" : "basic"}
                       ingredientsList={props.ingredientsList}
                       onDeletedRecipe={handleDeletedRecipe}/>
    })
}

export default RecipesListDetail
