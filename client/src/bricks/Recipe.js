import React from "react";
import Card from 'react-bootstrap/Card';
import Icon from "@mdi/react";
import styles from '../css/recipe.module.css'
import { mdiFoodTurkey } from '@mdi/js';

function Recipe(props) {
    const mode = props.mode
    const shortIngredientsList = props.recipe.ingredients.slice(0, 4)
    const ingredientsList = props.ingredientsList

    return (
        <Card className={styles.cardRecipe}>
            <Card.Img variant="top" src={props.recipe.imgUri}/>
            <Card.Body>
                    <Card.Title>
                        <div className={styles.cardTitle}>
                            <Icon path={mdiFoodTurkey} size={2} color="grey" />{" "}
                            {props.recipe.name}
                        </div>
                    </Card.Title>
                    <Card.Text className={mode === "detail" ? '' : 'text-truncate'}>
                        {props.recipe.description}
                    </Card.Text>
                    {props.mode === "basic" ?
                        <ul className="list-group list-group-flush">
                            {shortIngredientsList
                                .map((item) => {
                                    return <li key={item.id} className="text-center ps-2 list-group-item">{ingredientsList.find(el => el.id === item.id).name}</li>
                                })}
                        </ul> : <></>}
            </Card.Body>
        </Card>
    );
}

export default Recipe;