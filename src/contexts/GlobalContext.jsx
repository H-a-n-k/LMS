import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => { 
    const [lightMode, setLightMode] = useState(true);

    const toggleLightMode = () => { 
        setLightMode(x => !x);
    }

    return <GlobalContext.Provider value={{lightMode, toggleLightMode}}>
        {children}
    </GlobalContext.Provider>
}

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider }
export default useGlobalContext