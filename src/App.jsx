import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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

  const saveFilesToLocalStorage = async (files) => {
    const serializedFiles = {};
    const readFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    for (const extension in files) {
      serializedFiles[extension] = await Promise.all(
        files[extension].map(async (file) => ({
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type,
          data: await readFileAsBase64(file)
        }))
      );
    }

    localStorage.setItem('files', JSON.stringify(serializedFiles));
  };

  useEffect(() => {
    const loadFilesFromLocalStorage = async () => {
      const savedFiles = localStorage.getItem('files');
      if (savedFiles) {
        try {
          const parsedFiles = JSON.parse(savedFiles);
          const reconstructedFiles = {};

          for (const extension in parsedFiles) {
            reconstructedFiles[extension] = await Promise.all(
              parsedFiles[extension].map(async (file) => {
                const blob = await fetch(file.data).then((res) => res.blob());
                return new File([blob], file.name, { type: file.type, lastModified: file.lastModified });
              })
            );
          }

          setFiles(reconstructedFiles);
        } catch (error) {
          console.error('Error parsing or reconstructing files:', error);
          localStorage.removeItem('files'); // Clear localStorage if parsing fails
        }
      }
    };

    loadFilesFromLocalStorage();
  }, []);

  const handleDrop = async (acceptedFiles) => {
    const newFiles = { ...files };

    acceptedFiles.forEach((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      if (newFiles[extension]) {
        newFiles[extension].push(file);
      } else {
        newFiles[extension] = [file];
      }
    });

    setFiles(newFiles);
    await saveFilesToLocalStorage(newFiles);
  };

  const handleDelete = async (extension, index) => {
    const newFiles = { ...files };
    newFiles[extension].splice(index, 1);
    setFiles(newFiles);
    await saveFilesToLocalStorage(newFiles);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();

    let hasFiles = false;
    Object.keys(files).forEach((extension) => {
      if (files[extension].length > 0) {
        hasFiles = true;
        const folder = zip.folder(extension.toUpperCase());
        files[extension].forEach((file) => {
          folder.file(file.name, file);
        });
      }
    });

    if (!hasFiles) {
      alert('No files to download.');
      return;
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'files.zip');
  };

  const uploadedFileExtensions = Object.keys(files).filter(
    (extension) => files[extension].length > 0
  );

  return (
    <div className="min-h-screen bg-[#282929] text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-3">
      Organize your File-Flow</h1>
      <p className="text-xl font-semibold text-center mb-4">Clear the Clutter & Download Your Files</p>
      <Dropzone onDrop={handleDrop} />
      <section className="flex flex-wrap justify-center mt-8 text-black h-72 md:h-full overflow-y-auto">
        {uploadedFileExtensions.map((extension) => (
          <Folder
            key={extension}
            extension={extension}
            files={files[extension]}
            onDelete={handleDelete}
          />
        ))}
      </section>
      <div className="btn mt-2 w-full flex justify-center">
        <button onClick={handleDownloadZip} className="bg-green-500 text-black px-3 py-1 rounded-lg font-semibold shadow-2xl">Download ZIP</button>
      </div>
    </div>
  );
};

export default App;
