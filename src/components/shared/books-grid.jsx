
const Books = ({ bookList, nCol }) => { 
    let style;
    if (nCol) style = { gridTemplateColumns: `repeat(${nCol}, 1fr)`}

    return <div className="books-grid" style={style}>
        {bookList.map((x, ind) => (
            <div className="book-card" key={ind}>
                <div className="img-wrap">
                    <img src={x.img} alt="" />
                </div>
                <div className="title" title={x.title}>{x.title}</div>
                <div className="author" title={x.author}>{x.author}</div>
            </div>
        ))}
    </div>
}

export default Books;