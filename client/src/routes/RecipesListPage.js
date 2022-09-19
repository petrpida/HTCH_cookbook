import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import RecipesList from "../bricks/RecipesList";


function RecipesListPage() {
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
        const isPending = cookbookData.state === 'pending' || ingredientsData.state === 'pending'
        const isSuccess = cookbookData.state === 'success' && ingredientsData.state === 'success'
        const isError = cookbookData.state === 'error' || ingredientsData.state === 'error'

        if (isPending) {
            return (
                <div className={"d-flex flex-column justify-content-center align-items-center h-50 "}>
                    <Icon size={3} path={mdiLoading} spin={true}/>
                    <span className={"fs-3"}>LOADING</span>
                </div>
            )
        } else if (isSuccess) {
            return (
                <>
                    <RecipesList recipesList={cookbookData.data} ingredientsList={ingredientsData.data}/>
                </>
            );
        } else if (isError) {
            return (
                <div>
                    <div>Nepodařilo se načíst recepty.</div>
                    <br/>
                    <pre>{JSON.stringify(cookbookData.error, null, 2)}</pre>
                </div>
            );
        }
        return null
    }

    return getChild()
}

export default RecipesListPage