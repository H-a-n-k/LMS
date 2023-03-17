import './App.scss';
import Home from './pages/home';
import { GlobalContextProvider } from './contexts/GlobalContext';

function App() {
  return <GlobalContextProvider>
    <Home />
  </GlobalContextProvider>
}

export default App;
