import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiLoading, mdiPencilOutline} from "@mdi/js";

function NewRecipeModalForm({ ingredientsList, onComplete, recipe}) {
    // state for modal
    const [isShown, setIsShown] = useState({state: false});
    // state for form validation
    const [validated, setValidated] = useState(false);
    // default form data
    const defaultFormData = {
        name: "",
        description: "",
        ingredients: [],
    }
    // state where to save form data
    const [formData, setFormData] = useState(defaultFormData)

    const [addNewRecipeCall, setAddNewRecipeCall] = useState({
        state: "inactive"
    })

    useEffect(() => {
        if (recipe) {
            setFormData({
                name: recipe.name,
                description: recipe.description,
                ingredients: recipe.ingredients
            })
        }
    }, [recipe])

    // function to get new object for new ingredient
    const emptyIngredient = () => {
        return {amount: '', unit: '', id: ''}
    }

    // function to be able to store data into formData from name and description inputs
    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = {...formData};
            newData[name] = val;
            return newData;
        });
    };

    // function to be able to store data into formData.ingredients from other inputs
    const setIngredientsField = (inputName, value, index) => {
        return setFormData((formData) => {
            const newData = {...formData}
            newData.ingredients[index][inputName] = value
            return newData
        })
    }

    // handler to send data to server
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }
        //parseFloat all ingredients.amount to send data to server as a number
        const newData = {...formData}
        newData.ingredients.forEach((ing) => {
            ing.amount = parseFloat(ing.amount)
        })

        const payload = {...newData,
        id: recipe ? recipe.id : null};

        setAddNewRecipeCall({state: "pending"});
        const res = await fetch(`http://localhost:3000/recipe/${recipe ? "update" : "create"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setAddNewRecipeCall({state: "error", error: data});
        } else {
            console.log(data)
            setAddNewRecipeCall({state: "success", data});
        }

        if (typeof onComplete === 'function') {
            onComplete(data);
        }

        handleCloseModal();
    };

    //sorted ingredients list
    const sortedIngredientsList = ingredientsList.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    })

    // handlers to control modal
    const handleShowModal = (data) => setIsShown({state: true, data});
    const handleCloseModal = () => {
        setFormData(defaultFormData)
        setAddNewRecipeCall({state: 'inactive'})
        setValidated(false)
        setIsShown({state: false});
    }

    // to add group of empty inputs to be able to add new ingredient into formData
    const addNewIngredient = () => {
        const newData = {
            ...formData,
            ingredients: [...formData.ingredients, emptyIngredient()]
        }
        setFormData(newData)
    }

    // to remove one ingredient from list of ingredients
    const removeIngredient = (index) => {
        const newIngredientsList = [...formData.ingredients]
        newIngredientsList.splice(index, 1)

        const newData = {
            ...formData,
            ingredients: newIngredientsList
        }
        setFormData(newData)
    }

    // function to create new line of input group to add ingredient
    const ingredientInputGroup = (ingredient, index) => {
        return (
            <div className={"d-flex justify-content-center gap-1"} key={index}>
                <Form.Group className="mb-2 w-75" controlId="ingredients">
                    <Form.Select
                        value={ingredient.id}
                        onChange={(e) => setIngredientsField("id", e.target.value, index)}
                        required
                    >
                        <option value=""></option>
                        {sortedIngredientsList.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Vyber ingredienci
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="amount">
                    <Form.Control
                        placeholder="počet"
                        type="number"
                        step="any"
                        min={0}
                        value={ingredient.amount}
                        onChange={(e) => setIngredientsField("amount", e.target.value, index)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadej počet
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="unit">
                    <Form.Control
                        placeholder="jednotka"
                        value={ingredient.unit}
                        maxLength={15}
                        onChange={(e) => setIngredientsField("unit", e.target.value, index)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Zadej jednotku
                    </Form.Control.Feedback>
                </Form.Group>
                <div className={"mb-2"}>
                    <Button variant={"outline-danger"} onClick={() => removeIngredient(index)}>
                        X
                    </Button>
                    <div className={"invalid-feedback"}></div>
                </div>
                <Form.Control.Feedback type="invalid">
                    in
                </Form.Control.Feedback>
            </div>
        )
    }

    return <>
        <Modal show={isShown.state} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{recipe ? "Změna receptu" : "Nový recept"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate
                      validated={validated}
                      id={"form"}
                      onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="recipeName">
                        <Form.Label>Název receptu</Form.Label>
                        <Form.Control
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}
                            maxLength={150}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Název je povinný a nesmí být delší než 150 znaků
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            value={formData.description}
                            as="textarea"
                            rows={5}
                            maxLength={1500}
                            onChange={(e) => setField("description", e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Zadejte postup s maximální délkou 1500 znaků
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className={"d-flex flex-column"}>
                        <Form.Label>Ingredience</Form.Label>
                        {formData.ingredients.map((ing, index) => {
                            return ingredientInputGroup(ing, index)
                        })}
                    </div>

                    <Button variant={"primary"} className={"w-100"} onClick={addNewIngredient}>
                        Přidej ingredienci
                    </Button>

                    <div className={"d-flex justify-content-between mt-5"}>
                        <Button variant="secondary"  className={"w-50 me-1"}
                                onClick={handleCloseModal}>Odejít</Button>
                        <Button variant="success"
                                type="submit"
                                className={"w-50 ms-1"}
                                disabled={addNewRecipeCall.state === 'pending'}
                        >
                            {addNewRecipeCall.state === 'pending' ? (
                                <Icon size={0.8} path={mdiLoading} spin={true}/>
                            ) : (
                                recipe ? "Odeslat změny" : "Přidat recept"
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            {addNewRecipeCall.state === 'error' &&
                <Modal.Footer className="bg-danger fs-3 fw-bold justify-content-center text-uppercase text-dark">
                    Error: {addNewRecipeCall.error.errorMessage}
                </Modal.Footer>
            }
        </Modal>

        {recipe ?
            <div className={"d-flex w-100 justify-content-end"}>
                <Button onClick={handleShowModal} variant={"secondary me-1"} size={"sm"}>
                    <Icon
                        size={1}
                        path={mdiPencilOutline}
                    />
                </Button>
            </div>
            :
            <Button
                onClick={handleShowModal}
                variant="success"
                size="lg"
                className={"w-50 mt-4"}
            >
                Přidej recept
            </Button>
        }
    </>
}

export default NewRecipeModalForm