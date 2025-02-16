import { useState } from 'react';
import './FileUpload.css';
import { LuUpload } from "react-icons/lu";
import axios from 'axios';

const UploadDragFileCopy = ({ onFileSelect, label }) => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 80 * 1024 * 1024; // 5MB

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setError('');

        if (!selectedFile) return;

        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Please upload a PDF, JPG, or PNG file');
            return;
        }

        if (selectedFile.size > maxSize) {
            setError('File size should be less than 5MB');
            return;
        }

        setFile(selectedFile)


    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const fakeEvent = { target: { files: [droppedFile] } };
            handleFileChange(fakeEvent);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log("Handle submit is calling !!!")

        const formData = new FormData();
        formData.append('image', file);

        const headers = {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        axios.post('https://rvcg-git.designsbits.com/api/admin/testimage', formData, { headers })
            .then((response) => {
                console.log('[response]', response);
            })
            .catch((error) => {
                console.log('[error]', error);
            });
    }
    return (
        <div className="file-upload-container">
            <form onSubmit={submitHandler}>
                <label className="file-upload-label">
                    {label}
                </label>
                <div
                    className={`file-upload-area ${error ? 'error' : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="file-input"
                        
                    />
                    <LuUpload className="upload-icon" />
                    <p className="upload-text">
                        {file ? file.name : 'Drop your file here, or click to browse'}
                    </p>
                    <p className="upload-hint">
                        PDF, JPG or PNG (max. 5MB)
                    </p>
                    {error && (
                        <p className="error-message">{error}</p>
                    )}
                </div>
                <button type='submit'>Click</button>
            </form>
        </div>
    );
};

export default UploadDragFileCopy;