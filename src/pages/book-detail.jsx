import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CallApi from '../utils/callApi';
import { getBookCover, booksData, BookCopyData, CategoriesData } from '../mock-data'
import { Link } from "react-router-dom";

const BookDetailPage = () => { 
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [category, setCategory] = useState('');
    const [copies, setCopies] = useState([]);

    const CopyStates = ['Còn', 'Đang cho mượn', 'Bị hỏng', 'Bị mất'];

    //book
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApi.get('/book/detail/' + id);
                const data = resp.data;
                
                if (mounted) setBook({ ...data.data , coverImg: getBookCover(data.data.book_id, 200, 300)});
            } catch (err) { 
                console.log(err);
                console.log(booksData.filter(x => x.book_id === id));
                if (mounted) setBook(booksData.filter(x => x.book_id === parseInt(id))[0]);
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [id])

    //category
    useEffect(() => {
        let mounted = true;

        const fetchApi = async () => {
            try {
                const resp = await CallApi.get('/category/detail/' + book.cate_id);
                const data = resp.data;

                if (mounted) setCategory(data.data);
            } catch (err) {
                setCategory(CategoriesData.filter(x => x.cate_id === book.cate_id)[0].cate_name)
                console.log(err);
            }
        }

        fetchApi();

        return () => {
            mounted = false;
        }
    }, [book])

    //copies
    useEffect(() => {
        let mounted = true;

        const fetchApi = async () => {
            try {
                const resp = await CallApi.get('/copy/getCopiesByBook/' + id);
                const data = resp.data;

                if (mounted) setCopies(data.data);
            } catch (err) {
                console.log(err);
                setCopies(BookCopyData.filter(x => x.book_id === parseInt(id)))
            }
        }

        fetchApi();

        return () => {
            mounted = false;
        }
    }, [id])

    return <div className="book-detail-page">
        <h2 className="page-title">Thông tin sách</h2>

        <div className="container-80">
            {book ?
                <>
                    <div className="book-info">
                        <div className="left">
                            <div className="book-cover">
                                <img src={book.coverImg} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="name">{book.book_name}</div>
                            <div>Thể loại: {category}</div>
                            <div>Tác giả: {book.author}</div>
                            <div>NXB: {book.publisher}</div>
                            <div>Năm XB: {book.publishYr}</div>
                            <div>Ngày thêm: {new Date(book.add_date).toLocaleDateString('en-GB')}</div>
                            <div className="btn">
                                <Link to={`/LMS/UpdateBook/${book.book_id}`}>Chỉnh Sửa</Link>
                            </div>
                        </div>
                    </div>
                    <h3>Tóm tắt: </h3>
                    <div>{book.summary}</div>
                    <br />
                    <hr />
                    <br />
                    <h2 className="page-title">Thông tin các cuốn sách</h2>
                    {copies.length > 0 &&
                        <div className="copy-list">
                            <div className="copy-item">
                                <div>Mã cuốn sách</div>
                                <div>Tình trạng</div>
                                <div>Ghi chú</div>
                            </div>
                            {copies.map(x => <div className="copy-item" key={x.copy_id}>
                                <div >{x.copy_id}</div>
                                <div >{CopyStates[x.state_id]}</div>
                                <div >{x.note}</div>
                            </div>)}
                        </div>
                    }
                </>
                :
                <h2>không tìm thấy sách</h2>
            }
        </div>
    </div>
}

export default BookDetailPage;