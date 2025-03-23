import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm';
import ModelList from './ModelList';
import axios from 'axios';

const App = () => {
  const [models, setModels] = useState([]);
  const [backendUrl, setBackendUrl] = useState('');

  // Load backend URL from runtime config
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/config.json');
        const config = await res.json();
        setBackendUrl(config.REACT_APP_BACKEND_URL);
      } catch (err) {
        console.error('Failed to load config.json', err);
      }
    };

    loadConfig();
  }, []);

  const fetchModels = async () => {
    if (!backendUrl) return; // Wait until backendUrl is loaded
    try {
      const res = await axios.get(`${backendUrl}/models`);
      setModels(res.data);
    } catch (err) {
      console.error('Error fetching models:', err);
    }
  };

  useEffect(() => {
    if (backendUrl) {
      fetchModels();
    }
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-6 bg-blue-600 text-white text-center shadow">
        <h1 className="text-3xl font-bold">TrojAI Secure Model Registry</h1>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mt-10 px-4 space-y-8">
        {/* Upload Form */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <UploadForm onUploadSuccess={fetchModels} backendUrl={backendUrl} />
        </section>

        {/* Uploaded Models Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <ModelList models={models} onRescanSuccess={fetchModels} backendUrl={backendUrl} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full py-4 text-center text-gray-500 text-sm">
        © 2025 TrojAI - Secure AI Model Registry
      </footer>
    </div>
  );
};

export default App;
