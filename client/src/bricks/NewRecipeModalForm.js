import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {Form, Modal} from "react-bootstrap";

function NewRecipeModalForm(props) {
    // state where to save form data
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients: [{name: '', amount: '', unit: ''}]
    })

    // function to be able to store data to formData from each input
    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name] = val;
            return newData;
        });
    };

    // handler to send data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {formData};

        console.log(payload);
    };

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
    const customInputGroup = () => {
        return (
            <div className={"d-flex justify-content-center gap-1"}>
                <Form.Group className="mb-1 w-75" controlId="ingredients">
                    <Form.Select>
                        <option></option>
                        {sortedIngredientsList.map((item) => {
                            return <option key={item.id}>{item.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-1" controlId="amount">
                    <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="unit">
                    <Form.Control/>
                </Form.Group>
            </div>
        )
    }

    return <>
        <Modal show={isShown} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Nový recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="recipeName">
                        <Form.Label>Název receptu</Form.Label>
                        <Form.Control
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Postup</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={formData.description}
                            onChange={(e) => setField("description", e.target.value)}/>
                    </Form.Group>
                    <div className={"d-flex justify-content-center gap-1"}>
                        <Form.Group className="mb-1 w-75" controlId="ingredients">
                            <Form.Label>Ingdredience</Form.Label>
                            <Form.Select
                                value={formData.ingredients.name}
                                onChange={(e) => setField("ingredients", e.target.value)}>
                                <option></option>
                                {sortedIngredientsList.map((item) => {
                                    return <option key={item.id}>{item.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="amount">
                            <Form.Label>Počet</Form.Label>
                            <Form.Control
                                value={formData.ingredients.amount}
                                onChange={(e) => setField("ingredients[amount]", parseInt(e.target.value, 10))}/>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="unit">
                            <Form.Label>Jednotka</Form.Label>
                            <Form.Control
                                value={formData.ingredients.unit}
                                onChange={(e) => setField("ingredients[unit]", e.target.value)}/>
                        </Form.Group>
                    </div>
                    {customInputGroup()}
                    {customInputGroup()}
                    {customInputGroup()}
                    {customInputGroup()}
                    <div className={"d-flex justify-content-between"}>
                    <Button variant="danger" size="lg" className={"w-25"} onClick={handleCloseModal}>Odejít</Button>
                    <Button variant="success" type="submit" size="lg" className={"w-25"}>Odeslat</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
        <Button onClick={handleShowModal} variant="success" size="lg" className={"w-25"}>Přidej recept</Button>
    </>
}

export default NewRecipeModalForm