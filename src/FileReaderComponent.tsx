import React, { useState } from 'react';

const FileReaderComponent: React.FC<FileReaderProps> = ({ onFileRead }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        if (e.target && e.target.result) {
          onFileRead(e.target.result);
        } else {
          handleError(e);
        }
      };

      reader.onerror = e => handleError(e);

      reader.readAsText(file);
    }
  };

  const handleError = (e: ProgressEvent<FileReader>) => {
    setError('Error reading file, check console.');
    console.error(e);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <div>Error: {error}</div>}
    </div>
  );
};

type FileReaderProps = {
  onFileRead: (fileContent: string | ArrayBuffer) => void;
};

export default FileReaderComponent;
