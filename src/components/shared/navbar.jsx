import { useState } from "react";
import Login from "./login-frm";

const Nav = () => { 
    const [login, setLogin] = useState(false);

    return <div className={`navbar`}>
        <div className="left">
            <h2>Thư viện Thầy Ái</h2>
        </div>
        <div className="right">
            <div className="btn pill" onClick={() => {setLogin(true)}}>Đăng nhập</div>
        </div>

        {login && <Login setLogin={setLogin}/>}
    </div>
}

export default Nav;