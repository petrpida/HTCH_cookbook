import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {Form, Modal} from "react-bootstrap";

function NewRecipeModalForm(props) {

    const emptyIngredient = () => {
        return {amount: 0, unit: '', id: ''}
    }

    // state where to save form data
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [
        ],
    })

    // function to be able to store data into formData from each input
    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    const setIngredientField = (inputName, val, index) => {

        return setFormData((formData) => {
            const newData = {...formData}

            // if (inputName === 'id') {
            //     const ing = props.ingredientsList.find(el => el.id === val)
            //     newData.ingredients[index]['ingredientName'] = ing.name
            // }

            newData.ingredients[index][inputName] = val
            return newData
        })
    }

    // handler to send data to server
    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log(formData)
    };

    const addEmptyIngredient = () => {
        const newFormData = {
            ...formData,
            ingredients: [...formData.ingredients, emptyIngredient()]
        }
        setFormData(newFormData)
    }

    function removeIngredient(index) {
        const newIngredients = [...formData.ingredients]
        newIngredients.splice(index, 1)


        const newFormData = {
            ...formData,
            ingredients: newIngredients
        }
        setFormData(newFormData)
    }

    //state for modal
    const [isShown, setIsShown] = useState(false);

    //sorted ingredients list
    const ingredientsList = props.ingredientsList
    const sortedIngredientsList = ingredientsList.sort((a,b) => {
        if (a.name < b.name) {return -1}
        if (a.name > b.name) {return 1}
        return 0
    })

    // handlers to control modal
    const handleShowModal = () => setIsShown(true);
    const handleCloseModal = () => setIsShown(false);

    // function to create new line of input group to add ingredient
    const ingredienceInputGroup = (ingredient, index) => {
        return (
            <div key={index} className={"d-flex justify-content-center gap-1"}>
                <Form.Group className="mb-1 w-75" controlId="ingredients">
                    <Form.Label>Ingdredience</Form.Label>
                    <Form.Select
                        value={ingredient.id}
                        onChange={(e) => setIngredientField("id",e.target.value, index)}>
                        <option></option>
                        {sortedIngredientsList.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-1" controlId="amount">
                    <Form.Label>Počet</Form.Label>
                    <Form.Control type="number"
                                  value={ingredient.amount}
                                  onChange={(e) => setIngredientField("amount", parseInt(e.target.value), index)}
                    />
                </Form.Group>

                <Form.Group className="mb-1" controlId="unit">
                    <Form.Label>Jednotka</Form.Label>
                    <Form.Control
                        value={ingredient.unit}
                        onChange={(e) => setIngredientField("unit",e.target.value, index)}/>
                </Form.Group>

                <Button onClick={() => removeIngredient(index)}>
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

                    {
                        formData.ingredients.map((ing, index) => {
                            return ingredienceInputGroup(ing, index)
                        })
                    }

                    <Button onClick={addEmptyIngredient}>
                        Add
                    </Button>

                    {/*{customInputGroup(0)}*/}
                    {/*{customInputGroup(1)}*/}
                    {/*{customInputGroup(2)}*/}
                    <div className={"d-flex justify-content-between mt-5"}>
                    <Button variant="danger" size="lg" className={"w-25"} onClick={handleCloseModal}>Odejít</Button>
                    <Button variant="success" type="submit" size="lg" className={"w-25"}>Odeslat</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
        <Button onClick={handleShowModal} variant="success" size="lg" className={"w-25"}>Přidej recept</Button>
    </>
}

export default NewRecipeModalForm