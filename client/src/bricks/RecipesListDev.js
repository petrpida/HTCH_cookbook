import React from "react";
import Table from "react-bootstrap/Table";

function RecipesListDev (props) {
    return (
    <Table>
        <thead>
        <tr>
            <th className="text-start">Název</th>
            <th className="text-end">ID receptu</th>
            {/*<th>Počet ingrediencí</th>*/}
        </tr>
        </thead>
        <tbody>
        {props.recipesList.map((recipe) => {
            return (
                <tr key={recipe.id}>
                    <td className="text-start">{recipe.name}</td>
                    <td className="text-end">{recipe.id}</td>
                    {/*<td>{recipe.ingredients.length}</td>*/}
                </tr>
            );
        })}
        </tbody>
    </Table>
);
}

export default RecipesListDev