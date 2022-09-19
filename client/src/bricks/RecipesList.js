import React, {useState, useMemo, useContext} from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import {mdiMagnify} from "@mdi/js";
import RecipesListDetail from "./RecipesListDetail";
import RecipesListDev from "./RecipesListDev";
import NewRecipeModalForm from "./NewRecipeModalForm";
import styles from '../css/recipesList.module.css'
import {Container, Navbar} from "react-bootstrap";
import UserContext from "../UserProvider";

function RecipesList(props) {
    const {isAuthorized} = useContext(UserContext)
    const [view, setView] = useState("detail");
    const isDetail = view === "detail";
    const isBasic = view === "basic";
    const [searchBy, setSearchBy] = useState("");
    const [recipesList, setRecipesList] = useState(props.recipesList)

    const filteredRecipesList = useMemo(() => {
        return recipesList.filter((item) => {
            if (view === "detail") {
                return (
                    item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            } else return (
                item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            )
        });
    }, [searchBy, recipesList, view]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    const callOnComplete = (data) => {
        const newRecipesList = [...props.recipesList, data]
        setRecipesList(newRecipesList)
    }

    const callOnDelete = (recipeId) => {
        const newRecipesList = [...props.recipesList]
        setRecipesList(newRecipesList.filter(recipe => recipe.id !== recipeId))
    }

    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg="light" className={"p-3"}>
                <Container fluid>
                    <Navbar.Brand>Recepty</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse style={{justifyContent: "right"}}>
                        <Form className="d-flex justify-content-center mt-2 mt-sm-0" onSubmit={handleSearch}>
                            <Form.Control
                                id={"searchInput"}
                                style={{maxWidth: "150px"}}
                                type="search"
                                placeholder="Hledej"
                                aria-label="Search"
                                onChange={handleSearchDelete}
                            />
                            <Button
                                className={"me-2"}
                                variant="outline-success"
                                type="submit"
                            >
                                <Icon size={0.8} path={mdiMagnify}/>
                            </Button>
                        </Form>
                        <DropdownButton className="mt-2 mt-sm-0" as={ButtonGroup} title="Zobrazení receptů"
                                        id="bg-nested-dropdown" variant="secondary">
                            <Dropdown.Item onClick={() => {
                                setView("detail")
                            }} eventKey="1">detail</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setView("basic")
                            }} eventKey="2">náhled</Dropdown.Item>
                            <Dropdown.Item className={"d-none d-md-block"} onClick={() => {
                                setView("development")
                            }} eventKey="3">tabulka</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {isAuthorized && <NewRecipeModalForm ingredientsList={props.ingredientsList} onComplete={callOnComplete}/>}

            <div className={(view === "basic" || view === "detail") ? styles.recipesList : styles.recipesListDev}>
                {isDetail || isBasic ?
                    <RecipesListDetail
                        onDelete={callOnDelete}
                        recipesList={filteredRecipesList}
                        ingredientsList={props.ingredientsList}
                        view={view}/>
                :
                    <RecipesListDev recipesList={filteredRecipesList}/>
                }
            </div>
        </>
    )
}


export default RecipesList