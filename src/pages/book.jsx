import { booksData, CategoriesData } from '../mock-data';
import BooksGrid from '../components/shared/books-grid';
import { useEffect, useMemo, useState } from 'react';
import CallApi from '../utils/callApi'
import { Link } from 'react-router-dom';

const BookPage = () => { 

    //STATES
    const [list, setList] = useState([]); //book list
    const [loading, setLoading] = useState(false); //book loading
    const [searchName, setSearchName] = useState(''); //input controll
    const [keyword, setKeyword] = useState('');  //input result -> keyword for query
    const [hint, setHint] = useState([]); //hint list
    const [showHint, setShowHint] = useState(false);
    //sconst [searching, setSearching] = useState(false); //hint loading

    const [categories, setCategories] = useState([]);
    const [selectedCate, setSelectedCate] = useState(-1);
    const [page, setPage] = useState(1);
    const [bookCount, setBookCount] = useState(0);

    const ItemPerPage = 20;

    //EFFECTS
    //book-list
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            setLoading(true);
            try {
                const resp = await CallApi.get('/book', {
                    params: {
                        keyword,
                        cateId: selectedCate,
                        limit: ItemPerPage,
                        page
                    }
                })

                const data = resp.data;
                if (mounted) setList(data.data);
            } catch (err) {
                console.log(err);
                let data = booksData.filter(x => x.book_name.toLowerCase().startsWith(keyword.toLowerCase()) && (selectedCate < 0 || x.cate_id+'' === selectedCate));
                setList(data);
            }
            finally { 
                setLoading(false);
            }
        }
        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [keyword, selectedCate, page])

    //search hint
    useEffect(() => { 
        let mounted = true;
        let timer;

        const fetchApi = async () => { 
            //setSearching(true);
            try {
                const resp = await CallApi.get('/book/searchHint', {
                    params: {
                        keyword: searchName,
                        cateId: selectedCate
                    }
                })

                const data = await resp.data;
                if (mounted) setHint(data.data);
            } catch (err) {
                console.log(err);
                let hints = booksData.filter(x => x.book_name.toLowerCase().startsWith(searchName.toLowerCase()) && (selectedCate < 0 || x.cate_id + '' === selectedCate))
                hints = hints.map(x => x.book_name);
                if (mounted) setHint(hints);
            } finally { 
                //setSearching(false);
            }
        }

        if (searchName.length > 0) {
            timer = setTimeout(fetchApi, 300);
        } else { 
            setHint([]);
        }

        return () => { 
            mounted = false;
            if (timer) clearTimeout(timer);
        }
    }, [searchName, selectedCate])

    //category
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApi.get('/category')
                const data = (await resp).data;
                if (mounted) setCategories(data.data);
            } catch (err) {
                console.log(err);
                if (mounted) setCategories(CategoriesData);
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [])

    //count book
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApi.get('/book/count', {
                    params: {
                        keyword,
                        cateId: selectedCate
                    }
                })
                const data = resp.data;
                if (mounted) setBookCount(data.data);
            } catch (err) { 
                console.log(err);
                if (mounted) setBookCount(booksData.length);
            }
        }

        fetchApi();

        return () => { 
            mounted = false
        }
    }, [keyword, selectedCate])

    const getTotalPage = useMemo(() => { 
        return Math.max(Math.ceil(bookCount / ItemPerPage), 1);
    }, [bookCount])
    
    const onSearch = () => {
        setKeyword(searchName);
        setPage(1);
    }

    const onChangeCategory = (e) => {
        setSelectedCate(e.target.value);
        setPage(1);
    }

    const onSearchKeyDown = (e) => { 
        if (e.key === 'Enter') onSearch();
    }

    return <div className="book-page">
        <h3 className="page-title">Tìm kiếm sách</h3>
        <div className="tool-bar">
            <div className="add-book-btn btn">
                <Link to='/LMS/AddBook'>+ Thêm Sách</Link>
            </div>
            <div>
                <label htmlFor='searchName'> Tựa sách: </label>
                <div className="input-wrap">
                    <input type='text' id='searchName' placeholder='Nhập tựa sách' value={searchName}
                        onChange={(e) => { setSearchName(e.target.value) }} onKeyDown={(e) => onSearchKeyDown(e)}
                        onFocus={() => setShowHint(true)} onBlur={() => setTimeout(() => setShowHint(false), 100)} />
                    
                    
                    {searchName.length > 0 && showHint &&
                        <div className="hints">
                            {hint.map(x => <div className="hint" key={x} onClick={() => { setSearchName(x); }}>{x}</div>)}
                        </div>
                    } 
                </div>
                <div className="btn" onClick={onSearch}>search</div>
            </div>
            <div>
                <label>
                    Thể loại sách:
                </label>
                <select onChange={e => onChangeCategory(e)} value={selectedCate}>
                    <option value={-1} key={-1}>Tất cả</option>
                    {categories.map(x => <option value={x.cate_id} key={x.cate_id}>{x.cate_name}</option>)}
                </select>
            </div>
        </div>
        {loading && <div className="loader"></div>} 
        <div className="container-80">
            <BooksGrid bookList={list} nCol={5} />
            <div className="pager">
                Trang <input type="number" max={getTotalPage} min={1} value={page} onChange={(e) => setPage(e.currentTarget.value)} /> / {getTotalPage}
            </div>
        </div>
    </div>
}

export default BookPage