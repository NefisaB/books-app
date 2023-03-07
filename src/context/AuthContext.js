import {
    createContext, useContext, useEffect, useState
} from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const UserContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (username) => {
        return updateProfile(auth.currentUser, { displayName: username });
    }

    const updateUserPicture = (url) => {
        return updateProfile(auth.currentUser, { photoURL: url });
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInUserWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{signUpUser, updateUser,updateUserPicture, user, signInUser, signInUserWithGoogle, logout}}>
            {children}
        </UserContext.Provider>
    )
}

const UserAuth = () => {
    return useContext(UserContext);
}

export {AuthContextProvider, UserAuth}