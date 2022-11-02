import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EquityCalculator(): React.ReactElement {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken: string | null = localStorage.getItem("accessToken");
        const refreshToken: string | null = localStorage.getItem("refreshToken");
        if (accessToken === null && refreshToken === null) {
            alert("Unauthorized");
            navigate("/home");
        }
    });

    return (
        <div style={{ color: "white" }}>Equity Calculator Page</div>
    );
}

export default EquityCalculator;
