import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import styles from '../css/recipe.module.css'
import NewRecipeModalForm from "./NewRecipeModalForm";

function Recipe(props) {
    const mode = props.mode
    const ingredientsList = props.ingredientsList
    const [recipeData, setRecipeData] = useState(props.recipe)
    const shortIngredientsList = recipeData.ingredients.slice(0, 4)

    //console.log(recipeData)

    const callOnComplete = (recipe) => {
        setRecipeData(recipe)
    }

    return (
        <Card className={styles.cardRecipe}>
            <Card.Title className={styles.cardTitle}>
                <NewRecipeModalForm ingredientsList={props.ingredientsList} recipe={recipeData} onComplete={callOnComplete}/>
                <div className={styles.title}>{recipeData.name}</div>
            </Card.Title>
            <Card.Img variant="top" src={props.recipe.imgUri}/>
            <Card.Body>
                <Card.Text className={mode === "detail" ? '' : 'text-truncate'}>
                    {recipeData.description}
                </Card.Text>
                {props.mode === "basic" ?
                    <ul className="list-group list-group-flush">
                        {shortIngredientsList
                            .map((item) => {
                                return <li key={item.id}
                                           className="text-center ps-2 list-group-item">{ingredientsList.find(el => el.id === item.id).name}</li>
                            })}
                    </ul> : <></>}
            </Card.Body>
        </Card>
    );
}

export default Recipe;