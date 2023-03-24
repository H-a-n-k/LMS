
const BooksGrid = ({ bookList, nCol }) => { 
    let style;
    if (nCol) style = { gridTemplateColumns: `repeat(${nCol}, 1fr)`}

    return <div className="books-grid" style={style}>
        {bookList.map((x, ind) => (
            <div className="book-card" key={ind}>
                <div className="img-wrap">
                    <img src={x.coverImg} alt="" />
                </div>
                <div className="title" title={x.book_name}>{x.book_name}</div>
                <div className="author" title={x.author}>{x.author}</div>
            </div>
        ))}
    </div>
}

export default BooksGrid;