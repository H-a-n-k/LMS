import { Link } from "react-router-dom";
import {getBookCover} from '../../mock-data'

const BooksGrid = ({ bookList, nCol }) => { 
    let style;
    if (nCol) style = { gridTemplateColumns: `repeat(${nCol}, 1fr)`}

    return <div className="books-grid" style={style} > 
        {bookList.map(x => (
            <Link to={`/LMS/Book/${x.book_id}`} key={x.book_id}>
                <div className="book-card">
                    <div className="img-wrap">
                        <img src={getBookCover(x.book_id)} alt="" />
                    </div>
                    <div className="title" title={x.book_name}>{x.book_name}</div>
                    <div className="author" title={x.author}>{x.author}</div>
                </div>
            </Link>
        ))}
    </div>
}

export default BooksGrid;