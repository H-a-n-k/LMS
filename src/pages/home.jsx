import Layout from "../layouts/PageLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import BooksGrid from '../components/shared/books-grid';
import { booksData } from '../mock-data'
import HomeBG from '../resources/imgs/home-bg.png'
import HalfCloud from "../components/gadgets/half-cloud";
import { useState } from "react";

library.add(faMagnifyingGlass);
library.add(faPlay);

const Home = () => { 
    const [userId, setUserId] = useState('');
    const [bookName, setBookName] = useState('');

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

    return <Layout>
        <div className="home">
            <div className="home-bg">
                <img src={HomeBG} alt="" />

                <HalfCloud top={310} left={374}/>
                <HalfCloud top={440} left={20} height={60} />
                <HalfCloud top={250} right={0} height={57} transform='translateX(-100%)' noLine/>
                <HalfCloud top={227} right={115} height={22} />
                <HalfCloud top={300} right={33} height={33} circleTop={100} />
                <HalfCloud top={850} right={180} height={75} noLine />
                <HalfCloud top={875} right={80} height={50} noLine />
                <HalfCloud top={830} right={120} height={35} noLine />
                <HalfCloud top={700} right={0} height={75} noLine />
                <div className="half-cloud half-cloud-special">
                    <div className="cloud">
                        <FontAwesomeIcon icon="fa-solid fa-play" />
                    </div>
                    <div className="line"></div>
                    <div className="circle"></div>
                </div>
            </div>
            <div className="title-history">
                <span style={{ fontWeight: 'lighter' }}>Tra cứu</span> <span style={{ fontWeight: 'bolder' }}>lịch sử</span>
                <div className="pill-cloud"></div>
            </div>
            <div className="search-history search">
                <label htmlFor="history">ID</label>
                <input type="text" id="history" className="pill" placeholder="Nhập ID"
                    onKeyDown={(e) => onHistoryKeyDown(e)} onChange={(e)=>{setUserId(e.target.value)}} value={userId} />
                <div className="btn" onClick={searchHistory}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </div>
            </div>

            <div className="title-book">
                <span style={{ fontWeight: 'lighter' }}>Tìm</span> <span style={{ fontWeight: 'bolder' }}>sách</span>
                <div className="pill-cloud"></div>
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

            <BooksGrid bookList={booksData} />

        </div>
    </Layout>
}

export default Home