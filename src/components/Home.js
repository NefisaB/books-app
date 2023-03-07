import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import Books from "./Books";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import SignIn from "./SingIn";

const Home = () => {
    return ( 
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/books/*" element={
                        <ProtectedRoute>
                            <Books />
                        </ProtectedRoute>} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
     );
}
 
export default Home;