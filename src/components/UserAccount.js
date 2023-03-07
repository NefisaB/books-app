import { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {

    const { user, updateUser, updateUserPicture} = UserAuth();

    const [newUsername, setNewUsername] = useState(user.displayName);

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleClick = () => {
        setIsUpdating(prevState => !prevState);
    }

    const handleProfileChange = async () => {
        if (image) {
           const imageRef = ref(storage, `${user.uid}-image`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);
            await updateUserPicture(url); 
        }
        if (user.displayName !== newUsername) {
            await updateUser(newUsername);
        }
        setImage(null);
        setNewUsername(user.displayName);
        setIsUpdating(prevState => !prevState);
        navigate(0);
    }



    return (
        <div className="user-section">
            {!isUpdating &&
                <button onClick={handleClick}>Update Profile</button>}
            
            {isUpdating &&
            <div className="update-user-div">
                <label htmlFor="newusername">Enter New Username: </label>
                    <input
                        id="newusername"
                        type="text"
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleProfileChange} >Add</button>
            </div>}
        </div>);
}
 
export default UserAccount;