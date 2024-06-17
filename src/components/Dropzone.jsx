import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center border-4 border-dashed border-gray-300 bg-white rounded-lg p-8 w-full max-w-lg mx-auto cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-500">Drag & drop files here, or click to select files</p>
    </div>
  );
};

export default Dropzone;