import React, { useState } from 'react';
import FileIcon from '../assets/file.svg';

const Folder = ({ extension, files, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const openFileInNewTab = (file) => {
    window.open(URL.createObjectURL(file), '_blank');
  };

  const closePreview = () => {
    setSelectedFile(null);
  };

  const handleDeleteClick = (e, extension, index) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete ${files[index].name}?`);
    if (confirmDelete) {
      onDelete(extension, index);
    }
  };

  const renderFilePreview = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const url = URL.createObjectURL(file);

    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'svg':
        return <img src={url} alt={file.name} className="w-full" />;
      case 'pdf':
        return <iframe src={url} title={file.name} className="w-full h-64"></iframe>;
      case 'doc':
      case 'docx':
      case 'xls':
      case 'xlsx':
      case 'ppt':
      case 'pptx':
      case 'txt':
      case 'csv':
      case 'json':
      case 'xml':
      case 'md':
      case 'html':
      case 'css':
      case 'js':
      case 'jsx':
      case 'py':
      case 'c':
      case 'cpp':
      case 'sql':
      case 'ipynb':
      case 'java':
        return <iframe src={url} title={file.name} className="w-full h-64"></iframe>;
      case 'mp3':
      case 'wav':
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'mkv':
        return <video controls className="w-full"><source src={url} type={`video/${fileExtension}`} /></video>;
      case 'zip':
      case 'rar':
      case 'tar':
      case 'gz':
        return <p className="text-red-500">Cannot preview compressed file. Download to view.</p>;
      default:
        return <p className="text-red-500">File type not supported for preview.</p>;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 m-4 w-64">
      <h2 className="text-2xl underline font-semibold mb-4">{extension.toUpperCase()} Files</h2>
      <ul className="list-disc list-inside">
        {files.map((file, index) => (
          <li
            key={index}
            className="text-sm font-medium text-gray-700 cursor-pointer flex items-center justify-between"
            onClick={() => handleFileClick(file)}
          >
            <div className="flex items-center">
              <img src={FileIcon} alt="File Icon" className="w-4 h-4 mr-2" />
              {file.name}
            </div>
            <button
              onClick={(e) => handleDeleteClick(e, extension, index)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div className="mt-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{selectedFile.name}</h2>
                <div className="flex space-x-5">
                  <button
                    onClick={() => openFileInNewTab(selectedFile)}
                    className="text-blue-400 font-semibold hover:underline focus:outline-none"
                  >
                    Open in new tab
                  </button>
                  <button onClick={closePreview} className="text-red-500 focus:outline-none font-semibold">Close</button>
                </div>
              </div>
              <div className="mt-4">
                {renderFilePreview(selectedFile)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
