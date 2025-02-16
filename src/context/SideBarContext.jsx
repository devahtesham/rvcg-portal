import { createContext, useState } from "react";

export const SideBarContext = createContext({})

const SideBarContextProvider = ({ children }) => {
    const [isShowOnMob,setIsShowOnMob] = useState(false);

    const showSideBar = (state)=>{
        console.log("i am calling .....");
        setIsShowOnMob(state)
    }

    const objToSend = {
        showSideBar,
        isShowOnMob
    }
    return <SideBarContext.Provider value={objToSend}>{children}</SideBarContext.Provider>
}

export default SideBarContextProvider