import BooksGrid from '../components/shared/books-grid';
import { booksData } from '../mock-data'
import { useEffect, useState } from "react";
import { SearchIcon } from "../utils/icons";
import CallApi from '../utils/callApi';
import BGGadgets from '../components/shared/bg-gadgets';

const Home = () => { 
    const [userId, setUserId] = useState('');
    const [bookName, setBookName] = useState('');
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);

    const onHistoryKeyDown = (e) => { 
        if (e.key === 'Enter') { 
            searchHistory();
        }
    }
    const searchHistory = () => { 
        if (!userId) return;
        alert('Xem lịch sử độc giả #' + userId);
    }

    const onBookKeyDown = (e) => { 
        if (e.key === 'Enter') {
            searchBook();
        }
    }
    
    const searchBook = () => { 
        alert('Tìm sách ' + bookName);
    }

    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            setLoading(true);
            try {
                const resp = await CallApi.get('/book/popular', { //axios
                    params: {
                        limit: 6
                    }
                })
                const data = resp.data; //api result
                if (mounted) setBookList(data.data);
            } catch (err) {
                if (mounted) setBookList(booksData); //mock data
                console.log('fetch failed: ', err);
            } finally { 
                setLoading(false);
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [])

    return <>
        <div className="home">
            <BGGadgets />
            
            <div className="title-history">
                <span style={{ fontWeight: 'lighter' }}>Tra cứu</span> <span style={{ fontWeight: 'bolder' }}>lịch sử</span>
                <div className="pill-cloud float-in"></div>
            </div>
            <div className="search-history search">
                <label htmlFor="history">ID</label>
                <input type="text" id="history" className="pill" placeholder="Nhập ID"
                    onKeyDown={(e) => onHistoryKeyDown(e)} onChange={(e)=>{setUserId(e.target.value)}} value={userId} />
                <div className="btn" onClick={searchHistory}>
                    <SearchIcon />
                </div>
            </div>

            <div className="title-book">
                <span style={{ fontWeight: 'lighter' }}>Tìm</span> <span style={{ fontWeight: 'bolder' }}>sách</span>
                <div className="pill-cloud float-in"></div>
            </div>
            
            <div>
                <div className="search-book search">
                    <input type="text" id="history" className="pill" placeholder="Nhập tên sách"
                        onChange={(e) => { setBookName(e.target.value) }} value={bookName} onKeyDown={(e) => onBookKeyDown(e)} />
                    <div className="btn" onClick={searchBook}>
                        TÌM
                    </div>
                </div>

                <div className="tags">
                    <div className="tag">Thể Loại</div>
                    <div className="tag">Năm xuất bản</div>
                    <div className="tag">Nhà xuất bản</div>
                </div>
            </div>

            
            {loading && <div className="loader"></div>}
            <div className="container-80">
                <BooksGrid bookList={bookList} />
            </div>

        </div>
    </>
}

export default Home