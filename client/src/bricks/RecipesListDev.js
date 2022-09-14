import React from "react";
import Table from "react-bootstrap/Table";

function RecipesListDev (props) {
    return (
    <Table>
        <thead>
        <tr>
            <th>Název</th>
            <th>ID receptu</th>
            <th>Počet ingrediencí</th>
        </tr>
        </thead>
        <tbody>
        {props.recipesList.map((recipe) => {
            return (
                <tr key={recipe.id}>
                    <td>{recipe.name}</td>
                    <td>{recipe.id}</td>
                    <td>{recipe.ingredients.length}</td>
                </tr>
            );
        })}
        </tbody>
    </Table>
);
}

export default RecipesListDev