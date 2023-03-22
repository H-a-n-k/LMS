import './App.scss';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/PageLayout'
import Home from './pages/home';
import CategoryPage from './pages/category';
import BookPage from './pages/book';

function App() {
  return <GlobalContextProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/LMS' element={<Home />} />
          <Route path='/LMS/Category' element={<CategoryPage />} />
          <Route path='/LMS/Book' element={<BookPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </GlobalContextProvider>
}

export default App;

//TODO
//add loading
//auto width for grid
