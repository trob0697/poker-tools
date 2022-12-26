import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar(): React.ReactElement {
    const [tab, setTab] = useState<string>("");

    useEffect(() => {
        window.location.pathname === "/" ? setTab("/home") : setTab(window.location.pathname);
    });

    return (
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect style={{ paddingLeft: "2vw" }}>
            <Navbar.Brand href="/">
                <img src={require("../assets/logo.png")} alt="bomb" height="30vh"/>{" "}PokerTools.com
            </Navbar.Brand>
            <Nav className="me-auto" activeKey={tab}>
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
