import React, { useState } from 'react';
import { Trash2, Plus, FileDown, Folder } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PDFConverter = () => {
  const [urls, setUrls] = useState(['']);
  const [outputDir, setOutputDir] = useState('./output');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isConverting, setIsConverting] = useState(false);

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls.length ? newUrls : ['']);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConverting(true);
    setStatus({ type: '', message: '' });

    try {
      const validUrls = urls.filter(url => url.trim());
      const result = await window.electronAPI.convertToPDF({
        urls: validUrls,
        outputDir
      });

      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleSelectDirectory = async () => {
    const dir = await window.electronAPI.selectDirectory();
    if (dir) setOutputDir(dir);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Web to PDF Converter</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Output Directory Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Output Directory
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={outputDir}
                readOnly
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-700 bg-gray-50"
              />
              <button
                type="button"
                onClick={handleSelectDirectory}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Folder size={18} />
                Select
              </button>
            </div>
          </div>

          {/* URL Input Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Website URLs
            </label>
            <div className="space-y-3">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="Enter website URL"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-700"
                    required
                  />
                  {urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveUrl(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={handleAddUrl}
              className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors w-full justify-center"
            >
              <Plus size={18} />
              Add Another URL
            </button>
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={isConverting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            <FileDown size={18} />
            {isConverting ? 'Converting...' : 'Convert to PDF'}
          </button>
        </form>

        {/* Status Messages */}
        {status.message && (
          <Alert className={`mt-4 ${
            status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default PDFConverter;