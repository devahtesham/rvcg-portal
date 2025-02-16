import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LuUpload } from "react-icons/lu";
import './multiImg.css';
import axios from 'axios';

const MultiImageUploadCopy = ({ onFilesSelect }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 5 * 1024 * 1024; // 5MB per image

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload JPG or PNG files only';
    }
    if (file.size > maxSize) {
      return 'Each file should be less than 5MB';
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError('');

    const validFiles = selectedFiles.filter(file => {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return false;
      }
      return true;
    });

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    // onFilesSelect(validFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);
    const fakeEvent = { target: { files: droppedFiles } };
    handleFileChange(fakeEvent);
  };

  const removeFile = (indexToRemove) => {
    setFiles(prevFiles => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      onFilesSelect(newFiles);
      return newFiles;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Handle submit is calling !!!")

    const formData = new FormData();
    files.forEach((image) => {
      formData.append("files", image); // Append each image
    });

    const headers = {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    axios.post('https://rvcg-git.designsbits.com/api/admin/files_temp', formData, { headers })
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
        <div
          className={`file-upload-area ${error ? 'error' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".jpg,.jpeg,.png"
            multiple
          />
          <LuUpload className="upload-icon" />
          <p className="upload-text">
            Drop your images here, or click to browse
          </p>
          <p className="upload-hint">
            JPG or PNG only (max. 5MB each)
          </p>
          {error && (
            <p className="error-message">{error}</p>
          )}
        </div>

        {files.length > 0 && (
          <div className="image-preview-grid">
            {files.map((file, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                <button
                  className="remove-image-btn"
                  onClick={() => removeFile(index)}
                  type="button"
                >
                  <RxCross2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button type='submit'>Click</button>
      </form>
    </div>
  );
};

export default MultiImageUploadCopy;