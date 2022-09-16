import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {Form, Modal} from "react-bootstrap";

function NewRecipeModalForm(props) {
    //state for modal
    const [isShown, setIsShown] = useState(false);

    // state where to save form data
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [],
    })

    // function to get new object for new ingredient
    const emptyIngredient = () => {
        return {amount: '', unit: '', id: ''}
    }

    // function to be able to store data into formData from name and description inputs
    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    // function to be able to store data into formData.ingredients from other inputs
    const setIngredientsField = (inputName, value, index) => {
        return setFormData((formData) => {
            const newData = {...formData}

            /*if (inputName === 'id') {
                const ingName = props.ingredientsList.find(item => item.id === value).name
                console.log(ingName)
            }*/

            newData.ingredients[index][inputName] = value
            return newData
        })
    }

    // handler to send data to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {formData};
        console.log(payload);
    };

    //sorted ingredients list
    const sortedIngredientsList = props.ingredientsList.sort((a,b) => {
        if (a.name < b.name) {return -1}
        if (a.name > b.name) {return 1}
        return 0
    })

    // handlers to control modal
    const handleShowModal = () => setIsShown(true);
    const handleCloseModal = () => setIsShown(false);

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
                        placeholder="vyber ingredienci"
                        value={ingredient.id}
                        onChange={(e) => setIngredientsField("id", e.target.value, index)}>
                        >
                        <option>vyber ingredienci</option>
                        {sortedIngredientsList.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" controlId="amount">
                    <Form.Control
                        placeholder="zadej počet"
                        type="text"
                        value={ingredient.amount}
                        onChange={(e) => setIngredientsField("amount", parseInt(e.target.value, 10), index)}/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="unit">
                    <Form.Control
                        placeholder="jednotka"
                        value={ingredient.unit}
                        onChange={(e) => setIngredientsField("unit", e.target.value, index)}/>
                </Form.Group>
                <Button variant={"outline-danger"} size={"sm"} className={"mb-2"} onClick={() => removeIngredient(index)}>
                    X
                </Button>
            </div>
        )
    }

    return <>
        <Modal show={isShown} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nový recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id={"form"} onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="recipeName">
                        <Form.Label>Název receptu</Form.Label>
                        <Form.Control
                            onChange={(e) => setField("name", e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            as="textarea"
                            onChange={(e) => setField("description", e.target.value)}/>
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
                    <Button variant="danger" size="lg" className={"w-25"} onClick={handleCloseModal}>Odejít</Button>
                    <Button variant="success" type="submit" size="lg" className={"w-25"}>Odeslat</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
        <Button onClick={handleShowModal} variant="success" size="lg" className={"w-25 mt-4"}>Přidej recept</Button>
    </>
}

export default NewRecipeModalForm