import React from "react";

const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <button onClick={handleLogin} style={{ padding: "10px", fontSize: "16px" }}>
            Login with Google
        </button>
    );
};

export default LoginButton;
