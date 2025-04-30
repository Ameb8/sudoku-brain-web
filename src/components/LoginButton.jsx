import "./LoginButton.css"

const LoginButton = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <button onClick={handleLogin} className="login-button">
            Login with Google
        </button>
    );
};

export default LoginButton;
