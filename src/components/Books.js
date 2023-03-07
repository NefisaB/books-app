import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import UserAccount from "./UserAccount";
import BookItem from "./BookItem";
import BookPreview from "./BookPreview";

const Books = () => {

    const [books, setBooks] = useState([]);

    const [newBookTitle, setNewBookTitle] = useState("");
    const [newBookAuthor, setNewBookAuthor] = useState("");
    const [newBookDescription, setNewBookDescription] = useState("");


    const { user, logout } = UserAuth();

    const navigate = useNavigate();

    const booksRef = collection(db, "books");

     const getBooks = async () => {
      try {
        const dbData = await getDocs(booksRef);
        const filteredData = dbData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBooks(filteredData);
      } catch (error) {
        console.error(error);
      }
  }

    useEffect(() => {
        getBooks();
    }, []);

    const signOutUser = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewBookAdd = async (e) => {
        e.preventDefault();
        try {
            await addDoc(booksRef, {
                title: newBookTitle,
                author: newBookAuthor,
                description: newBookDescription,
                userID: user.uid,
                addedBy: user.displayName, 
                dateAdded: new Date().toLocaleDateString(), 
                comments : []
            });
            navigate(-1);
            getBooks();
        } catch (error) {
            console.log(error);
        }   
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        const bookDoc = doc(db, "books", id);
        try {
            await deleteDoc(bookDoc);
            getBooks();            
        } catch (error) {
            console.log(error);
        }
    }

    const booksList = books.map(book => {
        return (
            <Link to={`/books/${book.id}`} key={book.id}>
                <BookPreview book={book} handleDelete={handleDelete} />
            </Link>);
    });

    return (<div className="main"> 
        <nav>
            <h2><Link to="/books" >Home</Link></h2>
            <span>Welcome {user.displayName}</span>
            <img className="image-small"
                    src={user.photoURL || "https://firebasestorage.googleapis.com/v0/b/books-app-43370.appspot.com/o/books-default.jpg?alt=media&token=c6bd5fd6-c50b-4b19-98e1-568ad92fce7e"} alt="profile" />
            <button onClick={signOutUser}>Sign Out</button>
            <button><Link to="/books/account">My Account</Link></button>
        </nav>
        

        <Routes>
            <Route path="/" element={
                <div className="books-section">
                    <h1>Books</h1>
                    <button><Link to="/books/add">Add New Book </Link></button>
                    {books && <div className="books">{booksList}
                    </div>}
                </div>} />
            <Route path="/add" element={<AddBook
                setNewBookAuthor={setNewBookAuthor}
                setNewBookTitle={setNewBookTitle}
                setNewBookDescription={setNewBookDescription}
                handleClick={handleNewBookAdd} />} />
            <Route path="/:id" element={<BookItem />} />
            <Route path="/account" element={<UserAccount />} />
        </Routes>
        
    </div> );
}
 
export default Books;