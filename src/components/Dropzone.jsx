import React from 'react';
import { useDropzone } from 'react-dropzone';
import Upload from '../assets/upload.svg';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white border-4 border-dashed border-gray-400 rounded-lg p-3 w-full max-w-lg mx-auto cursor-pointer"
        {...getRootProps()}
      >
        <img src={Upload} className='h-20' alt="uploading-image" />
        <input {...getInputProps()} />
      </div>
        <p className="text-white text-center mt-2">Drag & drop files here, or click to select files</p>
    </>
  );
};

export default Dropzone;
