const AddBook = ({setNewBookTitle, setNewBookAuthor, setNewBookDescription, handleClick}) => {

    return ( 
        <div className="addbook-div">
            <label htmlFor="newTitle">Title:</label>
            <input 
                type="text"
                id="newTitle"
                onChange={(e) => setNewBookTitle(e.target.value)} />
            <label htmlFor="newAuthor">Author:</label>
            <input 
                type="text"
                id="newAuthor"
                onChange={(e) => setNewBookAuthor(e.target.value)} />
            <label htmlFor="description">Description: </label>
            <textarea
                id="description"
                onChange={(e) => setNewBookDescription(e.target.value)}
                cols="15"
                rows="5"
                placeholder="Description or favorite quote..."
            />
            <button onClick={handleClick} >Add Book</button>
        </div>
     );
}
 
export default AddBook;