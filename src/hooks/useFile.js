import { useState } from "react";



export const useFile = () => {
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleButtonClick = (fileInputRef) => {
        fileInputRef.current.click();
    };

    return {
        handleFileChange,
        handleButtonClick,
        fileName
    }
}