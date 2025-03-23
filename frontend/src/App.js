import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm';
import ModelList from './ModelList';
import axios from 'axios';

const App = () => {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const res = await axios.get('http://localhost:8000/models');
      setModels(res.data);
    } catch (err) {
      console.error('Error fetching models:', err);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

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
          <UploadForm onUploadSuccess={fetchModels} />
        </section>

        {/* Uploaded Models Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <ModelList models={models} onRescanSuccess={fetchModels} />
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
