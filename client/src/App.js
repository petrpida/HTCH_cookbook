import React, {useContext} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet, useNavigate} from "react-router-dom";
import {Container, Navbar, Nav, Offcanvas} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UserContext from "./UserProvider";

function App() {
    const {isAuthorized, changeAuthorization} = useContext(UserContext)
    let navigate = useNavigate()

    return (
        <div className="App">
            <Navbar collapseOnSelect expand="sm" bg="warning" className={"p-3 d-flex justify-content-between"}>
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        Hatchery kuchařka
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
                    <Navbar.Collapse style={{justifyContent: "right"}}>
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Hatchery Kuchařka
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1">
                                <Button variant="primary" onClick={() =>
                                    navigate("/recipesListPage")
                                }>Recepty</Button>
                                <Button variant="primary" className={"ms-0 ms-sm-2 mt-2 mt-sm-0"} onClick={() => {
                                    navigate("/ingredientsListPage")
                                }}>Ingredience</Button>
                                <Button className={"ms-0 ms-sm-2 mt-2 mt-sm-0"}
                                        variant={"dark"}
                                        onClick={() => {changeAuthorization()}}
                                >{isAuthorized ? "Odhlásit se" : "Přihlásit se"}</Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
}

export default App;
