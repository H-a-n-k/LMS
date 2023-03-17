import Layout from "../layouts/PageLayout"
import BooksGrid from '../components/shared/books-grid';
import { booksData } from '../mock-data'
import MountainBG from '../resources/imgs/mountain-bg.png'
import HalfCloud from "../components/gadgets/half-cloud";
import Star from "../components/gadgets/star";
import { useState } from "react";
import { SearchIcon } from "../utils/icons";
import useGlobalContext from "../contexts/GlobalContext";

const Home = () => { 
    const [userId, setUserId] = useState('');
    const [bookName, setBookName] = useState('');
    const {lightMode} = useGlobalContext();

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
            <div className={`home-bg ${lightMode ? '' : 'night-mode'}`}>
                <div className={`home-night-bg ${lightMode ?'opacity-0':''}`}></div>
                <div className={`home-light-bg ${lightMode ? '' : 'opacity-0'}`}></div>

                {lightMode ? <>
                    <HalfCloud top={310} left={374} time={2.4} dist={160} />
                    <HalfCloud top={440} left={20} height={60} time={2} dist={100} />
                    <HalfCloud top={250} right={0} height={57} transform='translateX(-100%)' noLine time={2.8} dist={100} />
                    <HalfCloud top={227} right={115} height={22} time={2.6} dist={220} />
                    <HalfCloud top={300} right={33} height={33} circleTop={100} time={1.8} dist={280} />
                    <HalfCloud top={850} right={180} height={75} noLine time={1.5} dist={130} />
                    <HalfCloud top={875} right={80} height={50} noLine time={2.4} dist={160} />
                    <HalfCloud top={830} right={120} height={35} noLine time={1.9} dist={290} />
                    <HalfCloud top={700} right={0} height={75} noLine time={1.7} dist={240} />
                    <HalfCloud top={420} left={1100} special time={1.9} dist={120} />
                </> : <>
                        <Star top={10} left={10} size={5} time={2.4} dist={160} />
                        <Star top={30} left={26} size={4} time={2} dist={100} />
                        <Star top={25} left={10} size={5} time={2.8} dist={100} />
                        <Star top={20} left={20} size={3} time={2.8} dist={100} />

                        <Star top={20} right={10} size={5} time={1.5} dist={130} />
                        <Star top={30} right={15} size={2} time={1.5} dist={130} />
                        <Star top={25} right={30} size={5} time={1.9} dist={120} />
                        <Star top={15} right={20} size={3} time={1.7} dist={240} />
                </>}
                
                <img src={MountainBG} alt="" />
            </div>
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

            <BooksGrid bookList={booksData} />

        </div>
    </Layout>
}

export default Home