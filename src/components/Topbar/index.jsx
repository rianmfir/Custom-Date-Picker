import React from 'react'
import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import DatePicker from '../DatePicker';
import './topbar.css';

const Topbar = ({ show, handleShow, handleClear, selectedDate }) => {

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Date Picker</Navbar.Brand>
                    <Nav className='ms-auto mt-3'>
                        <Form className="d-flex">
                            <InputGroup className="mb-3">
                                <Form.Label style={{ color: "white", fontSize: "1.3rem" }} className="me-3">Tanggal</Form.Label>
                                <Form.Control style={{ width: "300px" }} onClick={() => handleShow()} value={selectedDate} />
                                <Button variant="outline-warning" onClick={handleClear}>Clear</Button>
                            </InputGroup>
                        </Form>
                    </Nav>
                </Container>
            </Navbar>
            <span className={`datePicker ${show ? "show" : "hide"}`}>
                <DatePicker show={show} handleShow={handleShow} />
            </span>
        </>
    )
}

export default Topbar;