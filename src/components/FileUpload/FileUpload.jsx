import React, { useRef } from 'react';
import './FileUpload.css';
import { useFile } from '../../hooks/useFile';
import PlaceholderImg from "../../assets/img/placeholder-img.jpg"


const FileUpload = () => {
  const { handleFileChange, handleButtonClick, fileName } = useFile()
  const fileInputRef = useRef()


  return (
    <div className='file-upload-section d-flex align-items-center gap-3 py-3'>
      <div className="file-attach-container flex-grow-1">
        <fieldset className='reset'>
          <legend>Upload Image</legend>
          <div className="file-upload_comp">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button type="button" onClick={() => {
              handleButtonClick(fileInputRef)
            }}>
              Choose file
            </button>
            <span>{fileName}</span>
          </div>
        </fieldset>
      </div>
      <div className="sample-attach-img flex-grow-1 mt-2">
        <img src={PlaceholderImg} alt="" width={120} height={75} />
      </div>
    </div>

  );
};

export default FileUpload;
