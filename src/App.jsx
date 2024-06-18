import React, { useState } from 'react';
import Dropzone from './components/Dropzone';
import Folder from './components/Folder';

const App = () => {
  const [files, setFiles] = useState({
    html: [],
    png: [],
    jpg: [],
    jpeg: [],
    gif: [],
    svg: [],
    bmp: [],
    pdf: [],
    doc: [],
    docx: [],
    xls: [],
    xlsx: [],
    ppt: [],
    pptx: [],
    txt: [],
    csv: [],
    json: [],
    xml: [],
    mp3: [],
    wav: [],
    mp4: [],
    mov: [],
    avi: [],
    mkv: [],
    zip: [],
    rar: [],
    tar: [],
    gz: [],
    css: [],
    js: [],
    jsx: [],
    md: [],
    py: [],
    c: [],
    cpp: [],
    sql: [],
    ipynb: [],
    java: []
  });

  const handleDrop = (acceptedFiles) => {
    const newFiles = { ...files };

    acceptedFiles.forEach((file) => {
      const extension = file.name.split('.').pop();
      if (newFiles[extension]) {
        newFiles[extension].push(file);
      } else {
        newFiles[extension] = [file];
      }
    });

    setFiles(newFiles);
  };

  const uploadedFileExtensions = Object.keys(files).filter(
    (extension) => files[extension].length > 0
  );

  return (
    <div className="min-h-screen bg-[#282929] text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-3">Organize your File-Flow</h1>
      <p className="text-xl font-semibold text-center mb-4">& Clear the Clutter</p>
      <Dropzone onDrop={handleDrop} />
      <div className="flex flex-wrap justify-center mt-8 text-black">
        {uploadedFileExtensions.map((extension) => (
          <Folder key={extension} extension={extension} files={files[extension]} />
        ))}
      </div>
    </div>
  );
};

export default App;
