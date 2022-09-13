import React from "react";
import Card from 'react-bootstrap/Card';
import Icon from "@mdi/react";
import styles from '../css/recipe.module.css'
import { mdiFoodTurkey } from '@mdi/js';

function Recipe(props) {
    return (
        <Card className={styles.cardRecipe}>
            <Card.Img variant="top" src={props.recipe.imgUri} />
            <Card.Body>
                    <Card.Title>
                        <div className={styles.cardTitle}>
                            <Icon path={mdiFoodTurkey} size={2} color="grey" />{" "}
                            {props.recipe.name}
                        </div>
                    </Card.Title>
                    <Card.Text>{props.recipe.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Recipe;