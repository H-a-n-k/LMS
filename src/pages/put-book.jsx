import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import CallApi from "../utils/callApi";

const PutBookPage = () => { 
    const { id } = useParams();

    const [form, setForm] = useState({ name: '', author: '', publisher: '', year: 2000, summary: '', category: '-1' });
    const [categories, setCategories] = useState([]);

    //category
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = await CallApi.get('/category');
                const data = resp.data;
                if (mounted) setCategories(data.data);
            } catch (err) { 
                console.log(err);
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [])

    //book
    useEffect(() => { 
        let mounted = true;

        const fetchApi = async () => { 
            try {
                const resp = CallApi.get('/book/detail/' + id);
                const data = (await resp).data;
                const book = data.data;

                if(mounted) setForm({
                    name: book.book_name,
                    author: book.author,
                    publisher: book.publisher,
                    year: book.publishYr,
                    summary: book.summary,
                    category: book.cate_id
                })
            } catch (err) { 
                console.log(err)
            }
        }

        fetchApi();

        return () => { 
            mounted = false;
        }
    }, [id])

    const onFormChange = (e) => { 
        const { id, value } = e.target;
        setForm(x => { return { ...x , [id]: value} })
    }

    const onSubmit = async () => { 
        try {
            const formData = { ...form, category: (form.category && parseInt(form.category) >= 0) ? parseInt(form.category) : null };

            if (id) {
                await CallApi.post('/book/updateBook/' + id, {
                    ...formData
                })
            } else { 
                await CallApi.post('/book/addBook', {
                    ...formData
                })
            }

            alert('Thành công!')
        } catch (err) { 
            console.log(err);
            alert('Có lỗi!');
        }
    }

    return <div className="put-book-page">
        <div className="container-80">
            <div className="page-title">{id ? 'Sửa sách' :'Thêm Sách'}</div>
            <div className="flex-center">
                <form action="#">
                    <div>
                        <label htmlFor="name">Tên sách: </label>
                        <input type="text" id="name" onChange={onFormChange} value={form['name']} />
                    </div>
                    <div>
                        <label htmlFor="author">Tác giả</label>
                        <input type="text" id="author" onChange={onFormChange} value={form['author']} />
                    </div>
                    <div>
                        <label htmlFor="publisher">Nhà xuất bản</label>
                        <input type="text" id="publisher" onChange={onFormChange} value={form['publisher']} />
                    </div>
                    <div>
                        <label htmlFor="year">Năm xuất bản</label>
                        <input type="number" id="year" onChange={onFormChange} value={form['year']} />
                    </div>
                    <div>
                        <label htmlFor="summary">Tóm tắt</label>
                        <input type="text" id="summary" onChange={onFormChange} value={form['summary']} />
                    </div>
                    <div>
                        <label htmlFor="category">Thể loại</label>
                        <select id="category" onChange={onFormChange} value={form['category']}>
                            <option value="-1" key={-1}>Không có</option>
                            {categories.map(x => <option key={x.cate_id} value={x.cate_id}>{x.cate_name}</option>)}
                        </select>
                    </div>
                    <div className="btn btn-submit" onClick={onSubmit}>Xác nhận</div>
                </form>
            </div>
        </div>
    </div> 
}

export default PutBookPage