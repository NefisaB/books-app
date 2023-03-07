import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const { signUpUser, updateUser } = UserAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await signUpUser(email, password);
            await updateUser(username);
            navigate("/books");
        } catch (err) {
            setError(err.message);
        }
    }

    return (<div className="signin-div">
        <h1>Sign Up For Books Application</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
            required/>
            <label htmlFor="email">Email: </label>
            <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button>Sign Up</button>
        </form>

        <p><Link to="/" className="link">GO BACK</Link></p>
    </div> );
}
 
export default SignUp;