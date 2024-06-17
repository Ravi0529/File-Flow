import React, { useState } from 'react';
import Dropzone from './components/Dropzone';
import Folder from './components/Folder';

const App = () => {
  const [files, setFiles] = useState({
    html: [],
    png: [],
    jpg: [],
    // Add more extensions as needed
  });

  const handleDrop = (acceptedFiles) => {
    const newFiles = { ...files };

    acceptedFiles.forEach(file => {
      const extension = file.name.split('.').pop();
      if (newFiles[extension]) {
        newFiles[extension].push(file);
      } else {
        newFiles[extension] = [file];
      }
    });

    setFiles(newFiles);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-2">Organize your File-Flow</h1>
      <p className="text-xl font-semibold text-center mb-8">& Clear the Clutter</p>
      <Dropzone onDrop={handleDrop} />
      <div className="flex flex-wrap justify-center mt-8">
        {Object.keys(files).map(extension => (
          <Folder key={extension} extension={extension} files={files[extension]} />
        ))}
      </div>
    </div>
  );
};

export default App;