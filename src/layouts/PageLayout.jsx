import Nav from '../components/shared/navbar';

const Layout = ({children}) => { 
    return <div className='main'>
        <Nav />
        {children}
    </div>
}

export default Layout