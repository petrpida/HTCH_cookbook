import React, { useState, useEffect } from "react";
import './App.css';
import RecipesList from "./bricks/RecipesList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function App() {
    const [cookbookData, setCookbookData] = useState({
        state: "pending",
    })
    const [ingredientsData, setIngredientsData] = useState({
        state: "pending"
    })

    useEffect(() => {
        fetch('/recipe/list', {method: "GET"})
            .then(async (response) => {
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setCookbookData({state: "error", error: responseJson})
                } else {
                    setCookbookData({state: "success", data: responseJson})
                }
            })
    }, [])

    useEffect(() => {
        fetch('/ingredient/list', {method: "GET"})
            .then(async (response) => {
                const responseJson = await response.json();
                if (response.status >= 400) {
                    setIngredientsData({state: "error", error: responseJson})
                } else {
                    setIngredientsData({state: "success", data: responseJson})
                }
            })
    }, [])

    function getChild() {
        switch (cookbookData.state) {
            case "pending":
                return (
                    // <div className={styles.loading}>
                    <div>
                        <Icon size={3} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <>
                        <div className='display-4 text-decoration-underline'>Recepty</div>
                        <RecipesList recipesList={cookbookData.data} ingredientsList={ingredientsData.data} />
                    </>
                );
            case "error":
                return (
                    // <div className={styles.error}>
                    <div>
                        <div>Nepodařilo se načíst recepty.</div>
                        <br />
                        <pre>{JSON.stringify(cookbookData.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
    <div className="App">
        {cookbookData && ingredientsData && getChild()}
    </div>
  );
}

export default App;
