import React, { useState, useEffect } from 'react';
import resumeService from '../api/resumeService';

const ResumeScreening = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [cutoffScore, setCutoffScore] = useState(0.5);
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceAvailable, setServiceAvailable] = useState(true);
  const [autoEmail, setAutoEmail] = useState(false);

  // Check if the Flask service is running
  useEffect(() => {
    const checkService = async () => {
      try {
        await resumeService.testService();
        setServiceAvailable(true);
      } catch (error) {
        setServiceAvailable(false);
        setError('Resume screening service is not available. Please ensure the Flask service is running.');
      }
    };
    
    checkService();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleAddMoreFiles = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!serviceAvailable) {
      setError('Resume screening service is not available. Please ensure the Flask service is running.');
      return;
    }
    
    if (!jobDescription.trim()) {
      setError('Job description is required');
      return;
    }
    
    if (files.length === 0) {
      setError('Please upload at least one resume');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('jd', jobDescription);
      formData.append('cutoff', cutoffScore.toString());
      // Forward auto-email preference to backend
      formData.append('autoEmail', autoEmail ? 'true' : 'false');
      
      files.forEach(file => {
        formData.append('resumes[]', file);
      });
      
      const response = await resumeService.screenResumes(formData);
      // Ensure results is always an array
      const responseResults = response.results || [];
      setResults(Array.isArray(responseResults) ? responseResults : []);
    } catch (error) {
      console.error('Error screening resumes:', error);
      setError('Failed to screen resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Resume Screening</h2>
      
      {!serviceAvailable && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          Resume screening service is not available. Please ensure the Flask service is running.
        </div>
      )}
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {results.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">Screening Results</h3>
          <p className="mb-4">Cutoff Score: <span className="font-bold">{cutoffScore}</span></p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-3 border border-gray-600">Candidate Name</th>
                  <th className="p-3 border border-gray-600">Email</th>
                  <th className="p-3 border border-gray-600">Score</th>
                  <th className="p-3 border border-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                    <td className="p-3 border border-gray-600">{result.name}</td>
                    <td className="p-3 border border-gray-600">{result.email}</td>
                    <td className="p-3 border border-gray-600">{result.score}</td>
                    <td className="p-3 border border-gray-600">
                      {result.status.includes('Shortlisted') ? (
                        <span className="text-green-400">{result.status}</span>
                      ) : (
                        <span className="text-red-400">{result.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={() => setResults([])}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Screen More Resumes
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded text-white"
              rows="6"
              placeholder="Paste job description here..."
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Upload Resumes:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              accept=".pdf,.doc,.docx"
              multiple
              required
            />
            
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-300 mb-2">{files.length} file(s) selected:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <input
                  type="file"
                  onChange={handleAddMoreFiles}
                  className="mt-2 p-2 bg-gray-700 rounded text-white"
                  accept=".pdf,.doc,.docx"
                  multiple
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block mb-2">Cutoff Score:</label>
            <input
              type="number"
              value={cutoffScore}
              onChange={(e) => setCutoffScore(parseFloat(e.target.value))}
              className="w-full p-2 bg-gray-700 rounded text-white"
              step="0.01"
              min="0"
              max="1"
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              Candidates with similarity scores above this threshold will be shortlisted.
            </p>
            <label className="mt-3 inline-flex items-center">
              <input
                type="checkbox"
                checked={autoEmail}
                onChange={(e) => setAutoEmail(e.target.checked)}
                className="mr-2"
              />
              Auto-send emails to shortlisted candidates
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading || !serviceAvailable}
            className={`w-full py-2 px-4 rounded ${
              loading || !serviceAvailable
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Screening...' : 'Screen Resumes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResumeScreening;