import {  doc, getDoc, updateDoc } from "firebase/firestore";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import BookPreview from "./BookPreview";
import { UserAuth } from "../context/AuthContext";
import uniqid from "uniqid";

const BookItem = () => {

    const [book, setBook] = useState(null);
    const [newComment, setNewComment] = useState("");

    const params = useParams();
    const bookID = params.id;

    const { user } = UserAuth();

    const bookRef = doc(db, "books", bookID);

    const getBook = async () => {
        try {
            const bookData = await getDoc(bookRef);
            setBook(bookData.data());
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBook();
    }, []);



    const addComment = async () => {
        if (newComment) {
            const comment = {
                text: newComment,
                author: user.displayName,
                userID: user.uid,
                dateTimeAdded: new Date().toLocaleDateString(),
                id: uniqid()
            };
            book.comments.push(comment);
            try {
                await updateDoc(bookRef, {
                    comments: book.comments
                });
            } catch (error) {
                console.log(error);
            }
        }
        setNewComment("");
    }

    return ( 
        <div className="book-item-div">
            {book && <BookPreview book={book} />}
            <div className="comments" >
                <p>Comments: </p>
                {book && book.comments.map(comment => {
                    return (
                         <div className="comment" key={comment.id}>
                            <span>{comment.author}</span><span>{comment.dateTimeAdded}</span>
                <p>{comment.text}</p>
            </div>
                     )
                 })}
            </div>
            <div className="new-comment-div">
            <textarea
                    placeholder="Write a comment... "
                    cols="15"
                    rows="4"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)} />
            <button onClick={addComment} >Comment</button>
            </div>
        </div>
     );
}
 
export default BookItem;
