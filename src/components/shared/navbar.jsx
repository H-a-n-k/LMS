import { useState } from "react";
import Login from "./login-frm";

const Nav = () => { 
    const [login, setLogin] = useState(false);

    return <div className={`navbar`}>
        <div className="left">
            <div className="logo"></div>
        </div>
        <div className="right">
            <div className="btn pill" onClick={() => {setLogin(true)}}>Đăng nhập</div>
        </div>

        {login && <Login setLogin={setLogin}/>}
    </div>
}

export default Nav;