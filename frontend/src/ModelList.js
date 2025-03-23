import React from 'react';
import axios from 'axios';

const ModelList = ({ models, onRescanSuccess }) => {
  const handleRescan = async (id) => {
    try {
      await axios.post(`http://localhost:8000/scan/${id}`);
      if (onRescanSuccess) {
        onRescanSuccess(); 
      }
    } catch (err) {
      console.error(err);
      alert('Rescan failed!');
    }
  };

  return (
    <div>
      <h3>Uploaded Models</h3>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Status</th>
            <th>Upload Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td>{model.filename}</td>
              <td>{model.status}</td>
              <td>{new Date(model.upload_time).toLocaleString()}</td>
              <td>
                <button onClick={() => handleRescan(model.id)}>Rescan</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelList;
