import React, { useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar(){
    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect style={{paddingLeft: "2vw"}}>
            <Navbar.Brand href="/">
                <img src={require("../assets/logo.png")} alt="bomb" height="30vh" />{" "}PokerTools.com
            </Navbar.Brand>
            <Nav className="me-auto" activeKey={window.location.pathname}>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;
