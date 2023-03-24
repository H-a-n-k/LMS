import { booksData } from '../mock-data';
import BooksGrid from '../components/shared/books-grid';
import { useEffect, useState } from 'react';
import CallApi from '../utils/callApi'

const BookPage = () => { 
    const [list, setList] = useState([]);

    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApi.get('/book/popular', {
                    params: {
                        limit: 10
                    }
                })

                const data = resp.data;
                if (mounted) setList(data.data.map(x => { return { ...x, coverImg: `https://picsum.photos/seed/${x.coverImg}/128/184` } }));
            } catch (err) { 
                console.log(err);
                setList(booksData);
            }
        }
        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [])

    return <div className="book-page">
        <h3 className="title">Books</h3>
        <div className="container-80">
            <BooksGrid bookList={list} nCol={5} />
        </div>
    </div>
}

export default BookPage