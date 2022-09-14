import React, { useState, useMemo } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import RecipesListDetail from "./RecipesListDetail";
import RecipesListSmall from "./RecipesListSmall";
import RecipesListDev from "./RecipesListDev";
import styles from '../css/recipesList.module.css'

function RecipesList (props) {
    const [view, setView] = useState("detail");
    const isDetail = view === "detail";
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipesList = useMemo(() => {
        return props.recipesList.filter((item) => {
            if (view === "detail") {
                return (
                    item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            }
            else return (
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            )

        });
    }, [searchBy, props.recipesList, view]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    return (
        <div>
            <div className={"d-flex flex-column justify-content-evenly mt-5"}>
                <Form className="d-flex justify-content-center" onSubmit={handleSearch}>
                    <Form.Control
                        id={"searchInput"}
                        style={{ maxWidth: "150px" }}
                        type="search"
                        placeholder="Hledej"
                        aria-label="Search"
                        onChange={handleSearchDelete}
                    />
                    <Button
                        style={{ marginRight: "8px" }}
                        variant="outline-secondary"
                        type="submit"
                    >
                        <Icon size={1} path={mdiMagnify} />
                    </Button>
                </Form>
                <ButtonGroup className="d-flex justify-content-center">
                    <DropdownButton className="mt-2" as={ButtonGroup} title="zobrazení receptů" id="bg-nested-dropdown" variant="secondary">
                        <Dropdown.Item onClick={() => {setView("detail")}} eventKey="1">detail</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setView("basic")}} eventKey="2">náhled</Dropdown.Item>
                        <Dropdown.Item onClick={() => {setView("development")}} eventKey="3">tabulka</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </div>

            <div className={isDetail ? styles.recipesList : (view === "basic") ? styles.recipesListSmall : styles.recipesListDev}>
            {isDetail ? <RecipesListDetail  recipesList={filteredRecipesList} ingredientsList={props.ingredientsList}/> : (view === "basic" ? <RecipesListSmall recipesList={filteredRecipesList} ingredientsList={props.ingredientsList}/> : <RecipesListDev recipesList={filteredRecipesList}/>)}
            </div>
        </div>
    )
}



export default RecipesList