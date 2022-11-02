import { ReactElement } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() : ReactElement{
    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect style={{paddingLeft: "2vw"}}>
            <Navbar.Brand href="/">
                <img src={require("../assets/logo.png")} alt="bomb" height="30vh" />{" "}PokerTools.com
            </Navbar.Brand>
            <Nav className="me-auto" activeKey={window.location.pathname}>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/equity-calculator">Equity Calculator</Nav.Link>
            </Nav>
            <Nav className="settings-tab" activeKey={window.location.pathname}>
                <Nav.Link href="/settings">&#9881;</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;
