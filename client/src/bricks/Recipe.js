import {useContext, useState} from "react";
import NewRecipeModalForm from "./NewRecipeModalForm";
import RecipeDelete from "./RecipeDelete";
import UserContext from "../UserProvider";
import {Alert, Card} from "react-bootstrap";
import styles from '../css/recipe.module.css'

function Recipe(props) {
    const {isAuthorized} = useContext(UserContext)
    const [deleteRecipeError, setDeleteRecipeError] = useState('');
    const mode = props.mode
    const ingredientsList = props.ingredientsList
    const [recipeData, setRecipeData] = useState(props.recipe)
    const shortIngredientsList = recipeData.ingredients.slice(0, 4)

    const callOnComplete = (recipe) => {
        setRecipeData(recipe)
    }

    const onDeleteCall = (id) => {
        props.onDeletedRecipe(id)
    }

    return (
        <Card className={styles.cardRecipe}>
            {deleteRecipeError &&
                <Alert
                    variant="danger">
                    Error: {deleteRecipeError}
                </Alert>
            }
            <Card.Title className={styles.cardTitle}>
                {isAuthorized &&
                    <div className={"d-flex justify-content-between w-100"}>
                        <NewRecipeModalForm ingredientsList={props.ingredientsList}
                                            recipe={recipeData}
                                            onComplete={callOnComplete}/>
                        <RecipeDelete onDelete={onDeleteCall}
                                      onError={(error) => setDeleteRecipeError(error)}
                                      recipe={recipeData}
                        ></RecipeDelete>
                    </div>}
                <div className={isAuthorized ? styles.title : "h-100 d-flex align-items-center"}>
                    {recipeData.name}
                </div>
            </Card.Title>
            <Card.Img variant="top" src={props.recipe.imgUri}/>
            <Card.Body>
                <Card.Text className={mode === "detail" ? '' : 'text-truncate'}>
                    {recipeData.description}
                </Card.Text>
                {props.mode === "basic" &&
                    <ul className="list-group list-group-flush">
                        {shortIngredientsList
                            .map((item) => {
                                return <li key={item.id}
                                           className="text-center ps-2 list-group-item">
                                    {ingredientsList.find(el => el.id === item.id).name}
                                </li>
                            })}
                    </ul>}
            </Card.Body>
        </Card>
    );
}

export default Recipe;