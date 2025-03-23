import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess, backendUrl }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    if (!backendUrl) {
      alert("Backend URL not available!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file); 

    try {
      setIsUploading(true);

      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response);

      if (response.status === 200 && response.data) {
        alert('File uploaded successfully!');
        setFile(null);

        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        alert('Upload failed! Invalid response.');
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed! See console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h3>Upload AI Model</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default UploadForm;
