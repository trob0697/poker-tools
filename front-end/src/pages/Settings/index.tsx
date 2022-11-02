import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountDetails from "./accountDetails";
import Subscription from "./subscription";
import TermsOfService from "./termsOfService";

function Settings(): React.ReactElement {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<string>("Account Details");

    useEffect(() => {
        const accessToken: string | null = localStorage.getItem("accessToken");
        const refreshToken: string | null = localStorage.getItem("refreshToken");
        if (accessToken === null && refreshToken === null) {
            alert("Unauthorized");
            navigate("/home");
        }
    });

    function renderTab(): React.ReactElement {
        switch (currentPage) {
            case "Account Details":
                return <AccountDetails/>;
            case "Subscription":
                return <Subscription/>;
            case "Terms of Service":
                return <TermsOfService/>;
            default:
                return <AccountDetails/>;
        }
    };

    function onClickLogout(): void {
        // TODO: API to logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/home");
    };

    return (
        <div className="d-flex align-items-stretch settings-page-container">
            <ul className="nav flex-column settings-tab-container">
                <li className={currentPage === "Account Details" ? "settings-tab-selected" : ""} onClick={() => setCurrentPage("Account Details")}>Account Details</li>
                <li className={currentPage === "Subscription" ? "settings-tab-selected" : ""} onClick={() => setCurrentPage("Subscription")}>Subscription</li>
                <li className={currentPage === "Terms of Service" ? "settings-tab-selected" : ""} onClick={() => setCurrentPage("Terms of Service")}>Terms of Service</li>
                <li style={{ color: "#DC3545" }} onClick={() => onClickLogout()}>Logout</li>
            </ul>
            {renderTab()}
        </div>
    );
}

export default Settings;
