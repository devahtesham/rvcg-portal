import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext({})

const ModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallDevices, setIsSmallDevices] = useState(false);

    const isMobileDevice = (width) => {
        if (window.matchMedia(`(max-width: ${width}px)`).matches) {
            setIsSmallDevices(true)
        }

    }
    const handleModalOpen = () => setIsOpen(true);
    const handleModalClose = () => setIsOpen(false);
    const objToSend = {
        isOpen,
        handleModalClose,
        handleModalOpen,
        isSmallDevices,
        isMobileDevice

    }
    return <ModalContext.Provider value={objToSend}>{children}</ModalContext.Provider>
}

export default ModalContextProvider