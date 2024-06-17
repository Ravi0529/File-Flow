import React, { useState } from 'react';

const Folder = ({ extension, files }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-64">
      <h2 className="text-2xl font-semibold mb-4">{extension.toUpperCase()} Files</h2>
      <ul className="list-disc list-inside">
        {files.map((file, index) => (
          <li
            key={index}
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => handleFileClick(file)}
          >
            {file.name}
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div className="mt-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{selectedFile.name}</h2>
                <button onClick={closePreview} className="text-red-500">Close</button>
              </div>
              <div className="mt-4">
                {extension === 'png' || extension === 'jpg' ? (
                  <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} className="w-full" />
                ) : (
                  <iframe src={URL.createObjectURL(selectedFile)} title={selectedFile.name} className="w-full h-64"></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;