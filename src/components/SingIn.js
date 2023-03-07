import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { signInUser, signInUserWithGoogle } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInUser(email, password);
            navigate("/books");
        } catch (error) {
            setError(error.message);
        }
    }

    const signInWithGoogle = async () => {
        setError("");
        try {
            await signInUserWithGoogle();
            navigate("/books");
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className="signin-div">
            <h1>Welcome to the Books App...</h1>
            
            <h2>Please enter your email and password: </h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Sign In</button>
            </form>

            <button onClick={signInWithGoogle} className="google-button">Sign In With Google</button>

            <div>Don't have an account yet? Sign Up <Link to="/signup" className="link" >HERE</Link></div>
    </div> );
}
 
export default SignIn;