
const BookPreview = ({ book }) => {

    return ( 
        <div className="book" >
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p className="description">{book.description}</p>
            <p>Added on {book.dateAdded} by {book.addedBy}</p> 
     </div>);
}
 
export default BookPreview;
