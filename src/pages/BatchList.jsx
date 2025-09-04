import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Upload, FileText } from 'lucide-react';
import BatchCard from '../components/ui/BatchCard';

const BatchList = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();
  const { batches, setBatches } = useAppContext();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
    }
  };

  const createNewBatch = () => {
    if (!uploadedFile) return;

    const newBatch = {
      id: `BATCH-${String(batches.length + 1).padStart(3, '0')}`,
      name: uploadedFile.name.replace('.csv', ''),
      uploadDate: new Date().toISOString().split('T')[0],
      totalRecords: Math.floor(Math.random() * 2000) + 500,
      status: 'pending',
      currentStep: 1,
      results: {
        fraudDetection: null,
        marketIntel: null,
        customerSearch: null
      }
    };

    setBatches([newBatch, ...batches]);
    setUploadedFile(null);
    navigate(`/batch/${newBatch.id}/fraud-detection`);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Recent Records</h3>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          onClick={() => navigate('/upload')}
        >
          <Upload className="w-5 h-5" />
          Upload
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchList;